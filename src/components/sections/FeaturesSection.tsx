import { motion } from "framer-motion";
import { Zap, Brain, Shield, BarChart3, Cpu, Globe, Code } from "lucide-react";
import { cn } from "@/lib/utils";

interface FeatureCardProps {
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  description: string;
  delay: number;
}

const features = [
  {
    icon: Zap,
    title: "Lightning Fast Processing",
    description: "Experience real-time AI processing with our optimized algorithms that deliver results in milliseconds.",
  },
  {
    icon: Brain,
    title: "Advanced AI Models",
    description: "Leverage state-of-the-art machine learning models trained on vast datasets for unparalleled accuracy.",
  },
  {
    icon: Shield,
    title: "Enterprise-Grade Security",
    description: "Your data is protected with end-to-end encryption and strict access controls.",
  },
  {
    icon: BarChart3,
    title: "Actionable Insights",
    description: "Transform raw data into meaningful insights with our intuitive analytics dashboard.",
  },
  {
    icon: Cpu,
    title: "Seamless Integration",
    description: "Easily integrate with your existing tech stack using our comprehensive API and SDKs.",
  },
  {
    icon: Globe,
    title: "Global Infrastructure",
    description: "Benefit from our worldwide network of servers ensuring low latency and high availability.",
  },
];

const FeatureCard = ({ icon: Icon, title, description, delay }: FeatureCardProps) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.5, delay: delay * 0.1 }}
    className="group relative overflow-hidden rounded-2xl bg-card p-6 shadow-lg transition-all duration-300 hover:shadow-xl dark:shadow-primary/10"
  >
    <div className="absolute -right-10 -top-10 h-24 w-24 rounded-full bg-primary/10 transition-all duration-500 group-hover:scale-150" />
    <div className="relative z-10">
      <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary">
        <Icon className="h-6 w-6" />
      </div>
      <h3 className="mb-2 text-xl font-bold text-foreground">{title}</h3>
      <p className="text-muted-foreground">{description}</p>
    </div>
  </motion.div>
);

export function FeaturesSection() {
  return (
    <section id="features" className="py-20 md:py-28 bg-gradient-to-b from-background to-muted/5 scroll-mt-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mx-auto max-w-4xl text-center"
        >
          <motion.span 
            className="inline-block rounded-full bg-primary/10 px-4 py-2 text-sm font-medium text-primary"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            Powerful Features
          </motion.span>
          <motion.h2 
            className="mt-4 text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            Everything You Need to Succeed
          </motion.h2>
          <motion.p 
            className="mx-auto mt-4 max-w-2xl text-lg text-muted-foreground"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            Discover the powerful features that make our platform the perfect choice for your business.
          </motion.p>
        </motion.div>

        <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((feature, index) => (
            <FeatureCard
              key={feature.title}
              icon={feature.icon}
              title={feature.title}
              description={feature.description}
              delay={index}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
