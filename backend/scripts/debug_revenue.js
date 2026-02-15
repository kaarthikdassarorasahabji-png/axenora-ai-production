
import { supabase } from '../config/supabase.js';
import dotenv from 'dotenv';
dotenv.config();

async function debug() {
  console.log('--- Order Debugging ---');
  console.log('SUPABASE_SERVICE_KEY present:', !!process.env.SUPABASE_SERVICE_KEY);
  console.log('SUPABASE_KEY present:', !!process.env.SUPABASE_KEY);

  // Check orders
  const { data: allOrders, error } = await supabase
    .from('orders')
    .select('id, status, payment_status, total_amount');
  
  if (error) {
    console.error('Error fetching orders:', error);
  } else {
    console.log(`Total Orders found: ${allOrders.length}`);
    if (allOrders.length > 0) {
        console.table(allOrders);
        const paidOrders = allOrders.filter(o => o.payment_status === 'paid');
        console.log(`Paid Orders count: ${paidOrders.length}`);
        
        // Simulate the admin query
        const { data: revenueData, error: revError } = await supabase
            .from('orders')
            .select('total_amount')
            .eq('payment_status', 'paid');
            
        console.log('Simulated Revenue Query Result:', revenueData);
        if (revError) console.error('Revenue Query Error:', revError);
    } else {
        console.log('No orders found in the database.');
    }
  }
  process.exit();
}

debug();
