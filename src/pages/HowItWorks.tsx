import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { Link } from "react-router-dom";
import { Layout } from "@/components/layout/Layout";
import { CTASection } from "@/components/sections/CTASection";
import { Button } from "@/components/ui/button";
import { Check, ArrowRight, Zap, MessageSquare, Settings, BarChart2, Users, Clock, Shield, Code, Smartphone } from "lucide-react";

type Step = {
  id: number;
  title: string;
  description: string;
  icon: React.ComponentType<{ className?: string }>;
  features: string[];
};

const steps: Step[] = [
  {
    id: 1,
    title: "Discovery & Planning",
    description: "We start by understanding your business needs and goals to create a tailored AI solution.",
    icon: MessageSquare,
    features: [
      "Free consultation call",
      "Business process analysis",
      "Custom solution design",
      "Implementation roadmap"
    ]
  },
  {
    id: 2,
    title: "Development & Integration",
    description: "Our team builds and integrates the AI solutions with your existing systems.",
    icon: Code,
    features: [
      "Custom AI model training",
      "API integrations",
      "Testing & quality assurance",
      "Security implementation"
    ]
  },
  {
    id: 3,
    title: "Deployment & Training",
    description: "We deploy the solution and train your team to use it effectively.",
    icon: Settings,
    features: [
      "Phased rollout",
      "Team training sessions",
      "Documentation",
      "Initial support"
    ]
  },
  {
    id: 4,
    title: "Optimization & Growth",
    description: "Continuous improvement and scaling of your AI solutions.",
    icon: BarChart2,
    features: [
      "Performance analytics",
      "Regular updates",
      "Feature enhancements",
      "Scaling support"
    ]
  }
];

const benefits = [
  { icon: Clock, title: "Save Time", description: "Automate repetitive tasks and focus on what matters" },
  { icon: Zap, title: "Increase Efficiency", description: "Streamline operations with AI-powered automation" },
  { icon: Users, title: "Enhance CX", description: "Deliver 24/7 customer support with AI assistants" },
  { icon: Shield, title: "Data Security", description: "Enterprise-grade security for your data" },
  { icon: Smartphone, title: "Mobile Ready", description: "Access your AI tools from anywhere, on any device" },
];

const HowItWorks = () => {
  const [activeStep, setActiveStep] = useState(1);
  const currentStep = steps.find(step => step.id === activeStep) || steps[0];
  const Icon = currentStep.icon;

  return (
    <Layout>
      {/* Hero Section */}
      <section className="relative min-h-[70vh] flex items-center overflow-hidden">
        <div className="absolute inset-0 z-0 bg-gradient-to-br from-primary/5 via-background to-accent/5" />
        <div className="absolute inset-0 z-0 opacity-10">
          <div className="absolute inset-0 bg-[url('@/assets/grid-pattern.svg')]" />
        </div>
        
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10 py-20">
          <div className="max-w-4xl mx-auto text-center">
            <motion.span 
              className="inline-block px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              Our Process
            </motion.span>
            <motion.h1 
              className="text-4xl md:text-6xl font-bold mb-6"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              How <span className="text-primary">Axenora AI</span> Works
            </motion.h1>
            <motion.p 
              className="text-xl text-muted-foreground mb-8 max-w-3xl mx-auto"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              A simple, transparent process to transform your business with AI automation. See how we can help you achieve your goals.
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="flex flex-wrap justify-center gap-4"
            >
              <Link to="/contact">
                <Button size="lg" className="group">
                  Get Started
                  <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Button>
              </Link>
              <Button variant="outline" size="lg" asChild>
                <a href="https://wa.me/917814051678?text=I'm%20interested%20in%20a%20demo%20of%20Axenora%20AI." target="_blank" rel="noopener noreferrer">
                  Watch Demo
                </a>
              </Button>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Process Steps */}
      <section className="py-20 bg-muted/20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <div className="grid md:grid-cols-4 gap-1 mb-12">
              {steps.map((step) => (
                <button
                  key={step.id}
                  onClick={() => setActiveStep(step.id)}
                  className={`px-4 py-3 text-left rounded-lg transition-all ${
                    activeStep === step.id
                      ? 'bg-primary/10 text-primary border border-primary/20'
                      : 'hover:bg-muted/50'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div className={`p-2 rounded-lg ${
                      activeStep === step.id 
                        ? 'bg-primary text-white' 
                        : 'bg-muted'
                    }`}>
                      <step.icon className="h-5 w-5" />
                    </div>
                    <span className="font-medium">Step {step.id}</span>
                  </div>
                </button>
              ))}
            </div>

            <AnimatePresence mode="wait">
              <motion.div
                key={activeStep}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                transition={{ duration: 0.3 }}
                className="bg-background rounded-2xl p-8 shadow-lg border border-border/20"
              >
                <div className="flex flex-col md:flex-row gap-8">
                  <div className="md:w-1/3">
                    <div className="p-4 bg-primary/10 rounded-xl inline-flex items-center justify-center mb-4">
                      <Icon className="h-10 w-10 text-primary" />
                    </div>
                    <h2 className="text-2xl font-bold mb-2">{currentStep.title}</h2>
                    <p className="text-muted-foreground">{currentStep.description}</p>
                  </div>
                  <div className="md:w-2/3">
                    <h3 className="font-medium mb-4 text-foreground/80">Key Features:</h3>
                    <ul className="space-y-3">
                      {currentStep.features.map((feature, index) => (
                        <li key={index} className="flex items-start gap-3">
                          <Check className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Why Choose Our <span className="text-primary">AI Solutions</span></h2>
            <p className="text-xl text-muted-foreground">Experience the benefits of AI-powered automation for your business</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {benefits.map((benefit, index) => (
              <motion.div 
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-card p-6 rounded-xl border border-border/20 hover:shadow-lg transition-shadow"
              >
                <div className="p-3 bg-primary/10 rounded-lg w-fit mb-4">
                  <benefit.icon className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-2">{benefit.title}</h3>
                <p className="text-muted-foreground">{benefit.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <CTASection />
    </Layout>
  );
};

export default HowItWorks;
