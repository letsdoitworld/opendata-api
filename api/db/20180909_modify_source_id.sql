ALTER TABLE public.reports
ALTER COLUMN source_id TYPE varchar(63) USING source_id :: varchar(63);
