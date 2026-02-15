-- Orders Table: Add Missing Billing Columns
-- This migration adds all required billing detail columns to the orders table

-- Add billing detail columns
ALTER TABLE orders 
ADD COLUMN IF NOT EXISTS billing_name TEXT;

ALTER TABLE orders 
ADD COLUMN IF NOT EXISTS billing_email TEXT;

ALTER TABLE orders 
ADD COLUMN IF NOT EXISTS billing_phone TEXT;

ALTER TABLE orders 
ADD COLUMN IF NOT EXISTS billing_address TEXT;

ALTER TABLE orders 
ADD COLUMN IF NOT EXISTS billing_city TEXT;

ALTER TABLE orders 
ADD COLUMN IF NOT EXISTS billing_state TEXT;

ALTER TABLE orders 
ADD COLUMN IF NOT EXISTS billing_country TEXT DEFAULT 'India';

-- Add payment tracking columns
ALTER TABLE orders 
ADD COLUMN IF NOT EXISTS razorpay_order_id TEXT;

ALTER TABLE orders 
ADD COLUMN IF NOT EXISTS razorpay_payment_id TEXT;

ALTER TABLE orders 
ADD COLUMN IF NOT EXISTS confirmed_at TIMESTAMPTZ;

-- Add helpful comments
COMMENT ON COLUMN orders.billing_name IS 'Customer name for billing';
COMMENT ON COLUMN orders.billing_email IS 'Customer email for billing';
COMMENT ON COLUMN orders.billing_phone IS 'Customer phone for billing';
COMMENT ON COLUMN orders.billing_address IS 'Customer billing address';
COMMENT ON COLUMN orders.billing_city IS 'Billing city';
COMMENT ON COLUMN orders.billing_state IS 'Billing state';
COMMENT ON COLUMN orders.billing_country IS 'Billing country';
COMMENT ON COLUMN orders.razorpay_order_id IS 'Razorpay order ID for payment tracking';
COMMENT ON COLUMN orders.razorpay_payment_id IS 'Razorpay payment ID after successful payment';
COMMENT ON COLUMN orders.confirmed_at IS 'Timestamp when order was confirmed after payment';
