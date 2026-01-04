import { motion, AnimatePresence } from "framer-motion";
import { Search, Lightbulb, Rocket, TrendingUp, ArrowRight, Check } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import * as React from "react";

interface Step {
  icon: React.ComponentType<{ className?: string }>;
  step: string;
  title: string;
  description: string;
  features: string[];
}

const steps: Step[] = [
  {
    icon: Search,
    step: "01",
    title: "Discovery & Analysis",
    description: "We dive deep into your business processes to identify automation opportunities and key growth areas.",
    features: [
      "Business process audit",
      "Growth opportunity analysis",
      "Custom strategy development"
    ]
  },
  {
    icon: Lightbulb,
    step: "02",
    title: "AI Solution Design",
    description: "Our experts design a tailored AI system that aligns with your unique business needs and objectives.",
    features: [
      "Custom AI architecture",
      "Workflow integration plan",
      "Implementation roadmap"
    ]
  },
  {
    icon: Rocket,
    step: "03",
    title: "Seamless Deployment",
    description: "We implement and integrate AI solutions with minimal disruption to your daily operations.",
    features: [
      "Phased implementation",
      "Staff training",
      "System testing & QA"
    ]
  },
  {
    icon: TrendingUp,
    step: "04",
    title: "Growth & Optimization",
    description: "Continuous monitoring and refinement to ensure your AI systems evolve with your business.",
    features: [
      "Performance analytics",
      "Regular optimization",
      "Ongoing support"
    ]
  }
];

export function HowItWorksSection() {
  const [activeStep, setActiveStep] = useState(0);
  const activeStepData = steps[activeStep];
  const IconComponent = activeStepData.icon;

  return (
    <section className="py-20 md:py-28 bg-gradient-to-b from-background to-muted/20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center max-w-4xl mx-auto mb-16"
        >
          <motion.span 
            className="inline-block px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            Our Process
          </motion.span>
          <motion.h2 
            className="text-3xl md:text-5xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-foreground to-foreground/70"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            Transforming Your Business with AI
          </motion.h2>
          <motion.p 
            className="text-lg text-muted-foreground"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            Our proven 4-step process ensures seamless integration of AI into your business operations
          </motion.p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 items-start">
          {/* Steps Navigation */}
          <div className="lg:col-span-2 space-y-4">
            {steps.map((item, index) => {
              const isActive = activeStep === index;
              const Icon = item.icon;
              return (
                <motion.div
                  key={item.step}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  onClick={() => setActiveStep(index)}
                  className={`p-6 rounded-xl cursor-pointer transition-all duration-300 ${
                    isActive 
                      ? 'bg-card border-2 border-primary/20 shadow-lg shadow-primary/10' 
                      : 'bg-card/50 border border-border hover:border-primary/30 hover:shadow-md'
                  }`}
                >
                  <div className="flex items-start gap-4">
                    <div className={`p-3 rounded-lg ${
                      isActive 
                        ? 'bg-primary/10 text-primary' 
                        : 'bg-muted/50 text-muted-foreground'
                    }`}>
                      <Icon className="w-5 h-5" />
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className={`text-sm font-medium ${
                          isActive ? 'text-primary' : 'text-muted-foreground'
                        }`}>
                          {item.step}
                        </span>
                        {isActive && (
                          <motion.span 
                            className="w-2 h-2 rounded-full bg-primary"
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                          />
                        )}
                      </div>
                      <h3 className={`text-lg font-semibold mt-1 ${
                        isActive ? 'text-foreground' : 'text-foreground/80'
                      }`}>
                        {item.title}
                      </h3>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>

          {/* Step Content */}
          <div className="lg:col-span-3">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeStep}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
                className="bg-card p-8 rounded-2xl border border-border shadow-lg h-full"
              >
                <div className="flex items-center gap-3 mb-6">
                  <div className="p-3 rounded-xl bg-gradient-to-br from-primary/10 to-accent/10 border border-primary/20">
                    <IconComponent className="w-6 h-6 text-primary" />
                  </div>
                  <span className="text-sm font-medium text-primary">
                    {activeStepData.step}
                  </span>
                </div>
                
                <h3 className="text-2xl md:text-3xl font-bold mb-4 bg-gradient-to-r from-foreground to-foreground/80 bg-clip-text text-transparent">
                  {activeStepData.title}
                </h3>
                
                <p className="text-muted-foreground text-lg mb-8">
                  {activeStepData.description}
                </p>
                
                <div className="space-y-4 mb-8">
                  {activeStepData.features.map((feature, index) => (
                    <div key={index} className="flex items-start gap-3">
                      <Check className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                      <span className="text-foreground/90">{feature}</span>
                    </div>
                  ))}
                </div>
                
                <div className="pt-6 border-t border-border/50">
                  <Button size="lg" className="group">
                    Learn more about this step
                    <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </Button>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
        
        {/* Progress Indicators (Mobile) */}
        <div className="flex justify-center gap-2 mt-8 lg:hidden">
          {steps.map((_, index) => (
            <button
              key={index}
              onClick={() => setActiveStep(index)}
              className={`h-3 rounded-full transition-all ${
                activeStep === index ? 'bg-primary w-8' : 'w-3 bg-border'
              }`}
              aria-label={`Go to step ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
