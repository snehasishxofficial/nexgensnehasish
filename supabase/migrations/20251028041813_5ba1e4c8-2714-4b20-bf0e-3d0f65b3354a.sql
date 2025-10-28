-- Enforce one fee record per student per month and allow student inserts
-- 1) Unique constraint for (student_id, year, month)
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_indexes WHERE indexname = 'uniq_fee_per_student_month'
  ) THEN
    CREATE UNIQUE INDEX uniq_fee_per_student_month
      ON public.fee_records (student_id, year, month);
  END IF;
END $$;

-- 2) Allow students to insert their own fee records
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies WHERE policyname = 'Students can insert own fee records'
  ) THEN
    CREATE POLICY "Students can insert own fee records"
    ON public.fee_records
    FOR INSERT
    WITH CHECK (
      EXISTS (
        SELECT 1 FROM public.students s
        WHERE s.id = fee_records.student_id
          AND s.user_id = auth.uid()
      )
    );
  END IF;
END $$;