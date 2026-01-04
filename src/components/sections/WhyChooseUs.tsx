import { motion } from "framer-motion";
import { Zap, Shield, Clock, HeadphonesIcon, BarChart3, Users } from "lucide-react";

const benefits = [
  {
    icon: Zap,
    title: "Lightning Fast Implementation",
    description: "Get your AI systems up and running in days, not months. Quick deployment without sacrificing quality.",
  },
  {
    icon: Shield,
    title: "Enterprise-Grade Security",
    description: "Your data is protected with bank-level encryption and compliance with international security standards.",
  },
  {
    icon: Clock,
    title: "24/7 AI Operations",
    description: "Your AI systems work around the clock, engaging customers and processing requests even while you sleep.",
  },
  {
    icon: HeadphonesIcon,
    title: "Dedicated Support",
    description: "Our team is always available to help you optimize and scale your AI systems for maximum ROI.",
  },
  {
    icon: BarChart3,
    title: "Data-Driven Optimization",
    description: "Continuous learning and improvement based on real performance data and business outcomes.",
  },
  {
    icon: Users,
    title: "Built for Scale",
    description: "From startups to enterprises, our solutions grow with your business without missing a beat.",
  },
];

export function WhyChooseUs() {
  return (
    <section className="section-padding bg-card/30">
      <div className="container-custom">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="text-sm font-medium text-primary uppercase tracking-wider">
            Why Axenora AI
          </span>
          <h2 className="text-3xl md:text-5xl font-bold mt-4 mb-6 font-['Space_Grotesk']">
            Built for Businesses That{" "}
            <span className="gradient-text">Want to Win</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            We don't just build AI tools — we build AI systems that transform how your business operates.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {benefits.map((benefit, index) => (
            <motion.div
              key={benefit.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="p-6 rounded-2xl bg-card border border-border hover:border-primary/50 transition-all hover:glow-sm"
            >
              <div className="p-3 rounded-xl bg-gradient-to-br from-primary/20 to-accent/20 border border-primary/30 w-fit mb-4">
                <benefit.icon className="w-6 h-6 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-3 font-['Space_Grotesk']">
                {benefit.title}
              </h3>
              <p className="text-muted-foreground text-sm">
                {benefit.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
