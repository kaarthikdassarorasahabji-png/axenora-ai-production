import { motion } from "framer-motion";
import { Check } from "lucide-react";
import { Link } from "react-router-dom";
import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import pricingHero from "@/assets/pricing-hero.jpg";

const plans = [
  { name: "Starter", price: "₹14,999", period: "/month", description: "Perfect for small businesses getting started with AI automation.", features: ["1 AI Chatbot", "WhatsApp Integration", "500 Conversations/month", "Email Support", "Basic Analytics"], popular: false },
  { name: "Growth", price: "₹29,999", period: "/month", description: "For growing businesses that need more power and flexibility.", features: ["3 AI Chatbots", "WhatsApp + Website Integration", "2,000 Conversations/month", "AI Calling Agent (100 mins)", "Priority Support", "Advanced Analytics"], popular: true },
  { name: "Scale", price: "₹59,999", period: "/month", description: "For established businesses ready to fully automate operations.", features: ["Unlimited AI Chatbots", "All Integrations", "10,000 Conversations/month", "AI Calling Agent (500 mins)", "Dedicated Account Manager", "Custom Workflows"], popular: false },
  { name: "Enterprise", price: "Custom", period: "", description: "For large organizations with complex automation needs.", features: ["Everything in Scale", "Custom AI Development", "Unlimited Usage", "SLA Guarantee", "On-premise Options", "24/7 Premium Support"], popular: false },
];

const Pricing = () => {
  return (
    <Layout>
      <section className="relative min-h-[50vh] flex items-center">
        <div className="absolute inset-0 z-0">
          <img src={pricingHero} alt="Pricing" className="w-full h-full object-cover opacity-40" />
          <div className="absolute inset-0 bg-gradient-to-b from-background/80 via-background/60 to-background" />
        </div>
        <div className="container-custom relative z-10 py-20 text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <span className="text-sm font-medium text-primary uppercase tracking-wider">Pricing</span>
            <h1 className="text-4xl md:text-6xl font-bold mt-4 mb-6 font-['Space_Grotesk']">Simple, Transparent <span className="gradient-text">Pricing</span></h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">Choose the plan that fits your business. Scale up anytime as you grow.</p>
          </motion.div>
        </div>
      </section>

      <section className="section-padding">
        <div className="container-custom">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {plans.map((plan, index) => (
              <motion.div key={plan.name} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: index * 0.1 }} className={`relative p-6 rounded-2xl bg-card border ${plan.popular ? "border-primary glow" : "border-border"}`}>
                {plan.popular && <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-gradient-to-r from-primary to-accent text-xs font-semibold">Most Popular</div>}
                <h3 className="text-xl font-bold mb-2 font-['Space_Grotesk']">{plan.name}</h3>
                <div className="mb-4"><span className="text-4xl font-bold gradient-text">{plan.price}</span><span className="text-muted-foreground">{plan.period}</span></div>
                <p className="text-sm text-muted-foreground mb-6">{plan.description}</p>
                <ul className="space-y-3 mb-6">
                  {plan.features.map((feature) => (<li key={feature} className="flex items-center gap-2 text-sm"><Check className="w-4 h-4 text-primary" />{feature}</li>))}
                </ul>
                <Link to="/contact"><Button className={plan.popular ? "btn-primary w-full" : "btn-secondary w-full"}>Get Started</Button></Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Pricing;
