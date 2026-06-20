import { useEffect } from "react";
import { Link, Navigate, useParams } from "react-router-dom";
import { motion } from "framer-motion";
import {
  ArrowRight,
  Bot,
  CheckCircle2,
  Database,
  Instagram,
  MessageCircle,
  MonitorUp,
  Network,
  ShieldCheck,
  ShoppingCart,
  Users,
  Workflow,
} from "lucide-react";
import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import monitoringImage from "@/assets/project-monitoring-user.jpg";
import crmImage from "@/assets/project-crm-user.jpg";
import officeImage from "@/assets/project-office-user.jpg";
import chatbotImage from "@/assets/projects-chatbot.jpg";
import whatsappImage from "@/assets/projects-whatsapp.jpg";
import instagramImage from "@/assets/projects-instagram.jpg";

const projects = {
  monitoring: {
    icon: MonitorUp,
    eyebrow: "Workforce operations",
    title: "Employee monitoring with accountable visibility.",
    summary: "A complete employee operations system for attendance, live status, work activity, screenshots, timesheets and manager-scoped reporting.",
    image: monitoringImage,
    proof: "Desktop agent, manager dashboard and private evidence pipeline",
    outcomes: ["24/7 team status", "Attendance and time in one view", "Defined manager visibility", "Reports built from real activity"],
    features: ["Live employee screen wall", "Automatic screenshots", "Application and website activity", "Active and idle time", "Attendance and shifts", "Break and timesheet reports", "Productivity classification", "Late and absence alerts", "Screen-session recording", "Employee self portal", "Device enrollment", "Role and team permissions"],
    workflow: ["Invite and verify the employee", "Owner approves the person and device", "Visible agent records allowed work signals", "Managers review only their assigned scope", "Reports and alerts surface exceptions"],
    integrations: ["Windows desktop agent", "PostgreSQL", "Private object storage", "Redis", "WebSockets", "WebRTC"],
  },
  crm: {
    icon: ShoppingCart,
    eyebrow: "Retail CRM",
    title: "A command center for customers, revenue and daily operations.",
    summary: "A role-based CRM that connects customer records, orders, campaigns, tasks, approvals, shipping and revenue into one operational workspace.",
    image: crmImage,
    proof: "CEO, admin, manager and staff workspaces backed by live business data",
    outcomes: ["Customer 360 records", "Order and revenue control", "Clear staff ownership", "One searchable operating history"],
    features: ["Customer profiles and segments", "Order lifecycle management", "Revenue and average order value", "Campaign performance", "Loyalty workflows", "Tasks and reminders", "Shopify catalog sync", "Shipping and NDR handling", "Approvals and leave", "Role hierarchy", "Audit history", "Executive reports"],
    workflow: ["Sync customers and orders", "Route work by role and team", "Track customer interactions", "Escalate approvals and shipping exceptions", "Review revenue and performance"],
    integrations: ["Shopify", "WhatsApp Cloud API", "Instagram messaging", "Shipping providers", "Google Sheets", "PostgreSQL"],
  },
  "office-automation": {
    icon: Workflow,
    eyebrow: "Office automation",
    title: "Routine decisions move without routine chasing.",
    summary: "A configurable automation layer that evaluates events, routes work, requests approval, notifies owners and produces management digests.",
    image: officeImage,
    proof: "Every automated action is logged, reviewable and reversible by an authorized operator",
    outcomes: ["Faster approvals", "Automatic task ownership", "Fewer missed exceptions", "Reliable executive digests"],
    features: ["Event and webhook triggers", "Conditional rules", "Task auto-assignment", "Approval routing", "Deadline reminders", "Escalation queues", "Employee onboarding", "Invoice processing", "Access provisioning", "Leave workflows", "Digest generation", "Automation audit logs"],
    workflow: ["Receive an event or request", "Evaluate business conditions", "Route, assign, approve or update", "Notify the responsible people", "Report results and exceptions"],
    integrations: ["CRM events", "Email", "WhatsApp", "Slack-compatible webhooks", "Shopify", "Internal APIs"],
  },
  chatbots: {
    icon: Bot,
    eyebrow: "Custom AI assistants",
    title: "A chatbot that understands the business before it answers.",
    summary: "LLM assistants grounded in approved product, policy and workflow data, with lead qualification, human handoff and conversation history.",
    image: chatbotImage,
    proof: "Server-side LLM orchestration with controlled knowledge and business actions",
    outcomes: ["Immediate useful answers", "Qualified inbound leads", "Consistent policy responses", "Clear human handoff"],
    features: ["LLM-generated responses", "Conversation memory", "Knowledge grounding", "Lead intent detection", "Phone and email capture", "CRM lead storage", "Human escalation", "Route-aware actions", "Multilingual replies", "Rate limiting", "Conversation analytics", "Admin-managed knowledge"],
    workflow: ["Understand the visitor question", "Use approved product context", "Generate a concise answer", "Detect buying or support intent", "Capture consented lead details or hand off"],
    integrations: ["OpenAI Responses API", "Supabase", "Resend email", "CRM webhooks", "WhatsApp", "Internal knowledge"],
  },
  whatsapp: {
    icon: MessageCircle,
    eyebrow: "WhatsApp commerce",
    title: "Turn product conversations into trackable orders.",
    summary: "A WhatsApp assistant for product consultation, cart actions, checkout guidance, order tracking and support escalation.",
    image: whatsappImage,
    proof: "Cloud API messaging connected to catalog, cart and fulfilment workflows",
    outcomes: ["24/7 customer replies", "Faster product discovery", "Recoverable cart journeys", "Structured support handoff"],
    features: ["WhatsApp Cloud API", "Product FAQ", "Catalog recommendations", "Cart add and update", "Checkout links", "Order tracking", "Image messages", "Quick replies", "CTA buttons", "Conversation logging", "Human handoff", "Delivery support"],
    workflow: ["Receive and debounce messages", "Identify customer intent", "Read catalog or order data", "Complete the requested action", "Escalate when human judgment is needed"],
    integrations: ["WhatsApp Cloud API", "Shopify", "Shipping APIs", "Google Sheets", "CRM", "LLM provider"],
  },
  instagram: {
    icon: Instagram,
    eyebrow: "Instagram sales automation",
    title: "Social conversations become a managed sales channel.",
    summary: "A custom Instagram assistant for DMs, story replies, comment-to-DM, product guidance, lead capture and order support.",
    image: instagramImage,
    proof: "Messaging automation connected to live catalog and customer operations",
    outcomes: ["Faster DM response", "Consistent product advice", "Qualified social leads", "Measurable conversation outcomes"],
    features: ["Instagram DMs", "Story reply automation", "Comment-to-DM", "Language detection", "Catalog answers", "Product recommendations", "Lead capture", "Cart guidance", "Order lookup", "Conversation ownership", "Human handoff", "Performance reporting"],
    workflow: ["Receive a social interaction", "Understand language and intent", "Answer from approved catalog data", "Capture or complete the next action", "Log the outcome for the team"],
    integrations: ["Instagram Graph API", "Shopify", "CRM", "Google Sheets", "Shipping APIs", "LLM provider"],
  },
} as const;

export default function ProjectDetail() {
  const { slug } = useParams();
  const project = projects[slug as keyof typeof projects];
  if (!project) return <Navigate to="/solutions" replace />;
  const Icon = project.icon;

  useEffect(() => {
    document.title = `${project.eyebrow} | Axenora AI`;
    const description = document.querySelector<HTMLMetaElement>('meta[name="description"]');
    if (description) description.content = project.summary;
    const canonical = document.querySelector<HTMLLinkElement>('link[rel="canonical"]');
    if (canonical) canonical.href = `https://axenoraai.in/projects/${slug}`;
    const image = document.querySelector<HTMLMetaElement>('meta[property="og:image"]');
    if (image) image.content = new URL(project.image, window.location.origin).href;
  }, [project, slug]);

  return (
    <Layout>
      <main className="bg-[#f4f0e8] text-[#10151f]">
        <section className="relative min-h-[calc(100svh-4.5rem)] overflow-hidden bg-[#0c1413] text-white">
          <img src={project.image} alt={`${project.eyebrow} project interface`} className="absolute inset-0 h-full w-full object-cover object-center" />
          <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(8,18,17,0.98)_0%,rgba(8,18,17,0.86)_42%,rgba(8,18,17,0.26)_78%)]" />
          <div className="container-custom relative flex min-h-[calc(100svh-4.5rem)] items-center py-16">
            <motion.div initial={{ opacity: 0, y: 22 }} animate={{ opacity: 1, y: 0 }} className="max-w-3xl">
              <div className="flex items-center gap-3 text-[#bdf6d2]"><Icon className="h-5 w-5" /><p className="text-sm font-semibold uppercase tracking-[0.26em]">{project.eyebrow}</p></div>
              <h1 className="mt-6 text-5xl font-semibold leading-[1.02] md:text-7xl">{project.title}</h1>
              <p className="mt-7 max-w-2xl text-lg leading-8 text-white/76">{project.summary}</p>
              <div className="mt-9 flex flex-col gap-3 sm:flex-row">
                <Button asChild size="lg" className="rounded-md bg-[#bdf6d2] text-[#0c1413] hover:bg-[#9be7bb]"><Link to="/contact">Plan this system <ArrowRight className="ml-2 h-4 w-4" /></Link></Button>
                <Button asChild size="lg" variant="outline" className="rounded-md border-white/25 bg-white/5 text-white hover:bg-white/10 hover:text-white"><Link to="/solutions">View all projects</Link></Button>
              </div>
            </motion.div>
          </div>
        </section>

        <section className="border-b border-[#10151f]/12 bg-white"><div className="container-custom grid sm:grid-cols-2 lg:grid-cols-4">{project.outcomes.map((outcome) => <div key={outcome} className="border-b border-[#10151f]/12 px-5 py-7 sm:border-r lg:border-b-0 last:border-r-0"><CheckCircle2 className="h-5 w-5 text-[#1d6f52]" /><p className="mt-3 font-semibold">{outcome}</p></div>)}</div></section>

        <section className="container-custom py-24">
          <div className="grid gap-12 lg:grid-cols-[0.68fr_1.32fr]">
            <div className="lg:sticky lg:top-28 lg:h-fit"><p className="text-sm font-semibold uppercase tracking-[0.26em] text-[#1d6f52]">System depth</p><h2 className="mt-4 text-4xl font-semibold leading-tight md:text-5xl">Built for the full operating workflow.</h2><p className="mt-6 text-lg leading-8 text-[#10151f]/64">{project.proof}</p></div>
            <div className="grid gap-px overflow-hidden rounded-md border border-[#10151f]/12 bg-[#10151f]/12 sm:grid-cols-2">{project.features.map((feature) => <div key={feature} className="flex min-h-20 items-center gap-3 bg-white p-5"><CheckCircle2 className="h-4 w-4 shrink-0 text-[#1d6f52]" /><span className="text-sm font-medium">{feature}</span></div>)}</div>
          </div>
        </section>

        <section className="bg-[#10151f] py-24 text-white"><div className="container-custom"><div className="grid gap-10 lg:grid-cols-[0.74fr_1.26fr]"><div><Network className="h-7 w-7 text-[#bdf6d2]" /><h2 className="mt-5 text-4xl font-semibold md:text-5xl">How the workflow runs.</h2></div><div className="divide-y divide-white/12 border-y border-white/12">{project.workflow.map((step, index) => <div key={step} className="grid grid-cols-[4rem_1fr] py-6"><span className="text-sm font-semibold text-[#bdf6d2]">0{index + 1}</span><p className="text-lg text-white/78">{step}</p></div>)}</div></div></div></section>

        <section className="bg-white py-20"><div className="container-custom grid gap-10 lg:grid-cols-[0.7fr_1.3fr]"><div><Database className="h-7 w-7 text-[#1d6f52]" /><h2 className="mt-5 text-4xl font-semibold">Connected to the tools that run the business.</h2></div><div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">{project.integrations.map((item) => <div key={item} className="border-l border-[#10151f]/18 py-3 pl-5"><p className="font-semibold">{item}</p></div>)}</div></div></section>

        <section className="bg-[#dfeee6] py-20"><div className="container-custom grid gap-8 md:grid-cols-[1fr_auto] md:items-center"><div><ShieldCheck className="h-7 w-7 text-[#1d6f52]" /><h2 className="mt-5 max-w-3xl text-4xl font-semibold md:text-5xl">Scope the workflow, permissions and integrations before development starts.</h2></div><Button asChild size="lg" className="rounded-md bg-[#10151f] text-white hover:bg-[#1d6f52]"><Link to="/contact">Start the project</Link></Button></div></section>
      </main>
    </Layout>
  );
}
