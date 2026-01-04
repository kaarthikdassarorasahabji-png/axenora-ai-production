import { motion } from "framer-motion";
import { ArrowRight, Play, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import heroBg from "@/assets/hero-bg.jpg";

const missionStatement =
  "Axenora AI installs autonomous revenue systems so modern companies can scale without adding headcount.";

export function HeroSection() {
  const features = [
    "No credit card required",
    "14-day free trial",
    "Cancel anytime"
  ];

  return (
    <section className="relative min-h-[90vh] flex items-center overflow-hidden bg-gradient-to-b from-background to-background/95">
      {/* Background */}
      <div className="absolute inset-0 z-0">
        <motion.img
          initial={{ scale: 1.1, opacity: 0 }}
          animate={{ scale: 1, opacity: 0.4 }}
          transition={{ duration: 1.5, ease: "easeOut" }}
          src={heroBg}
          alt="AI Technology Background"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-background/90 via-background/70 to-background/90" />
      </div>

      {/* Animated Glow Orbs */}
      <motion.div
        animate={{ opacity: [0.5, 0.8, 0.5], scale: [1, 1.05, 1] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/20 rounded-full blur-[120px] pointer-events-none"
      />
      <motion.div
        animate={{ opacity: [0.5, 0.8, 0.5], scale: [1, 1.05, 1] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 2 }}
        className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-accent/20 rounded-full blur-[100px] pointer-events-none"
      />

      <div className="container-custom relative z-10 py-20">
        <div className="max-w-4xl mx-auto text-center">
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-6"
          >
            <motion.span
              whileHover={{ scale: 1.05 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 text-sm font-medium text-primary cursor-default"
            >
              <motion.span
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="w-2 h-2 rounded-full bg-primary"
              />
              Trusted by 500+ businesses worldwide
            </motion.span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6 font-['Space_Grotesk'] bg-clip-text text-transparent bg-gradient-to-r from-primary to-accent"
          >
            AI That Grows Your Business
            <motion.span
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.5, duration: 0.5, type: "spring" }}
              className="block mt-4 text-3xl md:text-4xl font-normal text-foreground"
            >
              While You Focus On What Matters
            </motion.span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-8"
          >
            {missionStatement}
          </motion.p>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12"
          >
            <Button 
              size="lg" 
              className="px-8 py-6 text-base font-semibold bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70 transition-all duration-300 transform hover:-translate-y-0.5 shadow-lg hover:shadow-primary/20"
              asChild
            >
              <a href="tel:+917814051678">
                Start Free Trial <ArrowRight className="ml-2 h-5 w-5" />
              </a>
            </Button>
            <Button 
              variant="outline" 
              size="lg" 
              className="px-8 py-6 text-base font-medium border-2 border-foreground/10 hover:bg-accent/10 hover:border-accent/50 transition-colors"
              asChild
            >
              <a href="https://wa.me/917814051678?text=I'm%20interested%20in%20a%20demo%20of%20Axenora%20AI." target="_blank" rel="noopener noreferrer">
                <Play className="w-5 h-5 mr-2" /> Watch Demo
              </a>
            </Button>
          </motion.div>

          {/* Features */}
          <motion.div 
            className="flex flex-wrap items-center justify-center gap-4 mb-12"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            {features.map((feature, index) => (
              <motion.div 
                key={feature}
                className="flex items-center gap-2 px-4 py-2 bg-accent/10 rounded-full text-sm text-foreground/80"
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.5 + index * 0.1 }}
              >
                <Check className="w-4 h-4 text-primary" />
                {feature}
              </motion.div>
            ))}
          </motion.div>

          {/* Social Proof */}
          <motion.div 
            className="mt-12 pt-8 border-t border-border/20"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
          >
            <p className="text-sm text-muted-foreground mb-4 text-center">TRUSTED BY INNOVATIVE TEAMS</p>
            <div className="flex flex-wrap items-center justify-center gap-8 opacity-70 grayscale hover:grayscale-0 transition-all">
              {['TechCrunch', 'Forbes', 'YCombinator', 'Product Hunt', 'The Verge'].map((logo) => (
                <div key={logo} className="text-lg font-medium text-foreground/80">
                  {logo}
                </div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Floating Visual */}
        <motion.div
          animate={{ y: [-10, 10, -10] }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
          className="hidden lg:block absolute right-0 top-1/2 -translate-y-1/2 w-96 h-96"
        >
          <motion.div animate={{ rotate: 360 }} transition={{ duration: 30, repeat: Infinity, ease: "linear" }} className="absolute inset-0 rounded-full border border-primary/20" />
          <motion.div animate={{ rotate: -360 }} transition={{ duration: 25, repeat: Infinity, ease: "linear" }} className="absolute inset-8 rounded-full border border-accent/20" />
          <motion.div animate={{ rotate: 360 }} transition={{ duration: 20, repeat: Infinity, ease: "linear" }} className="absolute inset-16 rounded-full border border-primary/30" />
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-32 h-32 rounded-full bg-gradient-to-br from-primary/30 to-accent/30 blur-xl" />
          </div>
        </motion.div>
      </div>
    </section>
  );
}
