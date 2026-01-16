import { motion } from "framer-motion";
import { Check, Zap, Sparkles, Rocket, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

type Plan = {
  name: string;
  price: string;
  description: string;
  features: string[];
  isPopular?: boolean;
  buttonText: string;
  icon: React.ComponentType<{ className?: string }>;
};

const plans: Plan[] = [
  {
    name: "Starter",
    price: "$29",
    description: "Perfect for individuals and small businesses",
    features: [
      "10,000 AI messages/month",
      "Basic AI models",
      "Email support",
      "Standard response time",
      "Basic analytics",
    ],
    buttonText: "Get Started",
    icon: Zap,
  },
  {
    name: "Professional",
    price: "$99",
    description: "Ideal for growing businesses",
    features: [
      "50,000 AI messages/month",
      "Advanced AI models",
      "Priority support",
      "Faster response times",
      "Advanced analytics",
      "API access",
      "Custom integrations",
    ],
    isPopular: true,
    buttonText: "Start Free Trial",
    icon: Sparkles,
  },
  {
    name: "Enterprise",
    price: "Custom",
    description: "For large organizations with custom needs",
    features: [
      "Unlimited messages",
      "Premium AI models",
      "24/7 dedicated support",
      "Custom SLAs",
      "Advanced security",
      "Dedicated account manager",
      "Custom integrations",
      "On-premise deployment",
    ],
    buttonText: "Contact Sales",
    icon: Rocket,
  },
];

const PricingCard = ({ plan }: { plan: Plan }) => {
  const Icon = plan.icon;
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className={`relative flex flex-col h-full p-8 rounded-2xl border-2 ${
        plan.isPopular 
          ? 'border-primary/30 bg-gradient-to-b from-primary/5 to-transparent' 
          : 'border-border/30 bg-card/50'
      }`}
    >
      {plan.isPopular && (
        <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-gradient-to-r from-primary to-accent text-white text-xs font-medium px-4 py-1 rounded-full whitespace-nowrap">
          Most Popular
        </div>
      )}
      
      <div className="flex items-center gap-3 mb-6">
        <div className="p-3 rounded-xl bg-primary/10 text-primary">
          <Icon className="w-6 h-6" />
        </div>
        <h3 className="text-2xl font-bold">{plan.name}</h3>
      </div>
      
      <div className="mb-6">
        <div className="text-4xl font-bold mb-2">{plan.price}</div>
        {plan.price !== "Custom" && (
          <span className="text-muted-foreground">per month</span>
        )}
        <p className="mt-2 text-muted-foreground">{plan.description}</p>
      </div>
      
      <ul className="space-y-3 mb-8 flex-1">
        {plan.features.map((feature, index) => (
          <li key={index} className="flex items-center gap-2">
            <Check className="h-5 w-5 text-green-500 flex-shrink-0" />
            <span>{feature}</span>
          </li>
        ))}
      </ul>
      
      <Button 
        size="lg" 
        className={`w-full mt-auto ${
          plan.isPopular 
            ? 'bg-gradient-to-r from-primary to-accent hover:opacity-90' 
            : 'bg-primary/10 text-primary hover:bg-primary/20'
        }`}
        asChild
      >
        {plan.buttonText === "Contact Sales" ? (
          <Link to="/contact">
            {plan.buttonText}
            {!plan.isPopular && <ArrowRight className="ml-2 h-4 w-4" />}
          </Link>
        ) : (
          <Link to="/pricing">
            {plan.buttonText}
            {!plan.isPopular && <ArrowRight className="ml-2 h-4 w-4" />}
          </Link>
        )}
      </Button>
    </motion.div>
  );
};

export function PricingSection() {
  return (
    <section id="pricing" className="py-20 md:py-28 bg-gradient-to-b from-background to-muted/5">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <motion.span 
            className="inline-block px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            Pricing Plans
          </motion.span>
          <motion.h2 
            className="text-3xl md:text-5xl font-bold mb-6"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            Simple, Transparent <span className="text-primary">Pricing</span>
          </motion.h2>
          <motion.p 
            className="text-lg text-muted-foreground"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            Choose the perfect plan for your business needs. No hidden fees, cancel anytime.
          </motion.p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {plans.map((plan, index) => (
            <PricingCard 
              key={plan.name} 
              plan={plan} 
            />
          ))}
        </div>

        <motion.div 
          className="mt-12 text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
        >
          <p className="text-muted-foreground mb-6">Need something more customized?</p>
          <Link to="/contact">
            <Button variant="outline" size="lg" className="group">
              Contact Sales
              <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Button>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
