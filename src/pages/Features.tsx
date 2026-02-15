import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Layout } from "@/components/layout/Layout";
import { FeaturesSection } from "@/components/sections/FeaturesSection";
import { CTASection } from "@/components/sections/CTASection";
import { Button } from "@/components/ui/button";

export default function Features() {
  return (
    <Layout>
      <section className="relative min-h-[60vh] flex items-center">
        <div className="absolute inset-0 z-0 bg-gradient-to-br from-primary/5 to-accent/5" />
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10 py-20">
          <div className="max-w-3xl mx-auto text-center">
            <motion.span 
              className="inline-block px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              Features
            </motion.span>
            <motion.h1 
              className="text-4xl md:text-6xl font-bold mb-6"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              Powerful Features for <span className="text-primary">Your Business</span>
            </motion.h1>
            <motion.p 
              className="text-xl text-muted-foreground mb-8"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              Discover how our comprehensive suite of tools can transform your business operations and drive growth.
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <Link to="/contact"><Button size="lg" className="mr-4">Get Started</Button></Link>
              <Link to="/how-it-works"><Button variant="outline" size="lg">Learn More</Button></Link>
            </motion.div>
          </div>
        </div>
      </section>
      
      <FeaturesSection />
      <CTASection />
    </Layout>
  );
}
