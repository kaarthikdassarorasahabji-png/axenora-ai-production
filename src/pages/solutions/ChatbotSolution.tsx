import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight, Check, Bot, MessageSquare, Globe2, Plug, Brain, Clock } from "lucide-react";
import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { CTASection } from "@/components/sections/CTASection";
import { FAQSection } from "@/components/sections/FAQSection";
import chatbotHero from "@/assets/chatbot-hero.jpg";
import solutionChatbot from "@/assets/solution-chatbot.jpg";

const features = [
  { icon: Brain, title: "Lead Qualification", description: "AI automatically qualifies leads based on your criteria before passing to sales." },
  { icon: Globe2, title: "Multi-Language Support", description: "Communicate with customers in their preferred language automatically." },
  { icon: Plug, title: "CRM Integration", description: "Seamlessly sync conversations and leads with your existing CRM." },
  { icon: MessageSquare, title: "Natural Conversations", description: "Advanced NLP ensures human-like, context-aware responses." },
  { icon: Clock, title: "24/7 Availability", description: "Never miss a lead — your chatbot works around the clock." },
  { icon: Bot, title: "Custom Personality", description: "Train the bot to match your brand voice and personality." },
];

const benefits = [
  "Website & app integration",
  "Multi-channel deployment",
  "Intent recognition",
  "Entity extraction",
  "Conversation flows",
  "Human handoff",
  "Analytics dashboard",
  "A/B testing",
];

const ChatbotSolution = () => {
  return (
    <Layout>
      <section className="relative min-h-[70vh] flex items-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <motion.img initial={{ scale: 1.1 }} animate={{ scale: 1 }} transition={{ duration: 1.5 }} src={chatbotHero} alt="AI Chatbots" className="w-full h-full object-cover opacity-40" />
          <div className="absolute inset-0 bg-gradient-to-b from-background/80 via-background/60 to-background" />
        </div>
        <div className="container-custom relative z-10 py-20">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} className="max-w-3xl">
            <motion.span initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.2 }} className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 text-sm font-medium text-primary mb-6">
              <Bot className="w-4 h-4" />
              AI Chatbots
            </motion.span>
            <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="text-4xl md:text-6xl font-bold mb-6 font-['Space_Grotesk']">
              Chatbots That Don't Just Talk — <span className="gradient-text">They Convert</span>
            </motion.h1>
            <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4 }} className="text-lg text-muted-foreground mb-8">
              Deploy intelligent chatbots that qualify leads, answer questions, and drive conversions while you focus on growing your business.
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
              <h2 className="text-3xl md:text-4xl font-bold mb-6 font-['Space_Grotesk']">Beyond Basic <span className="gradient-text">Chatbots</span></h2>
              <div className="space-y-4 text-muted-foreground">
                <p>Most chatbots frustrate customers with scripted responses and dead ends. Our AI chatbots understand context, intent, and emotion.</p>
                <p>They handle complex conversations naturally, qualify leads intelligently, and know exactly when to bring in a human.</p>
                <p className="text-foreground font-medium">The result? Higher customer satisfaction and more qualified leads for your sales team.</p>
              </div>
            </motion.div>
            <motion.div initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="relative">
              <img src={solutionChatbot} alt="AI Chatbot Interface" className="rounded-2xl border border-border" />
            </motion.div>
          </div>
        </div>
      </section>

      <section className="section-padding bg-card/30">
        <div className="container-custom">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-6 font-['Space_Grotesk']">Intelligent <span className="gradient-text">Capabilities</span></h2>
          </motion.div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature, index) => (
              <motion.div key={feature.title} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: index * 0.1 }} whileHover={{ y: -5 }} className="p-6 rounded-2xl bg-card border border-border hover:border-primary/50 transition-all">
                <div className="p-3 rounded-xl bg-primary/20 border border-primary/30 w-fit mb-4"><feature.icon className="w-6 h-6 text-primary" /></div>
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
              <h2 className="text-3xl md:text-4xl font-bold mb-8 font-['Space_Grotesk']">Full-Featured <span className="gradient-text">Platform</span></h2>
              <div className="grid grid-cols-2 gap-4">
                {benefits.map((benefit, index) => (
                  <motion.div key={benefit} initial={{ opacity: 0, x: -10 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: index * 0.05 }} className="flex items-center gap-3">
                    <div className="p-1 rounded-full bg-primary/20"><Check className="w-4 h-4 text-primary" /></div>
                    <span className="text-sm">{benefit}</span>
                  </motion.div>
                ))}
              </div>
            </motion.div>
            <motion.div initial={{ opacity: 0, scale: 0.9 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} className="p-8 rounded-2xl bg-gradient-to-br from-primary/10 to-accent/10 border border-primary/30">
              <h3 className="text-2xl font-bold mb-4 font-['Space_Grotesk']">Try Our Demo Bot</h3>
              <p className="text-muted-foreground mb-6">Experience the intelligence of our chatbots firsthand with a live demo.</p>
              <Link to="/contact"><Button className="btn-primary w-full">Request Demo <ArrowRight className="w-5 h-5" /></Button></Link>
            </motion.div>
          </div>
        </div>
      </section>

      <FAQSection />
      <CTASection />
    </Layout>
  );
};

export default ChatbotSolution;
