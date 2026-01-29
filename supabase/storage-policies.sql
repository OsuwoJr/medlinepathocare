-- ============================================================
-- Step 10: RLS policies for Storage (test-results bucket)
-- Run this in Supabase Dashboard → SQL Editor → New query
-- ============================================================
-- Ensures clients can only read files in their own folder.
-- Store files as: {client_id}/{filename} so the first path
-- segment equals auth.uid() (client_id = user id in our schema).
-- ============================================================

-- Policy: Clients can view only their own test result files
-- (files whose path starts with their user id)
CREATE POLICY "Clients can view own test results"
ON storage.objects FOR SELECT
USING (
  bucket_id = 'test-results' AND
  (storage.foldername(name))[1] = auth.uid()::text
);

-- Admin uploads use the service role server-side, so no INSERT
-- policy is needed here (service role bypasses RLS).
