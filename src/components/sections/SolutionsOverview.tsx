import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight, Globe, Megaphone, MessageCircle, Bot, Phone, Cog } from "lucide-react";
import solutionWebsite from "@/assets/solution-website.jpg";
import solutionAds from "@/assets/solution-ads.jpg";
import solutionWhatsapp from "@/assets/solution-whatsapp.jpg";
import solutionChatbot from "@/assets/solution-chatbot.jpg";
import solutionCalling from "@/assets/solution-calling.jpg";
import solutionAutomation from "@/assets/solution-automation.jpg";

const solutions = [
  {
    icon: Globe,
    title: "AI Website Development",
    description: "Websites that work like sales systems with AI-generated copy and conversion-focused layouts.",
    image: solutionWebsite,
    href: "/solutions/website",
  },
  {
    icon: Megaphone,
    title: "AI Ads & Marketing",
    description: "Automated creative testing, smart budget optimization, and continuous performance improvement.",
    image: solutionAds,
    href: "/solutions/ads",
  },
  {
    icon: MessageCircle,
    title: "WhatsApp Automation",
    description: "Turn WhatsApp into your best salesperson with instant replies and automated follow-ups.",
    image: solutionWhatsapp,
    href: "/solutions/whatsapp",
  },
  {
    icon: Bot,
    title: "AI Chatbots",
    description: "Chatbots that don't just talk — they convert. Lead qualification and multi-language support.",
    image: solutionChatbot,
    href: "/solutions/chatbots",
  },
  {
    icon: Phone,
    title: "AI Calling Agents",
    description: "AI voice agents that sound human. Inbound, outbound calling with appointment booking.",
    image: solutionCalling,
    href: "/solutions/calling",
  },
  {
    icon: Cog,
    title: "Business Automation",
    description: "End-to-end automation systems that connect all your tools and workflows seamlessly.",
    image: solutionAutomation,
    href: "/solutions",
  },
];

export function SolutionsOverview() {
  return (
    <section className="section-padding section-gradient">
      <div className="container-custom">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="text-sm font-medium text-primary uppercase tracking-wider">
            Our Solutions
          </span>
          <h2 className="text-3xl md:text-5xl font-bold mt-4 mb-6 font-['Space_Grotesk']">
            Everything You Need to{" "}
            <span className="gradient-text">Automate Growth</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            From customer acquisition to retention, our AI-powered solutions handle 
            every aspect of your business automation.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {solutions.map((solution, index) => (
            <motion.div
              key={solution.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
            >
              <Link
                to={solution.href}
                className="group block h-full rounded-2xl overflow-hidden gradient-border card-hover bg-card"
              >
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={solution.image}
                    alt={solution.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-card to-transparent" />
                  <div className="absolute bottom-4 left-4">
                    <div className="p-3 rounded-xl bg-primary/20 backdrop-blur-sm border border-primary/30">
                      <solution.icon className="w-6 h-6 text-primary" />
                    </div>
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-semibold mb-3 font-['Space_Grotesk'] group-hover:text-primary transition-colors">
                    {solution.title}
                  </h3>
                  <p className="text-muted-foreground text-sm mb-4">
                    {solution.description}
                  </p>
                  <span className="inline-flex items-center gap-2 text-sm font-medium text-primary">
                    Learn More
                    <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                  </span>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
