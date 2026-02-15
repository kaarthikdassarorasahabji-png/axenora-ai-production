# Database Migration Guide

## Migration Order

To properly set up the database for the application, run these SQL files in the following order:

### 1. `ensure_profile_columns.sql` (Run First)

**Purpose**: Ensures all required columns exist in the profiles table.

This migration adds:

- `profile_completed` boolean flag
- `phone` and `company` text fields
- `created_at` and `updated_at` timestamps
- Trigger to auto-update `updated_at`

### 2. `auto_profile_trigger.sql`

**Purpose**: Auto-creates user profiles when new users sign up.

This sets up a trigger that automatically creates a profile row in the `profiles` table whenever a new user signs up through Supabase Auth. The trigger includes the `profile_completed` field set to `FALSE` by default.

### 3. `add_orders_billing_columns.sql` (NEW - Fix Orders Error)

**Purpose**: Adds billing detail columns to the orders table.

This migration adds all required billing fields:

- `billing_name`, `billing_email`, `billing_phone`
- `billing_address`, `billing_city`, `billing_state`, `billing_country`
- `razorpay_order_id`, `razorpay_payment_id`, `confirmed_at`

**Run this to fix**: `Could not find the 'billing_city' column` error

### 4. `profile_completion.sql` (Optional)

**Purpose**: Legacy migration that adds profile_completed column.

This is now redundant if you run `ensure_profile_columns.sql` first, but it's safe to run as it uses `ADD COLUMN IF NOT EXISTS`.

## Quick Setup (Supabase Dashboard)

1. Go to your Supabase project dashboard
2. Navigate to **SQL Editor**
3. Copy and paste each file in order (1 → 2 → 3)
4. Click **Run** for each file

## Why This Order?

- **ensure_profile_columns.sql** must run first to create all profile columns
- **auto_profile_trigger.sql** references these columns in the INSERT statement
- **add_orders_billing_columns.sql** adds required billing fields for order creation
- If columns don't exist, the respective features will fail

## Testing

### Profile Creation

After running profile migrations (1 & 2):

1. Create a new user via signup
2. Check that a profile row is automatically created
3. Verify `profile_completed` is set to `FALSE`
4. Verify the ProfileCompletionModal appears

### Order Creation

After running orders migration (3):

1. Try to create an order with billing details
2. Verify the order is created successfully
3. Check that billing details are stored correctly

## Common Errors Fixed

### Error: "column 'profile_completed' does not exist"

**Solution**: Run `ensure_profile_columns.sql` first

### Error: "Could not find the 'billing_city' column"

**Solution**: Run `add_orders_billing_columns.sql`

### Error: "null value in column 'phone' violates not-null constraint"

**Solution**: Ensure phone and company columns are nullable (they are in these migrations)
