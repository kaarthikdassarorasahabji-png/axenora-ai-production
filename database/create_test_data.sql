-- OPTIONAL: Create Sample Data for Testing Admin Dashboard
-- Run this AFTER making yourself admin and running migrations

-- This creates test orders so you can see the admin dashboard populated

-- First, get your user ID
SELECT id, email FROM profiles LIMIT 1;
-- Copy your ID from the result

-- Then create a test order (replace 'YOUR_USER_ID_HERE' with your actual ID)
INSERT INTO orders (
  user_id,
  order_number,
  total_amount,
  status,
  payment_status,
  billing_name,
  billing_email,
  billing_phone,
  billing_address,
  billing_city,
  billing_state,
  billing_country,
  created_at
) VALUES (
  'YOUR_USER_ID_HERE',  -- Replace with your user ID
  'ORD-' || LPAD((FLOOR(RANDOM() * 999999)::TEXT), 6, '0'),
  7999,
  'confirmed',
  'paid',
  'Test Customer',
  'customer@example.com',
  '+91 98765 43210',
  '123 Test Street',
  'Mumbai',
  'Maharashtra',
  'India',
  NOW()
);

-- Create order items for the order we just created
INSERT INTO order_items (
  order_id,
  service_id,
  service_name,
  tier_name,
  price,
  billing_cycle
) 
SELECT 
  o.id,
  'test-service-1',
  'AI Website Builder',
  'Professional',
  7999,
  'monthly'
FROM orders o
WHERE o.order_number LIKE 'ORD-%'
ORDER BY o.created_at DESC
LIMIT 1;

-- Verify orders were created
SELECT 
  o.order_number,
  o.total_amount,
  o.status,
  o.payment_status,
  p.email,
  o.created_at
FROM orders o
JOIN profiles p ON o.user_id = p.id
ORDER BY o.created_at DESC
LIMIT 5;

-- You should now see this data on the admin dashboard instantly!
