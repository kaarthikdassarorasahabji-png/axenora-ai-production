import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  ArrowRight,
  BellRing,
  Bot,
  CheckCircle2,
  Clock3,
  Eye,
  FileText,
  LockKeyhole,
  MessageCircle,
  MonitorUp,
  PackageCheck,
  Radio,
  ShieldCheck,
  ShoppingCart,
  Users,
  Workflow,
} from "lucide-react";
import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import crmLiveCeo from "@/assets/proof/crm-live-ceo-web.jpg";
import monitorLiveWall from "@/assets/proof/monitor-live-wall-web.jpg";
import crmOrders from "@/assets/proof/crm-orders-web.jpg";
import empmetriaTeam from "@/assets/empmetria/operations-team.jpg";
import chatbotProject from "@/assets/projects-chatbot.jpg";

const featureGroups = [
  {
    icon: Eye,
    title: "24/7 employee monitoring",
    image: empmetriaTeam,
    description: "Monitor employees through live wall, work state, screenshots, app usage, idle time and attendance records.",
    items: [
      "Live screen preview for online employees",
      "Online, offline and active application status",
      "Screenshot archive and recording-ready workflow",
      "Idle time, app category and productivity tracking",
      "Attendance, shifts, late arrival and timesheets",
      "Alerts for absent, idle, overtime and blocked activity",
    ],
  },
  {
    icon: Users,
    title: "CRM hierarchy and control",
    image: crmLiveCeo,
    description: "A CEO-first business dashboard with role-based access for HR, admins, team leaders, staff and trainees.",
    items: [
      "CEO command login and executive dashboard",
      "Team, employee and module access management",
      "Approvals, leave management and notifications",
      "Office updates, tasks and internal communication",
      "Audit trails, security policies and 2FA-ready roles",
      "Staff-specific workspaces with restricted visibility",
    ],
  },
  {
    icon: ShoppingCart,
    title: "Commerce operations",
    image: crmOrders,
    description: "Orders, revenue, shipping and customer workflows are tied into one operating system.",
    items: [
      "Shopify orders and customer 360 sync",
      "Revenue, COD, expenses and payroll views",
      "Shipping ops, NDR handling and courier escalation",
      "Product catalog and order lifecycle tracking",
      "Performance analytics and daily operations review",
      "Search across people, orders, customers and approvals",
    ],
  },
  {
    icon: Bot,
    title: "Custom chatbots and social automation",
    image: chatbotProject,
    description: "Custom bots answer questions, sell products, create carts and route work across Instagram, WhatsApp, websites and CRM.",
    items: [
      "WhatsApp Cloud API automation",
      "Instagram DM, story reply and comment-to-DM flows",
      "Multilingual support for Indian customers",
      "Catalog-grounded product recommendations",
      "Cart add, update, remove, show and checkout flows",
      "Human handoff, logs, FAQ control and runtime health",
    ],
  },
];

const compactFeatures = [
  ["Live monitoring", MonitorUp],
  ["Realtime work state", Radio],
  ["Smart alerts", BellRing],
  ["Attendance records", Clock3],
  ["CRM hierarchy", Users],
  ["Secure access", LockKeyhole],
  ["Order workflows", PackageCheck],
  ["Custom chatbots", MessageCircle],
  ["Automation logs", FileText],
  ["Human oversight", ShieldCheck],
  ["Task routing", Workflow],
  ["Conversion flows", ShoppingCart],
] as const;

export default function Features() {
  return (
    <Layout>
      <main className="bg-[#f4f0e8] text-[#10151f]">
        <section className="relative overflow-hidden bg-[#10151f] py-24 text-white md:py-32">
          <div className="absolute inset-0">
            <img src={monitorLiveWall} alt="Employee monitoring live wall" className="h-full w-full object-cover opacity-35" />
            <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(16,21,31,0.98),rgba(16,21,31,0.74))]" />
          </div>
          <div className="container-custom relative">
            <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} className="max-w-4xl">
              <p className="text-sm font-semibold uppercase tracking-[0.3em] text-[#a9ffcb]">Features</p>
              <h1 className="mt-5 text-5xl font-semibold leading-tight md:text-7xl">
                Features built from real CRM and monitoring products.
              </h1>
              <p className="mt-6 max-w-2xl text-lg leading-8 text-white/72">
                From 24/7 employee monitoring to CRM hierarchy, order operations, custom chatbots and WhatsApp/Instagram automations, every feature is connected to a real workflow.
              </p>
              <div className="mt-9 flex flex-col gap-3 sm:flex-row">
                <Button asChild className="rounded-md bg-[#a9ffcb] text-[#10151f] hover:bg-[#8ef1b6]">
                  <Link to="/contact">Build this stack</Link>
                </Button>
                <Button asChild variant="outline" className="rounded-md border-white/25 bg-white/5 text-white hover:bg-white/10 hover:text-white">
                  <Link to="/projects/empmetria">Explore EmpMetria</Link>
                </Button>
              </div>
            </motion.div>
          </div>
        </section>

        <section className="container-custom py-20">
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {compactFeatures.map(([label, Icon]) => (
              <div key={label} className="flex min-h-20 items-center gap-3 rounded-md border border-[#10151f]/12 bg-white p-4">
                <Icon className="h-5 w-5 text-[#1d6f52]" />
                <span className="text-sm font-semibold">{label}</span>
              </div>
            ))}
          </div>
        </section>

        <section className="container-custom pb-24">
          <div className="space-y-8">
            {featureGroups.map((group, index) => (
              <motion.article
                key={group.title}
                initial={{ opacity: 0, y: 22 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05 }}
                className="grid overflow-hidden rounded-md border border-[#10151f]/12 bg-white shadow-[0_18px_70px_rgba(16,21,31,0.08)] lg:grid-cols-[0.95fr_1.05fr]"
              >
                <img src={group.image} alt={`${group.title} screenshot`} className="h-full min-h-80 w-full object-cover" />
                <div className="p-7 md:p-10">
                  <group.icon className="h-7 w-7 text-[#1d6f52]" />
                  <h2 className="mt-5 text-3xl font-semibold md:text-4xl">{group.title}</h2>
                  <p className="mt-4 leading-7 text-[#10151f]/66">{group.description}</p>
                  <div className="mt-7 grid gap-3 md:grid-cols-2">
                    {group.items.map((item) => (
                      <span key={item} className="flex gap-3 text-sm leading-6 text-[#10151f]/76">
                        <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-[#1d6f52]" />
                        {item}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.article>
            ))}
          </div>
        </section>

        <section className="bg-[#10151f] py-20 text-white">
          <div className="container-custom grid gap-8 md:grid-cols-[1fr_auto] md:items-center">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.3em] text-[#a9ffcb]">Next step</p>
              <h2 className="mt-4 max-w-3xl text-4xl font-semibold md:text-5xl">
                Choose the workflow. We build the dashboard, backend and automation around it.
              </h2>
            </div>
            <Button asChild size="lg" className="rounded-md bg-[#a9ffcb] text-[#10151f] hover:bg-[#8ef1b6]">
              <Link to="/contact">
                Start planning <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </section>
      </main>
    </Layout>
  );
}
