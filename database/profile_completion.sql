-- Profile Completion System Migration
-- Adds profile_completed flag and ensures proper name handling

-- Add profile_completed column
ALTER TABLE profiles 
ADD COLUMN IF NOT EXISTS profile_completed BOOLEAN DEFAULT FALSE;

-- Add updated_at column if not exists
ALTER TABLE profiles 
ADD COLUMN IF NOT EXISTS updated_at TIMESTAMPTZ DEFAULT NOW();

-- Create trigger to update updated_at
CREATE OR REPLACE FUNCTION update_profiles_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS profiles_updated_at_trigger ON profiles;
CREATE TRIGGER profiles_updated_at_trigger
  BEFORE UPDATE ON profiles
  FOR EACH ROW
  EXECUTE FUNCTION update_profiles_updated_at();

-- Mark profiles with name and phone as completed
UPDATE profiles
SET profile_completed = TRUE
WHERE name IS NOT NULL 
  AND name != '' 
  AND phone IS NOT NULL 
  AND phone != '';

-- Update the auto profile trigger to set initial completion status (if it exists)
-- This assumes you have the handle_new_user trigger from auto_profile_trigger.sql
-- If not, you can skip this part

COMMENT ON COLUMN profiles.profile_completed IS 'Indicates whether user has completed their profile with required fields (name, phone)';
COMMENT ON COLUMN profiles.updated_at IS 'Timestamp of last profile update, auto-managed by trigger';
