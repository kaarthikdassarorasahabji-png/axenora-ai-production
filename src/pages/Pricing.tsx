import { useState } from "react";
import { motion } from "framer-motion";
import { Check, ArrowRight, Star, Zap, Crown, Phone } from "lucide-react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { CTASection } from "@/components/sections/CTASection";
import pricingHero from "@/assets/pricing-hero.jpg";

/* ------------------------------------------------------------------ */
/*  DATA                                                               */
/* ------------------------------------------------------------------ */

type Tier = {
  name: string;
  monthlyPrice: string;
  annualPrice?: string;
  annualNote?: string;
  period: string;
  description: string;
  features: string[];
  popular: boolean;
  isContact?: boolean;
};

type Category = {
  id: string;
  title: string;
  subtitle: string;
  icon: React.ComponentType<{ className?: string }>;
  tiers: Tier[];
  hasAnnual: boolean;
  isOneTime?: boolean;
};

const categories: Category[] = [
  /* ---- BUNDLE PLANS ---- */
  {
    id: "bundles",
    title: "Axenora AI Bundle Plans",
    subtitle: "All-in-one AI automation for maximum impact — our flagship offering",
    icon: Crown,
    hasAnnual: true,
    tiers: [
      {
        name: "Launch",
        monthlyPrice: "₹19,999",
        annualPrice: "₹1,99,999",
        period: "/month",
        description: "Everything you need to launch your AI-powered business.",
        features: [
          "Website Hosting & Maintenance",
          "WhatsApp Automation",
          "AI Chatbot",
          "Lead Dashboard",
          "Email Support",
        ],
        popular: false,
        annualNote: "₹16,666/mo",
      },
      {
        name: "Growth",
        monthlyPrice: "₹29,999",
        annualPrice: "₹2,99,999",
        period: "/month",
        description: "Scale faster with voice AI, CRM, and advanced automation.",
        features: [
          "Everything in Launch",
          "AI Voice Calling Agent",
          "CRM Integration",
          "Advanced Automation Workflows",
          "Priority Support",
          "Performance Analytics",
        ],
        popular: true,
        annualNote: "₹24,999/mo",
      },
      {
        name: "Dominance",
        monthlyPrice: "Custom",
        period: "",
        description: "Full-stack AI for enterprises that want to dominate their market.",
        features: [
          "Everything in Growth",
          "Full Business Automation",
          "Custom Integrations",
          "Dedicated Account Manager",
          "SLA Guarantee",
          "24/7 Premium Support",
        ],
        popular: false,
        isContact: true,
      },
    ],
  },
  /* ---- WEBSITE DEVELOPMENT ---- */
  {
    id: "website",
    title: "AI Website Development",
    subtitle: "One-time fee — websites that work like sales systems",
    icon: Zap,
    hasAnnual: false,
    isOneTime: true,
    tiers: [
      {
        name: "Starter",
        monthlyPrice: "₹9,999",
        period: " one-time",
        description: "Perfect for small businesses getting online.",
        features: [
          "5 Pages Website",
          "Mobile Responsive",
          "WhatsApp Integration",
          "Lead Capture Form",
          "Modern UI Design",
        ],
        popular: false,
      },
      {
        name: "Business",
        monthlyPrice: "₹19,999",
        period: " one-time",
        description: "Premium website with advanced lead capture.",
        features: [
          "Up to 15 Pages",
          "Premium Design",
          "Lead Capture System",
          "WhatsApp Integration",
          "Basic SEO Setup",
          "Speed Optimized",
        ],
        popular: true,
      },
      {
        name: "Enterprise",
        monthlyPrice: "Custom",
        period: "",
        description: "Fully custom website for large organizations.",
        features: [
          "Unlimited Pages",
          "Custom Design",
          "CRM Integration",
          "Advanced Automation",
          "Dedicated Support",
        ],
        popular: false,
        isContact: true,
      },
    ],
  },
  /* ---- HOSTING ---- */
  {
    id: "hosting",
    title: "Website Hosting & Maintenance",
    subtitle: "Secure, fast hosting with full maintenance included",
    icon: Zap,
    hasAnnual: true,
    tiers: [
      {
        name: "Standard",
        monthlyPrice: "₹1,999",
        annualPrice: "₹19,999",
        annualNote: "₹1,666/mo",
        period: "/month",
        description: "Reliable hosting with security updates.",
        features: [
          "Secure Hosting",
          "SSL Certificate",
          "Regular Maintenance",
          "Security Updates",
          "Email Support",
        ],
        popular: false,
      },
      {
        name: "Premium",
        monthlyPrice: "₹2,999",
        annualPrice: "₹29,999",
        annualNote: "₹2,500/mo",
        period: "/month",
        description: "Fast hosting with priority support.",
        features: [
          "Fast Hosting",
          "Priority Support",
          "Speed Optimization",
          "Full Maintenance",
          "Security Monitoring",
          "Daily Backups",
        ],
        popular: true,
      },
    ],
  },
  /* ---- WHATSAPP AUTOMATION ---- */
  {
    id: "whatsapp",
    title: "WhatsApp Automation",
    subtitle: "Turn WhatsApp into your best salesperson",
    icon: Phone,
    hasAnnual: true,
    tiers: [
      {
        name: "Starter",
        monthlyPrice: "₹2,999",
        annualPrice: "₹28,999",
        period: "/month",
        description: "Automate your WhatsApp conversations.",
        features: [
          "1 WhatsApp Number",
          "Auto Replies",
          "Lead Capture",
          "Basic Automation",
          "Email Support",
        ],
        popular: false,
      },
      {
        name: "Business",
        monthlyPrice: "₹5,999",
        annualPrice: "₹57,999",
        period: "/month",
        description: "Scale with broadcast messaging & advanced flows.",
        features: [
          "3 WhatsApp Numbers",
          "Broadcast Messaging",
          "Advanced Automation",
          "Lead Qualification",
          "Priority Support",
          "Analytics Dashboard",
        ],
        popular: true,
      },
      {
        name: "Enterprise",
        monthlyPrice: "Custom",
        period: "",
        description: "Unlimited scale with custom integrations.",
        features: [
          "Unlimited Numbers",
          "Custom Workflows",
          "API Integrations",
          "Dedicated Manager",
          "SLA Guarantee",
        ],
        popular: false,
        isContact: true,
      },
    ],
  },
  /* ---- AI CHATBOT ---- */
  {
    id: "chatbot",
    title: "AI Chatbot",
    subtitle: "Chatbots that don't just talk — they convert",
    icon: Zap,
    hasAnnual: true,
    tiers: [
      {
        name: "Starter",
        monthlyPrice: "₹2,999",
        annualPrice: "₹28,999",
        period: "/month",
        description: "AI chatbot for lead capture & support.",
        features: [
          "1 AI Chatbot",
          "Lead Qualification",
          "Multi-language Support",
          "Basic Analytics",
          "Email Support",
        ],
        popular: false,
      },
      {
        name: "Business",
        monthlyPrice: "₹5,999",
        annualPrice: "₹57,999",
        period: "/month",
        description: "Advanced chatbot with CRM integration.",
        features: [
          "3 AI Chatbots",
          "CRM Integration",
          "Advanced Analytics",
          "Custom Training",
          "Priority Support",
          "A/B Testing",
        ],
        popular: true,
      },
      {
        name: "Enterprise",
        monthlyPrice: "Custom",
        period: "",
        description: "Fully custom AI chatbot solution.",
        features: [
          "Unlimited Chatbots",
          "Custom AI Models",
          "Full Integration Suite",
          "Dedicated Manager",
          "SLA Guarantee",
        ],
        popular: false,
        isContact: true,
      },
    ],
  },
  /* ---- AI VOICE CALLING ---- */
  {
    id: "calling",
    title: "AI Voice Calling",
    subtitle: "AI voice agents that sound human",
    icon: Phone,
    hasAnnual: true,
    tiers: [
      {
        name: "Starter",
        monthlyPrice: "₹4,999",
        annualPrice: "₹47,999",
        period: "/month",
        description: "AI calling for appointment booking & follow-ups.",
        features: [
          "100 Calls/month",
          "Inbound & Outbound",
          "Appointment Booking",
          "Call Recording",
          "Email Support",
        ],
        popular: false,
      },
      {
        name: "Business",
        monthlyPrice: "₹9,999",
        annualPrice: "₹95,999",
        period: "/month",
        description: "High-volume AI calling with advanced features.",
        features: [
          "500 Calls/month",
          "Objection Handling",
          "CRM Integration",
          "Custom Scripts",
          "Priority Support",
          "Advanced Analytics",
        ],
        popular: true,
      },
      {
        name: "Enterprise",
        monthlyPrice: "Custom",
        period: "",
        description: "Unlimited AI calling with dedicated support.",
        features: [
          "Unlimited Calls",
          "Custom Voice Models",
          "Full Integration",
          "Dedicated Manager",
          "SLA Guarantee",
        ],
        popular: false,
        isContact: true,
      },
    ],
  },
  /* ---- SMART ADS ---- */
  {
    id: "ads",
    title: "Smart Ads Management",
    subtitle: "AI-optimized ad campaigns that learn and scale",
    icon: Star,
    hasAnnual: true,
    tiers: [
      {
        name: "Starter",
        monthlyPrice: "₹2,999",
        annualPrice: "₹28,999",
        period: "/month",
        description: "Get started with AI-powered ad management.",
        features: [
          "1 Platform (Google/Meta)",
          "Automated Creative Testing",
          "Monthly Report",
          "Budget Optimization",
          "Email Support",
        ],
        popular: false,
      },
      {
        name: "Business",
        monthlyPrice: "₹6,999",
        annualPrice: "₹67,999",
        period: "/month",
        description: "Multi-platform ads with advanced optimization.",
        features: [
          "All Platforms",
          "A/B Creative Testing",
          "Weekly Reports",
          "Audience Targeting AI",
          "Priority Support",
          "Conversion Tracking",
        ],
        popular: true,
      },
      {
        name: "Enterprise",
        monthlyPrice: "Custom",
        period: "",
        description: "Full-service ad management with dedicated team.",
        features: [
          "Unlimited Platforms",
          "Custom Strategy",
          "Daily Optimization",
          "Dedicated Manager",
          "SLA Guarantee",
        ],
        popular: false,
        isContact: true,
      },
    ],
  },
];

/* ------------------------------------------------------------------ */
/*  COMPONENT                                                          */
/* ------------------------------------------------------------------ */

const Pricing = () => {
  const [activeCategory, setActiveCategory] = useState("bundles");
  const [isAnnual, setIsAnnual] = useState(false);
  const { user } = useAuth();
  const navigate = useNavigate();

  const category = categories.find((c) => c.id === activeCategory)!;

  return (
    <Layout>
      {/* Hero */}
      <section className="relative min-h-[50vh] flex items-center">
        <div className="absolute inset-0 z-0">
          <img src={pricingHero} alt="Pricing" className="w-full h-full object-cover opacity-40" />
          <div className="absolute inset-0 bg-gradient-to-b from-background/80 via-background/60 to-background" />
        </div>
        <div className="container-custom relative z-10 py-20 text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <span className="text-sm font-medium text-primary uppercase tracking-wider">Pricing</span>
            <h1 className="text-4xl md:text-6xl font-bold mt-4 mb-6 font-['Space_Grotesk']">
              Simple, Transparent <span className="gradient-text">Pricing</span>
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Choose individual services or save with our all-in-one bundles. Scale up anytime as you grow.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Category Navigation */}
      <section className="sticky top-16 z-20 bg-background/80 backdrop-blur-xl border-b border-border/50">
        <div className="container-custom py-3">
          <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-none">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => { setActiveCategory(cat.id); setIsAnnual(false); }}
                className={`flex-shrink-0 px-4 py-2 rounded-full text-sm font-medium transition-all whitespace-nowrap ${
                  activeCategory === cat.id
                    ? "bg-primary text-primary-foreground shadow-lg shadow-primary/25"
                    : "bg-muted/50 hover:bg-muted text-muted-foreground"
                }`}
              >
                {cat.id === "bundles" && "⭐ "}
                {cat.title}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Cards */}
      <section className="section-padding">
        <div className="container-custom">
          {/* Section Header + Toggle */}
          <motion.div
            key={category.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-10"
          >
            <h2 className="text-3xl md:text-4xl font-bold font-['Space_Grotesk'] mb-3">
              {category.title}
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto mb-6">{category.subtitle}</p>

            {/* Monthly / Annual Toggle */}
            {category.hasAnnual && !category.isOneTime && (
              <div className="inline-flex items-center gap-3 p-1.5 rounded-full bg-muted/60 border border-border/50">
                <button
                  onClick={() => setIsAnnual(false)}
                  className={`px-5 py-2 rounded-full text-sm font-medium transition-all ${
                    !isAnnual ? "bg-primary text-primary-foreground shadow-md" : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  Monthly
                </button>
                <button
                  onClick={() => setIsAnnual(true)}
                  className={`px-5 py-2 rounded-full text-sm font-medium transition-all ${
                    isAnnual ? "bg-primary text-primary-foreground shadow-md" : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  Annual
                  <Badge className="ml-2 bg-green-500/20 text-green-500 hover:bg-green-500/30 text-[10px] px-1.5 py-0">
                    Save 20%
                  </Badge>
                </button>
              </div>
            )}
          </motion.div>

          {/* Cards Grid */}
          <div className={`grid gap-6 mx-auto ${
            category.tiers.length === 2
              ? "md:grid-cols-2 max-w-3xl"
              : "md:grid-cols-2 lg:grid-cols-3 max-w-5xl"
          }`}>
            {category.tiers.map((tier, index) => {
              // Logic for Price Display:
              // If Annual: Show annualNote (monthly equivalent) as main price
              // If Monthly: Show monthlyPrice
              let priceDisplay = tier.monthlyPrice;
              let periodDisplay = tier.period;
              let billedText = "";

              if (isAnnual && tier.annualPrice) {
                 // annualNote format is "₹1,666/mo" -> we want just "₹1,666"
                 // assuming annualNote always exists for annual tiers
                 priceDisplay = tier.annualNote ? tier.annualNote.replace('/mo', '') : tier.annualPrice;
                 periodDisplay = "/month";
                 billedText = `Billed as ${tier.annualPrice}/year`;
              }

              if (tier.isContact) {
                  priceDisplay = "Custom";
                  periodDisplay = "";
                  billedText = "";
              }

              return (
                <motion.div
                  key={`${category.id}-${tier.name}`}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className={`relative flex flex-col p-6 rounded-2xl bg-card border transition-all hover:shadow-xl ${
                    tier.popular
                      ? "border-primary shadow-lg shadow-primary/10 scale-[1.02]"
                      : "border-border hover:border-primary/30"
                  }`}
                >
                  {tier.popular && (
                    <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-gradient-to-r from-primary to-accent text-xs font-semibold text-white">
                      ⭐ Most Popular
                    </div>
                  )}

                  <div className="mb-4">
                    <h3 className="text-xl font-bold font-['Space_Grotesk'] mb-1">{tier.name}</h3>
                    <p className="text-sm text-muted-foreground">{tier.description}</p>
                  </div>

                  <div className="mb-6">
                    <span className="text-4xl font-bold gradient-text">{priceDisplay}</span>
                    <span className="text-muted-foreground text-sm">{periodDisplay}</span>
                    {billedText && (
                      <p className="text-xs text-muted-foreground mt-1 font-medium">{billedText}</p>
                    )}
                  </div>

                  <ul className="space-y-3 mb-8 flex-1">
                    {tier.features.map((feature) => (
                      <li key={feature} className="flex items-start gap-2 text-sm">
                        <Check className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>

                  {tier.isContact ? (
                    <Link to="/contact">
                      <Button className="w-full" variant="outline">
                        Contact Sales <ArrowRight className="ml-2 h-4 w-4" />
                      </Button>
                    </Link>
                  ) : (
                    <Link to={user ? "/contact" : "/login"}>
                      <Button className={`w-full ${tier.popular ? "bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70 shadow-lg shadow-primary/20" : ""}`}>
                        Get Started <ArrowRight className="ml-2 h-4 w-4" />
                      </Button>
                    </Link>
                  )}
                </motion.div>
              );
            })}
          </div>

          {/* Growth Bundle Highlight (only on bundles tab) */}
          {activeCategory === "bundles" && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="mt-16 max-w-3xl mx-auto"
            >
              <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-primary/10 via-accent/5 to-primary/10 border border-primary/20 p-8 md:p-12">
                <div className="absolute top-0 right-0 -mt-10 -mr-10 w-64 h-64 bg-primary/10 rounded-full blur-3xl pointer-events-none" />
                <div className="relative z-10 text-center">
                  <Badge className="bg-primary/20 text-primary hover:bg-primary/30 mb-4">
                    🚀 Recommended
                  </Badge>
                  <h3 className="text-2xl md:text-3xl font-bold font-['Space_Grotesk'] mb-3">
                    Growth Bundle — Maximum Revenue Impact
                  </h3>
                  <p className="text-muted-foreground mb-6 max-w-xl mx-auto">
                    Our most popular plan combines AI Voice Calling, WhatsApp Automation, Chatbot, CRM Integration, and Advanced Automation — everything you need to scale.
                  </p>
                  <div className="flex flex-wrap justify-center gap-6 mb-8">
                    <div className="text-center">
                      <div className="text-lg font-medium text-muted-foreground mb-1">Monthly</div>
                      <div className="text-3xl font-bold gradient-text">₹29,999</div>
                      <div className="text-xs text-muted-foreground">/month</div>
                    </div>
                    <div className="w-[1px] bg-border/50 hidden md:block" />
                    <div className="text-center relative">
                       <Badge className="absolute -top-3 -right-6 bg-green-500/20 text-green-500 hover:bg-green-500/30 text-[10px] px-1.5 py-0">
                        Save 20%
                      </Badge>
                      <div className="text-lg font-medium text-muted-foreground mb-1">Annual</div>
                      <div className="text-3xl font-bold gradient-text">₹24,999</div>
                      <div className="text-xs text-muted-foreground">/month</div>
                      <div className="text-[10px] text-muted-foreground mt-1">Billed as ₹2,99,999/year</div>
                    </div>
                  </div>
                  <Link to={user ? "/contact" : "/login"}>
                    <Button size="lg" className="px-10 bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70 shadow-lg shadow-primary/25">
                      Start with Growth <ArrowRight className="ml-2 h-5 w-5" />
                    </Button>
                  </Link>
                </div>
              </div>
            </motion.div>
          )}
        </div>
      </section>

      <CTASection />
    </Layout>
  );
};

export default Pricing;
