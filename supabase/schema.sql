-- ============================================================
-- Step 4: Supabase database schema for Client Portal
-- Run this entire file in Supabase Dashboard → SQL Editor → New query
-- ============================================================

-- ------------------------------------------------------------
-- 1. Tables: clients & test_results
-- ------------------------------------------------------------

CREATE TABLE IF NOT EXISTS clients (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  email TEXT UNIQUE NOT NULL,
  name TEXT NOT NULL,
  phone TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW()) NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW()) NOT NULL
);

CREATE TABLE IF NOT EXISTS test_results (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  client_id UUID NOT NULL REFERENCES clients(id) ON DELETE CASCADE,
  test_name TEXT NOT NULL,
  test_id TEXT,
  file_path TEXT NOT NULL,
  file_name TEXT NOT NULL,
  uploaded_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW()) NOT NULL,
  uploaded_by TEXT,
  notes TEXT
);

CREATE INDEX IF NOT EXISTS idx_test_results_client_id ON test_results(client_id);
CREATE INDEX IF NOT EXISTS idx_test_results_uploaded_at ON test_results(uploaded_at DESC);

ALTER TABLE clients ENABLE ROW LEVEL SECURITY;
ALTER TABLE test_results ENABLE ROW LEVEL SECURITY;

-- ------------------------------------------------------------
-- 2. RLS policies: clients
-- ------------------------------------------------------------

CREATE POLICY "Clients can view own profile"
  ON clients FOR SELECT
  USING (auth.uid()::text = id::text);

CREATE POLICY "Clients can update own profile"
  ON clients FOR UPDATE
  USING (auth.uid()::text = id::text);

-- Allow new users to create their own client row on signup (id = auth.uid())
CREATE POLICY "Users can insert own profile"
  ON clients FOR INSERT
  WITH CHECK (auth.uid()::text = id::text);

-- ------------------------------------------------------------
-- 3. RLS policies: test_results
-- ------------------------------------------------------------

CREATE POLICY "Clients can view own test results"
  ON test_results FOR SELECT
  USING (
    client_id IN (
      SELECT id FROM clients WHERE id::text = auth.uid()::text
    )
  );

-- ============================================================
-- Done. Verify in Table Editor: you should see
-- tables "clients" and "test_results".
-- ============================================================
