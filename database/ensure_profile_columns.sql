-- Comprehensive Profile Schema Migration
-- Ensures all required columns exist for proper user profile functionality
-- Run this BEFORE auto_profile_trigger.sql and profile_completion.sql

-- 1. Ensure all base columns exist
ALTER TABLE profiles 
ADD COLUMN IF NOT EXISTS email TEXT;

ALTER TABLE profiles 
ADD COLUMN IF NOT EXISTS name TEXT;

ALTER TABLE profiles 
ADD COLUMN IF NOT EXISTS phone TEXT;

ALTER TABLE profiles 
ADD COLUMN IF NOT EXISTS company TEXT;

ALTER TABLE profiles 
ADD COLUMN IF NOT EXISTS role TEXT DEFAULT 'user';

-- 2. Add profile_completed flag
ALTER TABLE profiles 
ADD COLUMN IF NOT EXISTS profile_completed BOOLEAN DEFAULT FALSE;

-- 3. Add timestamp columns
ALTER TABLE profiles 
ADD COLUMN IF NOT EXISTS created_at TIMESTAMPTZ DEFAULT NOW();

ALTER TABLE profiles 
ADD COLUMN IF NOT EXISTS updated_at TIMESTAMPTZ DEFAULT NOW();

-- 4. Create or replace the updated_at trigger function
CREATE OR REPLACE FUNCTION update_profiles_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- 5. Create the trigger
DROP TRIGGER IF EXISTS profiles_updated_at_trigger ON profiles;
CREATE TRIGGER profiles_updated_at_trigger
  BEFORE UPDATE ON profiles
  FOR EACH ROW
  EXECUTE FUNCTION update_profiles_updated_at();

-- 6. Add helpful comments
COMMENT ON COLUMN profiles.profile_completed IS 'Indicates whether user has completed their profile with required fields (name, phone)';
COMMENT ON COLUMN profiles.updated_at IS 'Timestamp of last profile update, auto-managed by trigger';
COMMENT ON COLUMN profiles.name IS 'User full name';
COMMENT ON COLUMN profiles.phone IS 'User phone number';
COMMENT ON COLUMN profiles.company IS 'User company name (optional)';
COMMENT ON COLUMN profiles.role IS 'User role: user, admin, or super_admin';

-- 7. Mark existing profiles with name and phone as completed
UPDATE profiles
SET profile_completed = TRUE
WHERE name IS NOT NULL 
  AND name != '' 
  AND phone IS NOT NULL 
  AND phone != ''
  AND profile_completed = FALSE;
