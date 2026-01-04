import { motion } from "framer-motion";
import { Link, useParams } from "react-router-dom";
import { ArrowRight, Check, Globe, Zap, Target, BarChart3, PhoneCall, Palette } from "lucide-react";
import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { CTASection } from "@/components/sections/CTASection";
import { FAQSection } from "@/components/sections/FAQSection";
import websiteHero from "@/assets/website-hero.jpg";
import solutionWebsite from "@/assets/solution-website.jpg";

const features = [
  { icon: Zap, title: "AI-Generated Copy", description: "Compelling headlines and content created by AI that converts visitors into customers." },
  { icon: Target, title: "Conversion-Focused Design", description: "Every element strategically placed to guide visitors toward taking action." },
  { icon: PhoneCall, title: "Voice Bot Concierge", description: "Embeddable AI voice agents that greet visitors, answer questions, and book calls directly from your site." },
  { icon: Palette, title: "Premium Aesthetics", description: "Modern, professional designs that build trust and credibility instantly." },
  { icon: BarChart3, title: "Analytics Dashboard", description: "Real-time insights into visitor behavior and conversion performance." },
  { icon: Globe, title: "SEO Optimized", description: "Built for search engines from day one to drive organic traffic." },
];

const benefits = [
  "Custom design tailored to your brand",
  "Mobile-responsive layouts",
  "Fast loading speeds",
  "WhatsApp integration",
  "Lead capture forms",
  "SSL security included",
  "Monthly performance reports",
  "Unlimited revisions",
];

const WebsiteSolution = () => {
  return (
    <Layout>
      {/* Hero */}
      <section className="relative min-h-[70vh] flex items-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <motion.img
            initial={{ scale: 1.1 }}
            animate={{ scale: 1 }}
            transition={{ duration: 1.5 }}
            src={websiteHero}
            alt="AI Website Development"
            className="w-full h-full object-cover opacity-40"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-background/80 via-background/60 to-background" />
        </div>

        <div className="container-custom relative z-10 py-20">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-3xl"
          >
            <motion.span
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 text-sm font-medium text-primary mb-6"
            >
              <Globe className="w-4 h-4" />
              AI Website Development
            </motion.span>
            
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="text-4xl md:text-6xl font-bold mb-6 font-['Space_Grotesk']"
            >
              Websites That Work Like{" "}
              <span className="gradient-text">Sales Systems</span>
            </motion.h1>
            
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="text-lg text-muted-foreground mb-8"
            >
              Traditional websites are digital brochures. Our AI-powered websites are 
              conversion machines — built to capture leads, engage visitors, and grow your business 24/7.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="flex flex-wrap gap-4"
            >
              <Link to="/contact">
                <Button className="btn-primary">
                  Get Started <ArrowRight className="w-5 h-5" />
                </Button>
              </Link>
              <Link to="/pricing">
                <Button variant="outline" className="btn-secondary">
                  View Pricing
                </Button>
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Problem Section */}
      <section className="section-padding">
        <div className="container-custom">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl md:text-4xl font-bold mb-6 font-['Space_Grotesk']">
                The Problem With <span className="gradient-text">Traditional Websites</span>
              </h2>
              <div className="space-y-4 text-muted-foreground">
                <p>Most businesses spend thousands on websites that look pretty but don't perform. They're static, passive, and do nothing to actively grow your business.</p>
                <p>Visitors land, browse, and leave — without ever becoming leads or customers. That's money left on the table every single day.</p>
                <p className="text-foreground font-medium">Axenora AI websites are different. They're built with one goal: conversion.</p>
              </div>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="relative"
            >
              <img
                src={solutionWebsite}
                alt="AI Website Dashboard"
                className="rounded-2xl border border-border"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background/60 to-transparent rounded-2xl" />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="section-padding bg-card/30">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-6 font-['Space_Grotesk']">
              Powered by <span className="gradient-text">AI Technology</span>
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Every feature is designed to maximize your website's performance.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -5, transition: { duration: 0.2 } }}
                className="p-6 rounded-2xl bg-card border border-border hover:border-primary/50 transition-all"
              >
                <div className="p-3 rounded-xl bg-primary/20 border border-primary/30 w-fit mb-4">
                  <feature.icon className="w-6 h-6 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-2 font-['Space_Grotesk']">{feature.title}</h3>
                <p className="text-muted-foreground text-sm">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* What's Included */}
      <section className="section-padding">
        <div className="container-custom">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl md:text-4xl font-bold mb-8 font-['Space_Grotesk']">
                Everything You Need, <span className="gradient-text">Included</span>
              </h2>
              <div className="grid grid-cols-2 gap-4">
                {benefits.map((benefit, index) => (
                  <motion.div
                    key={benefit}
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.05 }}
                    className="flex items-center gap-3"
                  >
                    <div className="p-1 rounded-full bg-primary/20">
                      <Check className="w-4 h-4 text-primary" />
                    </div>
                    <span className="text-sm">{benefit}</span>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="p-8 rounded-2xl bg-gradient-to-br from-primary/10 to-accent/10 border border-primary/30"
            >
              <h3 className="text-2xl font-bold mb-4 font-['Space_Grotesk']">Ready to Get Started?</h3>
              <p className="text-muted-foreground mb-6">
                Book a free consultation and see how an AI-powered website can transform your business.
              </p>
              <Link to="/contact">
                <Button className="btn-primary w-full">
                  Book Free Consultation <ArrowRight className="w-5 h-5" />
                </Button>
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      <FAQSection />
      <CTASection />
    </Layout>
  );
};

export default WebsiteSolution;
