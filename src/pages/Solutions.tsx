import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight, Globe, Megaphone, MessageCircle, Bot, Phone } from "lucide-react";
import { Layout } from "@/components/layout/Layout";
import { CTASection } from "@/components/sections/CTASection";
import solutionsHero from "@/assets/solutions-hero.jpg";
import solutionWebsite from "@/assets/solution-website.jpg";
import solutionAds from "@/assets/solution-ads.jpg";
import solutionWhatsapp from "@/assets/solution-whatsapp.jpg";
import solutionChatbot from "@/assets/solution-chatbot.jpg";
import solutionCalling from "@/assets/solution-calling.jpg";

const solutions = [
  { icon: Globe, title: "AI Website Development", description: "Websites that work like sales systems with AI-generated copy, conversion-focused layouts, and built-in chatbot & WhatsApp integration.", image: solutionWebsite, href: "/solutions/website" },
  { icon: Megaphone, title: "AI Ads & Marketing Automation", description: "Automated creative testing, smart budget optimization, and continuous performance improvement that learns and scales.", image: solutionAds, href: "/solutions/ads" },
  { icon: MessageCircle, title: "WhatsApp Automation", description: "Turn WhatsApp into your best salesperson with instant replies, automated follow-ups, appointment & payment reminders.", image: solutionWhatsapp, href: "/solutions/whatsapp" },
  { icon: Bot, title: "AI Chatbots", description: "Chatbots that don't just talk — they convert. Lead qualification, multi-language support, and CRM integration.", image: solutionChatbot, href: "/solutions/chatbots" },
  { icon: Phone, title: "AI Calling Agents", description: "AI voice agents that sound human. Inbound & outbound calling, objection handling, and appointment booking.", image: solutionCalling, href: "/solutions/calling" },
];

const Solutions = () => {
  return (
    <Layout>
      <section className="relative min-h-[60vh] flex items-center">
        <div className="absolute inset-0 z-0">
          <img src={solutionsHero} alt="Solutions" className="w-full h-full object-cover opacity-40" />
          <div className="absolute inset-0 bg-gradient-to-b from-background/80 via-background/60 to-background" />
        </div>
        <div className="container-custom relative z-10 py-20">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="max-w-3xl">
            <span className="text-sm font-medium text-primary uppercase tracking-wider">Our Solutions</span>
            <h1 className="text-4xl md:text-6xl font-bold mt-4 mb-6 font-['Space_Grotesk']">
              AI Solutions Designed to <span className="gradient-text">Run Your Business</span>
            </h1>
            <p className="text-lg text-muted-foreground">Complete AI-powered automation for every aspect of your business growth.</p>
          </motion.div>
        </div>
      </section>

      <section className="section-padding">
        <div className="container-custom">
          <div className="grid gap-8">
            {solutions.map((solution, index) => (
              <motion.div key={solution.title} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: index * 0.1 }}>
                <Link to={solution.href} className="group grid md:grid-cols-2 gap-8 p-6 rounded-2xl bg-card border border-border hover:border-primary/50 transition-all">
                  <div className="relative h-64 md:h-80 rounded-xl overflow-hidden">
                    <img src={solution.image} alt={solution.title} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
                  </div>
                  <div className="flex flex-col justify-center">
                    <div className="p-3 rounded-xl bg-primary/20 border border-primary/30 w-fit mb-4">
                      <solution.icon className="w-6 h-6 text-primary" />
                    </div>
                    <h2 className="text-2xl md:text-3xl font-bold mb-4 font-['Space_Grotesk'] group-hover:text-primary transition-colors">{solution.title}</h2>
                    <p className="text-muted-foreground mb-6">{solution.description}</p>
                    <span className="inline-flex items-center gap-2 text-primary font-medium">Learn More <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" /></span>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
      <CTASection />
    </Layout>
  );
};

export default Solutions;
