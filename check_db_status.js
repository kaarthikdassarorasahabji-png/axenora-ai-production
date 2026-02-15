
import { createClient } from '@supabase/supabase-js';
import fs from 'fs';
import path from 'path';

// Manual .env parsing since dotenv might not be in root
function loadEnv(filePath) {
  try {
    const content = fs.readFileSync(filePath, 'utf8');
    const env = {};
    content.split('\n').forEach(line => {
      const match = line.match(/^([^=]+)=(.*)$/);
      if (match) {
        let value = match[2].trim();
        // Remove quotes if present
        if ((value.startsWith('"') && value.endsWith('"')) || (value.startsWith("'") && value.endsWith("'"))) {
          value = value.slice(1, -1);
        }
        process.env[match[1].trim()] = value;
      }
    });
  } catch (e) {
    console.error(`Could not read .env file at ${filePath}`);
  }
}

// Load env from backend/.env
loadEnv('./backend/.env');

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_KEY || process.env.SUPABASE_SERVICE_KEY;

if (!supabaseUrl || !supabaseKey) {
  console.error('❌ Could not find SUPABASE_URL or SUPABASE_KEY in backend/.env');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

async function checkData() {
  console.log('Checking database status...');
  console.log(`Connecting to: ${supabaseUrl}`);
  
  // Check Profiles
  const { count: profileCount, error: profileError } = await supabase
    .from('profiles')
    .select('*', { count: 'exact', head: true });
    
  if (profileError) console.error('Profile Error:', profileError.message);
  else console.log(`Total Profiles: ${profileCount}`);

  // Check Orders
  const { count: orderCount, error: orderError } = await supabase
    .from('orders')
    .select('*', { count: 'exact', head: true });

  if (orderError) console.error('Order Error:', orderError.message);
  else console.log(`Total Orders: ${orderCount}`);
  
  if (orderCount === 0) {
    console.log('\n❌ The database has NO orders. That is why the dashboard is empty.');
    console.log('👉 Solution: Run the "create_test_data.sql" script in Supabase SQL Editor.');
  } else {
    console.log('\n✅ Database HAS orders. If dashboard is empty, check browser console for errors.');
  }
}

checkData();
