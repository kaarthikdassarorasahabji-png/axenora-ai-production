import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  ArrowRight,
  Bot,
  BriefcaseBusiness,
  CheckCircle2,
  Instagram,
  MessageCircle,
  MonitorUp,
  Workflow,
} from "lucide-react";
import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import crmLiveCeo from "@/assets/proof/crm-live-ceo-web.jpg";
import monitorLiveWall from "@/assets/proof/monitor-live-wall-web.jpg";
import empmetriaTeam from "@/assets/empmetria/operations-team.jpg";
import whatsappProject from "@/assets/projects-whatsapp.jpg";
import instagramProject from "@/assets/projects-instagram.jpg";
import chatbotProject from "@/assets/projects-chatbot.jpg";
import monitoringProject from "@/assets/project-monitoring-user.jpg";
import crmProject from "@/assets/project-crm-user.jpg";
import officeProject from "@/assets/project-office-user.jpg";

const solutions = [
  {
    icon: MonitorUp,
    title: "EmpMetria workforce operations",
    image: empmetriaTeam,
    href: "/projects/empmetria",
    action: "Explore EmpMetria",
    description: "Approval-led workforce visibility for live screens, attendance, activity, timesheets and reports.",
    features: ["Visible employee agent", "Role-scoped access", "Private screenshots", "Live and historical context"],
  },
  {
    icon: BriefcaseBusiness,
    title: "CRM operating dashboard",
    image: crmProject,
    href: "/projects/crm",
    action: "Explore the CRM",
    description: "Role-based CRM for CEO, HR admin, admin, team leader, staff and trainee workflows.",
    features: ["Customer 360", "Orders and revenue", "Tasks and approvals", "Module access control"],
  },
  {
    icon: MonitorUp,
    title: "Employee monitoring system",
    image: monitoringProject,
    href: "/projects/monitoring",
    action: "View workforce platform",
    description: "Windows agent and dashboard for live screens, activities, attendance and timesheets.",
    features: ["Live wall", "Screenshots", "Idle and app tracking", "Attendance summaries"],
  },
  {
    icon: Instagram,
    title: "Instagram sales automation",
    image: instagramProject,
    href: "/projects/instagram",
    action: "Plan Instagram automation",
    description: "Custom Instagram DM bot for product consulting, cart flows, order tracking and handoff.",
    features: ["DM automation", "Story replies", "Comment-to-DM", "Shopify catalog"],
  },
  {
    icon: MessageCircle,
    title: "WhatsApp commerce bot",
    image: whatsappProject,
    href: "/projects/whatsapp",
    action: "See WhatsApp automation",
    description: "WhatsApp Cloud API assistant with cart, checkout, product FAQ and multilingual support.",
    features: ["Quick replies", "Cart actions", "Order support", "Human-like pacing"],
  },
  {
    icon: Bot,
    title: "Custom chatbots",
    image: chatbotProject,
    href: "/projects/chatbots",
    action: "See custom chatbots",
    description: "Website, social and internal assistants grounded in business data and strict workflows.",
    features: ["Lead capture", "Knowledge base", "CRM integration", "Escalation rules"],
  },
  {
    icon: Workflow,
    title: "Office automation",
    image: officeProject,
    href: "/projects/office-automation",
    action: "Plan office automation",
    description: "Automation rules for approvals, task routing, reminders, daily digests and operations.",
    features: ["Risk scoring", "Auto assignment", "Executive digest", "Audit logs"],
  },
];

const Solutions = () => {
  return (
    <Layout>
      <main className="bg-[#f4f0e8] text-[#10151f]">
        <section className="relative overflow-hidden bg-[#10151f] py-24 text-white md:py-32">
          <div className="absolute inset-0">
            <img src={crmLiveCeo} alt="Live CRM dashboard" className="h-full w-full object-cover opacity-30" />
            <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(16,21,31,0.98),rgba(16,21,31,0.76))]" />
          </div>
          <div className="container-custom relative">
            <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} className="max-w-4xl">
              <p className="text-sm font-semibold uppercase tracking-[0.3em] text-[#a9ffcb]">Solutions</p>
              <h1 className="mt-5 text-5xl font-semibold leading-tight md:text-7xl">
                Built systems for operations, sales and workforce control.
              </h1>
              <p className="mt-6 max-w-2xl text-lg leading-8 text-white/72">
                Axenora builds full-stack business software: CRM dashboards, monitoring agents, custom chatbots, WhatsApp automation and Instagram commerce bots.
              </p>
            </motion.div>
          </div>
        </section>

        <section className="container-custom py-24">
          <div className="grid gap-7 md:grid-cols-2">
            {solutions.map((solution, index) => (
              <motion.article
                key={solution.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05 }}
                className="overflow-hidden rounded-md border border-[#10151f]/12 bg-white shadow-[0_18px_70px_rgba(16,21,31,0.08)]"
              >
                <div className="aspect-[16/9] bg-[#e9edf1]">
                  <img src={solution.image} alt={`${solution.title} screenshot`} loading="lazy" className="h-full w-full object-contain" />
                </div>
                <div className="p-7">
                  <solution.icon className="h-7 w-7 text-[#1d6f52]" />
                  <h2 className="mt-5 text-3xl font-semibold">{solution.title}</h2>
                  <p className="mt-4 leading-7 text-[#10151f]/66">{solution.description}</p>
                  <div className="mt-6 grid gap-3 sm:grid-cols-2">
                    {solution.features.map((feature) => (
                      <span key={feature} className="flex items-center gap-2 text-sm text-[#10151f]/74">
                        <CheckCircle2 className="h-4 w-4 text-[#1d6f52]" />
                        {feature}
                      </span>
                    ))}
                  </div>
                  <Button asChild className="mt-7 rounded-md bg-[#10151f] text-white hover:bg-[#1d6f52]">
                    <Link to={solution.href}>
                      {solution.action} <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                </div>
              </motion.article>
            ))}
          </div>
        </section>
      </main>
    </Layout>
  );
};

export default Solutions;
