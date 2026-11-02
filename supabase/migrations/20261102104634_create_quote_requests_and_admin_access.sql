/*
# Create quote requests and admin access

1. New Tables
- `quote_requests`: company partnership / quotation requests submitted from the website contact form.
  - id, created_at, company_name, contact_name, email, phone, service_type, message, locale, status
  - status is one of: new, in_progress, done (defaults to new)
- `admin_users`: list of Supabase accounts allowed to open the admin dashboard.

2. Functions
- `is_admin()`: returns true when the signed-in user is listed in `admin_users`. Not callable by anonymous visitors.

3. Security
- Row level security enabled on both tables.
- Visitors (anon) may only INSERT a new request, with a fixed status of "new". They cannot read, edit, or delete requests.
- Only admins may read requests and change their status. Nobody may delete requests through the website.
- `admin_users` has no direct access for website roles; it is only read by `is_admin()`.

4. Notes
- Field length limits are enforced in the database so oversized submissions are rejected.
- Admin accounts are added to `admin_users` separately after the account exists.
*/

CREATE TABLE IF NOT EXISTS quote_requests (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at timestamptz NOT NULL DEFAULT now(),
  company_name text NOT NULL CHECK (char_length(company_name) BETWEEN 2 AND 150),
  contact_name text NOT NULL CHECK (char_length(contact_name) BETWEEN 2 AND 120),
  email text NOT NULL CHECK (char_length(email) BETWEEN 5 AND 254),
  phone text NOT NULL CHECK (char_length(phone) BETWEEN 6 AND 30),
  service_type text NOT NULL CHECK (char_length(service_type) BETWEEN 2 AND 80),
  message text NOT NULL CHECK (char_length(message) BETWEEN 10 AND 3000),
  locale text NOT NULL DEFAULT 'id' CHECK (locale IN ('id', 'en')),
  status text NOT NULL DEFAULT 'new' CHECK (status IN ('new', 'in_progress', 'done'))
);

CREATE INDEX IF NOT EXISTS quote_requests_created_at_idx ON quote_requests (created_at DESC);
CREATE INDEX IF NOT EXISTS quote_requests_status_idx ON quote_requests (status);

CREATE TABLE IF NOT EXISTS admin_users (
  user_id uuid PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  created_at timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE admin_users ENABLE ROW LEVEL SECURITY;
REVOKE ALL ON admin_users FROM PUBLIC, anon, authenticated;

CREATE OR REPLACE FUNCTION public.is_admin()
RETURNS boolean
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = ''
AS $$
  SELECT EXISTS (
    SELECT 1 FROM public.admin_users WHERE user_id = auth.uid()
  );
$$;

REVOKE EXECUTE ON FUNCTION public.is_admin() FROM PUBLIC, anon;
GRANT EXECUTE ON FUNCTION public.is_admin() TO authenticated;

ALTER TABLE quote_requests ENABLE ROW LEVEL SECURITY;

REVOKE ALL ON quote_requests FROM PUBLIC, anon, authenticated;
GRANT INSERT (company_name, contact_name, email, phone, service_type, message, locale) ON quote_requests TO anon, authenticated;
GRANT SELECT ON quote_requests TO authenticated;
GRANT UPDATE (status) ON quote_requests TO authenticated;

DROP POLICY IF EXISTS "anon_insert_quote_requests" ON quote_requests;
CREATE POLICY "anon_insert_quote_requests" ON quote_requests FOR INSERT
TO anon, authenticated
WITH CHECK (status = 'new');

DROP POLICY IF EXISTS "admin_select_quote_requests" ON quote_requests;
CREATE POLICY "admin_select_quote_requests" ON quote_requests FOR SELECT
TO authenticated
USING (public.is_admin());

DROP POLICY IF EXISTS "admin_update_quote_requests" ON quote_requests;
CREATE POLICY "admin_update_quote_requests" ON quote_requests FOR UPDATE
TO authenticated
USING (public.is_admin())
WITH CHECK (public.is_admin());
