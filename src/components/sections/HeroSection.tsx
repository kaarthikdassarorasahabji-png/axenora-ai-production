import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  ArrowRight,
  Activity,
  Bot,
  BriefcaseBusiness,
  CheckCircle2,
  Eye,
  Instagram,
  Layers3,
  MessageCircle,
  MonitorUp,
  MousePointer2,
  ShieldCheck,
  ShoppingCart,
  Users,
  Workflow,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import crmLiveCeo from "@/assets/proof/crm-live-ceo-web.jpg";
import monitorLiveWall from "@/assets/proof/monitor-live-wall-web.jpg";
import crmOrders from "@/assets/proof/crm-orders-web.jpg";
import empmetriaHome from "@/assets/empmetria/product-home.jpg";
import operationsTeam from "@/assets/empmetria/operations-team.jpg";
import whatsappProject from "@/assets/projects-whatsapp.jpg";
import instagramProject from "@/assets/projects-instagram.jpg";
import chatbotProject from "@/assets/projects-chatbot.jpg";
import monitoringProject from "@/assets/project-monitoring-user.jpg";
import crmProject from "@/assets/project-crm-user.jpg";
import officeProject from "@/assets/project-office-user.jpg";

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0 },
};

const projectScreens = [
  {
    title: "EmpMetria workforce operations",
    label: "Flagship product",
    image: empmetriaHome,
  },
  {
    title: "CEO CRM command center",
    label: "CRM dashboard",
    image: crmLiveCeo,
  },
  {
    title: "Employee live monitoring wall",
    label: "Monitoring system",
    image: monitorLiveWall,
  },
  {
    title: "Order, revenue and shipping control",
    label: "Operations CRM",
    image: crmOrders,
  },
];

const projectSuites = [
  {
    icon: Activity,
    title: "EmpMetria",
    eyebrow: "Flagship workforce product",
    image: operationsTeam,
    href: "/projects/empmetria",
    action: "Explore EmpMetria",
    summary:
      "A transparent workforce operations platform for live visibility, attendance, time, activity context, screenshots, reports and controlled manager access.",
    highlights: [
      "CEO-controlled company hierarchy and device approval",
      "Live screens, automatic screenshots and session recording",
      "Attendance, shifts, breaks, timesheets and late detection",
      "Application and website activity with productivity context",
      "Role, team and per-user monitoring permissions",
      "Private evidence storage, audit logs and visible employee agent",
    ],
  },
  {
    icon: MonitorUp,
    title: "Employee Monitoring System",
    eyebrow: "Windows agent + admin dashboard",
    image: monitoringProject,
    href: "/projects/monitoring",
    action: "View workforce platform",
    summary:
      "A complete workforce visibility system with live screens, activity logs, attendance, timesheets, alerts, and admin controls.",
    highlights: [
      "Live wall with online/offline staff status",
      "Screen previews, screenshots and recording support",
      "Activity tracking by app, idle time and productivity category",
      "Attendance, shifts, late detection and daily summaries",
      "Admin alerts for idle, absent, overtime and blocked activity",
      "Employee self-portal with personal activity and timesheets",
    ],
  },
  {
    icon: BriefcaseBusiness,
    title: "Retail CRM Dashboard",
    eyebrow: "Role-based business operating system",
    image: crmProject,
    href: "/projects/crm",
    action: "Explore CRM systems",
    summary:
      "A professional CRM for daily operations: orders, customers, tasks, approvals, attendance, revenue, shipping, chats and automation status.",
    highlights: [
      "CEO, HR admin, admin, team leader, staff and trainee hierarchy",
      "Customer 360, order lifecycle and Shopify sync",
      "Task assignment, office updates, approvals and leave management",
      "Revenue, expense, payroll and performance dashboards",
      "Shipping operations, NDR handling and courier workflows",
      "Module access control, audit logs and secure login policies",
    ],
  },
  {
    icon: Instagram,
    title: "Instagram Sales Bot",
    eyebrow: "Custom commerce automation",
    image: instagramProject,
    href: "/projects/instagram",
    action: "Explore Instagram automation",
    summary:
      "A custom Instagram DM assistant for retail brands that handles product questions, language detection, cart actions and Shopify-powered selling.",
    highlights: [
      "Instagram DM, story reply and comment-to-DM automation",
      "Multilingual replies across Indian languages and Hinglish",
      "Product recommendations grounded in catalog and knowledge base",
      "Cart creation, checkout guidance and order tracking",
      "Shopify, Google Sheets and shipping workflow integration",
      "Human-style response rules, handoff logic and runtime monitoring",
    ],
  },
  {
    icon: MessageCircle,
    title: "WhatsApp Commerce Bot",
    eyebrow: "Business messaging automation",
    image: whatsappProject,
    href: "/projects/whatsapp",
    action: "Explore WhatsApp automation",
    summary:
      "A WhatsApp automation engine with product consultation, cart management, order tracking, image support and human-like pacing.",
    highlights: [
      "WhatsApp Cloud API webhook automation",
      "Debounced rapid messages and human reply delays",
      "Product FAQ, catalog, price and routine recommendations",
      "Cart add, remove, update, show and checkout flows",
      "Image messages, reactions, quick replies and CTA buttons",
      "Conversation logging, escalation and delivery/order support",
    ],
  },
  {
    icon: Bot,
    title: "Custom Chatbots",
    eyebrow: "Built for each business workflow",
    image: chatbotProject,
    href: "/projects/chatbots",
    action: "Explore custom chatbots",
    summary:
      "Chatbots are built around the actual business: FAQs, catalogs, order data, support rules, lead capture and escalation paths.",
    highlights: [
      "Website, WhatsApp, Instagram and internal CRM assistants",
      "Lead qualification, booking, support and product consultation",
      "Knowledge-base answers with strict no-invention guardrails",
      "CRM, Shopify, sheets, email and database integrations",
      "Admin-managed FAQs, escalation rules and conversation logs",
      "Brand-specific tone, multilingual replies and analytics",
    ],
  },
  {
    icon: Workflow,
    title: "Office Automation Layer",
    eyebrow: "Work continues without micromanagement",
    image: officeProject,
    href: "/projects/office-automation",
    action: "Explore office automation",
    summary:
      "Automation rules route routine decisions, notify the right people, and keep management informed through clean dashboards and digests.",
    highlights: [
      "Auto-approval checks for low-risk users",
      "Task assignment based on workload and completion history",
      "Order routing by value, customer history and staff capacity",
      "Overdue reminders, daily digests and escalation queues",
      "Automation logs for every decision and override",
      "CEO controls to reassign, approve or disable rules anytime",
    ],
  },
];

const capabilityGroups = [
  {
    title: "Monitoring and activity detail",
    icon: Eye,
    items: [
      "Live screen wall",
      "Screenshots and signed previews",
      "Active app tracking",
      "Idle seconds and activity intensity",
      "Keystroke, click and mouse movement metrics",
      "Productive, neutral and unproductive categories",
      "Multi-monitor capture support",
      "Screen recording sessions",
    ],
  },
  {
    title: "CRM hierarchy and access",
    icon: Users,
    items: [
      "CEO full command access",
      "HR admin people oversight",
      "Admin operations control",
      "Team leader team scope",
      "Staff execution workspace",
      "Trainee read-only access",
      "Module-level permissions",
      "Audit trails and session policies",
    ],
  },
  {
    title: "Commerce automation",
    icon: ShoppingCart,
    items: [
      "Shopify product sync",
      "Customer 360 records",
      "Order lifecycle tracking",
      "Cart creation from DMs",
      "Checkout guidance",
      "Order tracking by phone or order number",
      "Shipping and NDR workflows",
      "Revenue and COD reconciliation",
    ],
  },
  {
    title: "Customer messaging",
    icon: MessageCircle,
    items: [
      "Instagram DMs",
      "WhatsApp replies",
      "Story reply handling",
      "Comment-to-DM flows",
      "Quick replies and CTA buttons",
      "Multilingual conversation memory",
      "FAQ and product knowledge grounding",
      "Human handoff rules",
    ],
  },
];

const automationList = [
  "Lead qualification and demo routing",
  "Product recommendation from live catalog",
  "Cart and checkout flow generation",
  "Order tracking and delivery support",
  "Customer follow-up and complaint routing",
  "CRM task assignment and reminders",
  "Attendance sync and monitoring summary",
  "Approval queues with risk scoring",
  "Shipping delay alerts and courier escalation",
  "Daily executive digest and automation logs",
];

export function HeroSection() {
  return (
    <div className="bg-[#f4f0e8] text-[#10151f]">
      <section className="relative min-h-[min(48rem,calc(100svh-4rem))] overflow-hidden bg-[#10151f] text-white">
        <div className="absolute inset-0">
          <img
            src={monitoringProject}
            alt="Axenora employee monitoring platform in a modern office"
            className="h-full w-full object-cover object-center"
          />
          <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(9,16,19,0.92)_0%,rgba(9,16,19,0.72)_45%,rgba(9,16,19,0.16)_78%,rgba(9,16,19,0.08)_100%)]" />
        </div>

        <div className="container-custom relative flex min-h-[min(48rem,calc(100svh-4rem))] items-center py-16 md:py-24">
          <motion.div initial="hidden" animate="visible" variants={fadeUp} transition={{ duration: 0.7 }} className="max-w-3xl">
            <p className="mb-5 text-xs font-semibold uppercase tracking-[0.28em] text-[#bdf6d2]">Business systems by Axenora AI</p>
            <h1 className="max-w-3xl text-4xl font-semibold leading-[1.04] md:text-6xl lg:text-7xl">
              Run your business from one connected system.
            </h1>
            <p className="mt-6 max-w-2xl text-base leading-7 text-white/75 md:text-lg md:leading-8">
              Custom CRM, workforce visibility, office automation and conversational AI built around your teams, approvals, customers and real operating data.
            </p>
            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
              <Button asChild size="lg" className="h-12 rounded-md bg-[#a9ffcb] px-6 text-[#10151f] hover:bg-[#8ef1b6]">
                <Link to="/contact">
                  Plan your system <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="h-12 rounded-md border-white/25 bg-white/5 px-6 text-white hover:bg-white/10 hover:text-white">
                <a href="#projects">Explore projects</a>
              </Button>
            </div>
            <div className="mt-10 flex flex-wrap gap-x-7 gap-y-3 border-t border-white/18 pt-5 text-xs font-medium text-white/62">
              <span>Production backends</span><span>Permission-led workflows</span><span>Human handoff</span>
            </div>
          </motion.div>
        </div>
      </section>

      <section className="border-b border-[#10151f]/10 bg-[#f4f0e8]">
        <div className="container-custom grid gap-6 py-8 md:grid-cols-4">
          {[
            ["6", "production-grade project lines"],
            ["24/7", "messaging and support automation"],
            ["6", "role levels in CRM hierarchy"],
            ["Live", "screens, orders, tasks and activity"],
          ].map(([value, label]) => (
            <div key={label} className="border-l border-[#10151f]/20 pl-5">
              <p className="text-3xl font-semibold">{value}</p>
              <p className="mt-1 text-sm text-[#10151f]/62">{label}</p>
            </div>
          ))}
        </div>
      </section>

      <section id="projects" className="container-custom py-20 md:py-28">
        <div className="grid items-end gap-7 border-b border-[#10151f]/12 pb-10 md:grid-cols-[1fr_0.8fr]">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.28em] text-[#1d6f52]">Project suite</p>
            <h2 className="mt-4 max-w-3xl text-4xl font-semibold leading-tight md:text-5xl">Products built for real operating work.</h2>
          </div>
          <p className="max-w-xl text-base leading-7 text-[#10151f]/65 md:justify-self-end">Explore workforce, CRM, automation and messaging systems with working interfaces, clear permissions and connected backend workflows.</p>
        </div>

        <div className="mt-10 grid min-w-0 gap-7 lg:grid-cols-2">
            {projectSuites.map((project, index) => (
              <motion.article
                key={project.title}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.55, delay: index * 0.04 }}
                className="min-w-0 overflow-hidden rounded-md border border-[#10151f]/12 bg-white shadow-[0_16px_55px_rgba(16,21,31,0.07)]"
              >
                <div className="relative aspect-video min-w-0 overflow-hidden bg-[#e9edf1]">
                  <img src={project.image} alt={`${project.title} screenshot`} loading="lazy" className="h-full w-full object-cover object-center" />
                  <div className="absolute left-4 top-4 rounded-md bg-[#10151f]/82 px-3 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-white/80 backdrop-blur">
                    {project.eyebrow}
                  </div>
                </div>
                <div className="min-w-0 p-6 md:p-8">
                  <div className="flex items-center gap-3"><project.icon className="h-5 w-5 text-[#1d6f52]" /><p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#1d6f52]">{project.eyebrow}</p></div>
                  <h3 className="mt-4 text-2xl font-semibold md:text-3xl">{project.title}</h3>
                  <p className="mt-3 leading-7 text-[#10151f]/65">{project.summary}</p>
                  <div className="mt-6 grid gap-2.5">
                    {project.highlights.slice(0, 4).map((feature) => (
                      <div key={feature} className="flex gap-3 text-sm leading-6 text-[#10151f]/78">
                        <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-[#1d6f52]" />
                        <span>{feature}</span>
                      </div>
                    ))}
                  </div>
                  <Button asChild variant="outline" className="mt-7 rounded-md border-[#10151f]/20 bg-transparent text-[#10151f] hover:bg-[#10151f] hover:text-white">
                    <Link to={project.href}>
                      {project.action} <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                </div>
              </motion.article>
            ))}
        </div>
      </section>

      <section className="bg-[#10151f] py-24 text-white">
        <div className="container-custom">
          <div className="max-w-4xl">
            <p className="text-sm font-semibold uppercase tracking-[0.28em] text-[#a9ffcb]">Major features</p>
            <h2 className="mt-4 text-4xl font-semibold leading-tight md:text-6xl">
              The operating details that make the systems useful every day.
            </h2>
          </div>

          <div className="mt-14 grid gap-px overflow-hidden rounded-md border border-white/12 bg-white/12 md:grid-cols-2">
            {capabilityGroups.map((group) => (
              <div key={group.title} className="bg-[#10151f] p-7 md:p-9">
                <group.icon className="h-7 w-7 text-[#a9ffcb]" />
                <h3 className="mt-5 text-2xl font-semibold">{group.title}</h3>
                <div className="mt-7 grid gap-3 sm:grid-cols-2">
                  {group.items.map((item) => (
                    <div key={item} className="flex items-center gap-3 text-sm text-white/70">
                      <span className="h-1.5 w-1.5 rounded-full bg-[#a9ffcb]" />
                      {item}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="container-custom py-24">
        <div className="grid gap-12 lg:grid-cols-[1fr_1.05fr]">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.28em] text-[#1d6f52]">Automation list</p>
            <h2 className="mt-4 text-4xl font-semibold leading-tight md:text-6xl">
              Built around the work your team repeats.
            </h2>
            <p className="mt-6 text-lg leading-8 text-[#10151f]/68">
              The systems automate sales conversations, team operations, executive review, activity tracking and customer support while keeping humans in control where judgment matters.
            </p>
          </div>

          <div className="grid gap-3 sm:grid-cols-2">
            {automationList.map((item, index) => (
              <motion.div
                key={item}
                initial={{ opacity: 0, x: 16 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.35, delay: index * 0.03 }}
                className="flex min-h-24 items-start gap-4 rounded-md border border-[#10151f]/12 bg-white p-5"
              >
                <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-md bg-[#e1f8ea] text-sm font-semibold text-[#1d6f52]">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <p className="text-sm font-medium leading-6 text-[#10151f]/82">{item}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="border-y border-[#10151f]/10 bg-white py-20">
        <div className="container-custom">
          <div className="grid gap-8 lg:grid-cols-[0.85fr_1.15fr] lg:items-end">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.28em] text-[#1d6f52]">Screenshots</p>
              <h2 className="mt-4 text-4xl font-semibold leading-tight md:text-6xl">
                Product evidence on the page.
              </h2>
            </div>
            <p className="text-lg leading-8 text-[#10151f]/68">
              Screenshots show the actual control rooms: live monitoring, CEO dashboard, order operations and attendance views.
            </p>
          </div>

          <div className="mt-12 grid gap-6 md:grid-cols-2">
            {projectScreens.map((screen) => (
              <figure key={screen.title} className="overflow-hidden rounded-md border border-[#10151f]/14 bg-[#f4f0e8]">
                <img src={screen.image} alt={screen.title} loading="lazy" className="aspect-[16/10] w-full object-contain" />
                <figcaption className="flex items-center justify-between p-5">
                  <span className="text-sm font-semibold">{screen.title}</span>
                  <span className="text-xs uppercase tracking-[0.18em] text-[#10151f]/48">{screen.label}</span>
                </figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>

      <section className="container-custom py-24">
        <div className="grid gap-8 rounded-md bg-[#10151f] p-8 text-white md:p-12 lg:grid-cols-[1fr_auto] lg:items-center">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.28em] text-[#a9ffcb]">Next build</p>
            <h2 className="mt-4 max-w-3xl text-4xl font-semibold leading-tight md:text-6xl">
              Turn one workflow into a finished product system.
            </h2>
            <div className="mt-7 grid gap-4 text-sm text-white/72 md:grid-cols-3">
              <span className="flex items-center gap-2"><ShieldCheck className="h-4 w-4 text-[#a9ffcb]" /> Secure backend wiring</span>
              <span className="flex items-center gap-2"><Layers3 className="h-4 w-4 text-[#a9ffcb]" /> Full dashboard design</span>
              <span className="flex items-center gap-2"><MousePointer2 className="h-4 w-4 text-[#a9ffcb]" /> Working buttons and forms</span>
            </div>
          </div>
          <div className="flex flex-col gap-3 sm:flex-row lg:flex-col">
            <Button asChild size="lg" className="rounded-md bg-[#a9ffcb] text-[#10151f] hover:bg-[#8ef1b6]">
              <Link to="/contact">Start a project</Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="rounded-md border-white/25 bg-white/5 text-white hover:bg-white/10 hover:text-white">
              <a href="tel:+917814051678">Call now</a>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
