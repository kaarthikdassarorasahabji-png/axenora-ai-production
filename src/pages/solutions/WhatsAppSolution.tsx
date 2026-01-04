import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight, Check, MessageCircle, Zap, Clock, CalendarCheck, CreditCard, Users } from "lucide-react";
import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { CTASection } from "@/components/sections/CTASection";
import { FAQSection } from "@/components/sections/FAQSection";
import whatsappHero from "@/assets/whatsapp-hero.jpg";
import solutionWhatsapp from "@/assets/solution-whatsapp.jpg";

const features = [
  { icon: Zap, title: "Instant Auto-Replies", description: "Respond to customer messages instantly, 24/7, without lifting a finger." },
  { icon: Clock, title: "Smart Follow-ups", description: "Automated sequences that nurture leads and re-engage cold prospects." },
  { icon: CalendarCheck, title: "Appointment Reminders", description: "Reduce no-shows with automated appointment confirmations and reminders." },
  { icon: CreditCard, title: "Payment Reminders", description: "Gentle, automated payment follow-ups that improve collection rates." },
  { icon: Users, title: "Customer Reactivation", description: "Win back dormant customers with personalized reactivation campaigns." },
  { icon: MessageCircle, title: "Broadcast Messages", description: "Send promotional messages and updates to your entire customer base." },
];

const benefits = [
  "WhatsApp Business API integration",
  "Unlimited automated messages",
  "Custom message templates",
  "Rich media support",
  "Quick reply buttons",
  "Contact management",
  "Conversation analytics",
  "Human handoff capability",
];

const WhatsAppSolution = () => {
  return (
    <Layout>
      <section className="relative min-h-[70vh] flex items-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <motion.img initial={{ scale: 1.1 }} animate={{ scale: 1 }} transition={{ duration: 1.5 }} src={whatsappHero} alt="WhatsApp Automation" className="w-full h-full object-cover opacity-40" />
          <div className="absolute inset-0 bg-gradient-to-b from-background/80 via-background/60 to-background" />
        </div>
        <div className="container-custom relative z-10 py-20">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} className="max-w-3xl">
            <motion.span initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.2 }} className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-green-500/10 border border-green-500/20 text-sm font-medium text-green-400 mb-6">
              <MessageCircle className="w-4 h-4" />
              WhatsApp Automation
            </motion.span>
            <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="text-4xl md:text-6xl font-bold mb-6 font-['Space_Grotesk']">
              Turn WhatsApp Into Your <span className="gradient-text">Best Salesperson</span>
            </motion.h1>
            <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4 }} className="text-lg text-muted-foreground mb-8">
              Automate customer conversations, follow-ups, and sales on the world's most popular messaging platform.
            </motion.p>
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }} className="flex flex-wrap gap-4">
              <Link to="/contact"><Button className="btn-primary">Get Started <ArrowRight className="w-5 h-5" /></Button></Link>
              <Link to="/pricing"><Button variant="outline" className="btn-secondary">View Pricing</Button></Link>
            </motion.div>
          </motion.div>
        </div>
      </section>

      <section className="section-padding">
        <div className="container-custom">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
              <h2 className="text-3xl md:text-4xl font-bold mb-6 font-['Space_Grotesk']">Your Customers Are on <span className="gradient-text">WhatsApp</span></h2>
              <div className="space-y-4 text-muted-foreground">
                <p>With over 2 billion users, WhatsApp is where your customers prefer to communicate. But managing conversations manually doesn't scale.</p>
                <p>Our automation handles the repetitive work — instant replies, follow-ups, reminders — while you focus on closing deals.</p>
                <p className="text-foreground font-medium">The result? Faster response times, higher engagement, and more conversions.</p>
              </div>
            </motion.div>
            <motion.div initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="relative">
              <img src={solutionWhatsapp} alt="WhatsApp Automation" className="rounded-2xl border border-border" />
            </motion.div>
          </div>
        </div>
      </section>

      <section className="section-padding bg-card/30">
        <div className="container-custom">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-6 font-['Space_Grotesk']">Powerful <span className="gradient-text">Automation Features</span></h2>
          </motion.div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature, index) => (
              <motion.div key={feature.title} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: index * 0.1 }} whileHover={{ y: -5 }} className="p-6 rounded-2xl bg-card border border-border hover:border-green-500/50 transition-all">
                <div className="p-3 rounded-xl bg-green-500/20 border border-green-500/30 w-fit mb-4"><feature.icon className="w-6 h-6 text-green-400" /></div>
                <h3 className="text-xl font-semibold mb-2 font-['Space_Grotesk']">{feature.title}</h3>
                <p className="text-muted-foreground text-sm">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="section-padding">
        <div className="container-custom">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
              <h2 className="text-3xl md:text-4xl font-bold mb-8 font-['Space_Grotesk']">Everything <span className="gradient-text">Included</span></h2>
              <div className="grid grid-cols-2 gap-4">
                {benefits.map((benefit, index) => (
                  <motion.div key={benefit} initial={{ opacity: 0, x: -10 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: index * 0.05 }} className="flex items-center gap-3">
                    <div className="p-1 rounded-full bg-green-500/20"><Check className="w-4 h-4 text-green-400" /></div>
                    <span className="text-sm">{benefit}</span>
                  </motion.div>
                ))}
              </div>
            </motion.div>
            <motion.div initial={{ opacity: 0, scale: 0.9 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} className="p-8 rounded-2xl bg-gradient-to-br from-green-500/10 to-accent/10 border border-green-500/30">
              <h3 className="text-2xl font-bold mb-4 font-['Space_Grotesk']">See It In Action</h3>
              <p className="text-muted-foreground mb-6">Book a demo and experience how WhatsApp automation can transform your customer communication.</p>
              <Link to="/contact"><Button className="btn-primary w-full">Book Demo <ArrowRight className="w-5 h-5" /></Button></Link>
            </motion.div>
          </div>
        </div>
      </section>

      <FAQSection />
      <CTASection />
    </Layout>
  );
};

export default WhatsAppSolution;
