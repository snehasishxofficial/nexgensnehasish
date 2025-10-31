-- Remove student INSERT and UPDATE permissions on fee_records
-- Only admins should be able to manage payment records
DROP POLICY IF EXISTS "Students can insert own fee records" ON public.fee_records;
DROP POLICY IF EXISTS "Students can update own fee records" ON public.fee_records;