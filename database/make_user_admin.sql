-- STEP 1: Sign Up First!
-- You must go to your app and Sign Up with:
-- Email: kaarthikdassarora@axenoraai.in
-- Password: kaarthikdassarora0210

-- STEP 2: Run this script (AFTER signing up)
-- This will make your new user an Admin

UPDATE profiles 
SET role = 'admin' 
WHERE email = 'kaarthikdassarora@axenoraai.in';

-- Verify it worked
SELECT id, email, name, role 
FROM profiles 
WHERE email = 'kaarthikdassarora@axenoraai.in';

-- STEP 3: Refresh Browser
-- You should now have access to the Admin Dashboard
