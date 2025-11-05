-- Add phone number column to students table if not exists
ALTER TABLE public.students 
ADD COLUMN IF NOT EXISTS phone_number TEXT;

-- Add unique constraint on phone numbers to prevent duplicates
DO $$ 
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_indexes WHERE indexname = 'students_phone_number_unique'
  ) THEN
    CREATE UNIQUE INDEX students_phone_number_unique 
    ON public.students(phone_number) 
    WHERE phone_number IS NOT NULL;
  END IF;
END $$;

-- Update profiles table to support phone numbers
ALTER TABLE public.profiles
ADD COLUMN IF NOT EXISTS phone_number TEXT;

-- Create SMS notifications table for tracking sent messages
CREATE TABLE IF NOT EXISTS public.sms_notifications (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  student_id UUID REFERENCES public.students(id) ON DELETE CASCADE NOT NULL,
  phone_number TEXT NOT NULL,
  message TEXT NOT NULL,
  status TEXT NOT NULL DEFAULT 'pending',
  sent_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable RLS on sms_notifications
ALTER TABLE public.sms_notifications ENABLE ROW LEVEL SECURITY;

-- Drop existing policies if they exist and recreate
DO $$ 
BEGIN
  DROP POLICY IF EXISTS "Admins can view all notifications" ON public.sms_notifications;
  DROP POLICY IF EXISTS "Admins can insert notifications" ON public.sms_notifications;
END $$;

-- Admin can view all notifications
CREATE POLICY "Admins can view all notifications" 
ON public.sms_notifications 
FOR SELECT 
USING (has_role(auth.uid(), 'admin'::app_role));

-- Admin can insert notifications
CREATE POLICY "Admins can insert notifications" 
ON public.sms_notifications 
FOR INSERT 
WITH CHECK (has_role(auth.uid(), 'admin'::app_role));

-- Create function to send SMS notification when payment is updated
CREATE OR REPLACE FUNCTION public.notify_payment_update()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  student_record RECORD;
  message_text TEXT;
BEGIN
  -- Only trigger on payment status change to paid
  IF NEW.paid = TRUE AND (OLD.paid IS NULL OR OLD.paid = FALSE) THEN
    -- Get student details
    SELECT s.*, s.guardian_number 
    INTO student_record
    FROM public.students s
    WHERE s.id = NEW.student_id;
    
    IF student_record IS NOT NULL THEN
      -- Create notification message
      message_text := 'Payment Confirmed: ₹' || NEW.amount || ' paid for ' || 
                     to_char(to_date(NEW.year || '-' || NEW.month || '-01', 'YYYY-MM-DD'), 'Month YYYY') || 
                     '. Thank you!';
      
      -- Insert SMS notification record
      INSERT INTO public.sms_notifications (
        student_id,
        phone_number,
        message,
        status
      ) VALUES (
        student_record.id,
        student_record.guardian_number,
        message_text,
        'queued'
      );
    END IF;
  END IF;
  
  RETURN NEW;
END;
$$;

-- Create trigger for payment notifications
DROP TRIGGER IF EXISTS payment_notification_trigger ON public.fee_records;
CREATE TRIGGER payment_notification_trigger
AFTER INSERT OR UPDATE ON public.fee_records
FOR EACH ROW
EXECUTE FUNCTION public.notify_payment_update();