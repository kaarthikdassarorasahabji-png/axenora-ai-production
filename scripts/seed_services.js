import 'dotenv/config';
import { createClient } from '@supabase/supabase-js';
import { randomUUID } from 'crypto';

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_KEY
);

const services = [
  {
    name: 'AI Website Development',
    description: 'Websites that work like sales systems — AI-generated copy, conversion-focused layouts, and built-in integrations.',
    category: 'website',
    is_active: true,
    sort_order: 1,
    tiers: [
      {
        tier_name: 'Starter',
        price: 9999,
        billing_cycle: 'one-time',
        features: ['5 Pages Website', 'Mobile Responsive', 'WhatsApp Integration', 'Lead Capture Form', 'Modern UI Design'],
        is_popular: false,
        sort_order: 1
      },
      {
        tier_name: 'Business',
        price: 19999,
        billing_cycle: 'one-time',
        features: ['Up to 15 Pages', 'Premium Design', 'Lead Capture System', 'WhatsApp Integration', 'Basic SEO Setup', 'Speed Optimized'],
        is_popular: true,
        sort_order: 2
      },
      {
        tier_name: 'Enterprise',
        price: 0,
        billing_cycle: 'custom',
        features: ['Unlimited Pages', 'Custom Design', 'CRM Integration', 'Advanced Automation', 'Dedicated Support'],
        is_popular: false,
        sort_order: 3
      }
    ]
  },
  {
    name: 'Smart Ads Management',
    description: 'AI-optimized ad campaigns with automated creative testing, smart budget optimization, and continuous improvement.',
    category: 'ads',
    is_active: true,
    sort_order: 2,
    tiers: [
      {
        tier_name: 'Starter',
        price: 2999,
        billing_cycle: 'monthly',
        features: ['1 Platform (Google/Meta)', 'Automated Creative Testing', 'Monthly Report', 'Budget Optimization', 'Email Support'],
        is_popular: false,
        sort_order: 1
      },
      {
        tier_name: 'Business',
        price: 6999,
        billing_cycle: 'monthly',
        features: ['All Platforms', 'A/B Creative Testing', 'Weekly Reports', 'Audience Targeting AI', 'Priority Support', 'Conversion Tracking'],
        is_popular: true,
        sort_order: 2
      },
      {
        tier_name: 'Enterprise',
        price: 0,
        billing_cycle: 'custom',
        features: ['Unlimited Platforms', 'Custom Strategy', 'Daily Optimization', 'Dedicated Manager', 'SLA Guarantee'],
        is_popular: false,
        sort_order: 3
      }
    ]
  },
  {
    name: 'WhatsApp Automation',
    description: 'Turn WhatsApp into your best salesperson — instant replies, automated follow-ups, appointment & payment reminders.',
    category: 'whatsapp',
    is_active: true,
    sort_order: 3,
    tiers: [
      {
        tier_name: 'Starter',
        price: 2999,
        billing_cycle: 'monthly',
        features: ['1 WhatsApp Number', 'Auto Replies', 'Lead Capture', 'Basic Automation', 'Email Support'],
        is_popular: false,
        sort_order: 1
      },
      {
        tier_name: 'Business',
        price: 5999,
        billing_cycle: 'monthly',
        features: ['3 WhatsApp Numbers', 'Broadcast Messaging', 'Advanced Automation', 'Lead Qualification', 'Priority Support', 'Analytics Dashboard'],
        is_popular: true,
        sort_order: 2
      },
      {
        tier_name: 'Enterprise',
        price: 0,
        billing_cycle: 'custom',
        features: ['Unlimited Numbers', 'Custom Workflows', 'API Integrations', 'Dedicated Manager', 'SLA Guarantee'],
        is_popular: false,
        sort_order: 3
      }
    ]
  },
  {
    name: 'AI Chatbot',
    description: 'Chatbots that don\'t just talk — they convert. Lead qualification, multi-language support, and CRM integration.',
    category: 'chatbot',
    is_active: true,
    sort_order: 4,
    tiers: [
      {
        tier_name: 'Starter',
        price: 2999,
        billing_cycle: 'monthly',
        features: ['1 AI Chatbot', 'Lead Qualification', 'Multi-language Support', 'Basic Analytics', 'Email Support'],
        is_popular: false,
        sort_order: 1
      },
      {
        tier_name: 'Business',
        price: 5999,
        billing_cycle: 'monthly',
        features: ['3 AI Chatbots', 'CRM Integration', 'Advanced Analytics', 'Custom Training', 'Priority Support', 'A/B Testing'],
        is_popular: true,
        sort_order: 2
      },
      {
        tier_name: 'Enterprise',
        price: 0,
        billing_cycle: 'custom',
        features: ['Unlimited Chatbots', 'Custom AI Models', 'Full Integration Suite', 'Dedicated Manager', 'SLA Guarantee'],
        is_popular: false,
        sort_order: 3
      }
    ]
  },
  {
    name: 'AI Voice Calling',
    description: 'AI voice agents that sound human — inbound & outbound calling, objection handling, and appointment booking.',
    category: 'calling',
    is_active: true,
    sort_order: 5,
    tiers: [
      {
        tier_name: 'Starter',
        price: 4999,
        billing_cycle: 'monthly',
        features: ['100 Calls/month', 'Inbound & Outbound', 'Appointment Booking', 'Call Recording', 'Email Support'],
        is_popular: false,
        sort_order: 1
      },
      {
        tier_name: 'Business',
        price: 9999,
        billing_cycle: 'monthly',
        features: ['500 Calls/month', 'Objection Handling', 'CRM Integration', 'Custom Scripts', 'Priority Support', 'Advanced Analytics'],
        is_popular: true,
        sort_order: 2
      },
      {
        tier_name: 'Enterprise',
        price: 0,
        billing_cycle: 'custom',
        features: ['Unlimited Calls', 'Custom Voice Models', 'Full Integration', 'Dedicated Manager', 'SLA Guarantee'],
        is_popular: false,
        sort_order: 3
      },
    ]
  }
];

async function seed() {
  console.log('🔄 Clearing old data...');

  // Delete old tiers first (FK constraint)
  const { error: tierDelErr } = await supabase.from('service_tiers').delete().neq('id', '00000000-0000-0000-0000-000000000000');
  if (tierDelErr) console.warn('Tier delete warning:', tierDelErr.message);

  // Delete old services
  const { error: svcDelErr } = await supabase.from('services').delete().neq('id', '00000000-0000-0000-0000-000000000000');
  if (svcDelErr) console.warn('Service delete warning:', svcDelErr.message);

  console.log('✅ Old data cleared\n');

  for (const svc of services) {
    const { tiers, ...serviceData } = svc;

    console.log(`📦 Inserting: ${serviceData.name}`);
    const { data: inserted, error: svcErr } = await supabase
      .from('services')
      .insert({ id: randomUUID(), ...serviceData })
      .select()
      .single();

    if (svcErr) {
      console.error(`  ❌ Failed: ${svcErr.message}`);
      continue;
    }

    // Insert tiers
    const tiersWithServiceId = tiers.map(t => ({
      id: randomUUID(),
      ...t,
      service_id: inserted.id
    }));

    const { error: tierErr } = await supabase
      .from('service_tiers')
      .insert(tiersWithServiceId);

    if (tierErr) {
      console.error(`  ❌ Tiers failed: ${tierErr.message}`);
    } else {
      console.log(`  ✅ ${tiers.length} tiers inserted`);
    }
  }

  console.log('\n🎉 Seed complete!');
}

seed().catch(console.error);
