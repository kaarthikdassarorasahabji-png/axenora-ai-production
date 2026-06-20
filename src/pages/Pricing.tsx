import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight, Bot, BriefcaseBusiness, CheckCircle2, MessageCircle, MonitorUp, Workflow } from "lucide-react";
import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import crmLiveCeo from "@/assets/proof/crm-live-ceo-web.jpg";

const packages = [
  {
    icon: Bot,
    name: "Automation Starter",
    price: "From ₹29,999",
    description: "For one focused automation: chatbot, WhatsApp flow, Instagram bot or lead capture workflow.",
    features: ["One production workflow", "Admin-managed content", "Basic dashboard", "Deployment support", "Contact form/backend wiring"],
  },
  {
    icon: BriefcaseBusiness,
    name: "Business Operating System",
    price: "From ₹99,999",
    description: "For a CRM-style dashboard with users, roles, operations, orders, tasks and automations.",
    features: ["Custom CRM dashboard", "Role hierarchy", "Backend APIs", "Database models", "Order/customer/task workflows", "Live verification"],
    featured: true,
  },
  {
    icon: MonitorUp,
    name: "Monitoring Suite",
    price: "Custom",
    description: "For companies that need 24/7 employee monitoring, attendance, live wall and activity reporting.",
    features: ["Windows monitoring agent", "Live screen wall", "Activity and idle tracking", "Attendance and timesheets", "Admin alerts", "Secure deployment"],
  },
];

const addOns = [
  ["Custom chatbots", Bot],
  ["WhatsApp automation", MessageCircle],
  ["Instagram sales automation", MessageCircle],
  ["Office workflow automation", Workflow],
  ["Employee monitoring", MonitorUp],
  ["CRM dashboard modules", BriefcaseBusiness],
] as const;

const Pricing = () => {
  return (
    <Layout>
      <main className="bg-[#f4f0e8] text-[#10151f]">
        <section className="relative overflow-hidden bg-[#10151f] py-24 text-white md:py-32">
          <div className="absolute inset-0">
            <img src={crmLiveCeo} alt="CRM dashboard pricing background" className="h-full w-full object-cover opacity-30" />
            <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(16,21,31,0.98),rgba(16,21,31,0.74))]" />
          </div>
          <div className="container-custom relative">
            <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} className="max-w-4xl">
              <p className="text-sm font-semibold uppercase tracking-[0.3em] text-[#a9ffcb]">Pricing</p>
              <h1 className="mt-5 text-5xl font-semibold leading-tight md:text-7xl">
                Pricing depends on the system, not a generic plan.
              </h1>
              <p className="mt-6 max-w-2xl text-lg leading-8 text-white/72">
                Every build is scoped by workflows, user roles, integrations, dashboard depth and automation complexity. These ranges help you choose the right starting point.
              </p>
            </motion.div>
          </div>
        </section>

        <section className="container-custom py-24">
          <div className="grid gap-6 lg:grid-cols-3">
            {packages.map((item) => (
              <article
                key={item.name}
                className={`rounded-md border p-7 shadow-[0_18px_70px_rgba(16,21,31,0.08)] ${
                  item.featured ? "border-[#1d6f52] bg-[#10151f] text-white" : "border-[#10151f]/12 bg-white"
                }`}
              >
                <item.icon className={item.featured ? "h-7 w-7 text-[#a9ffcb]" : "h-7 w-7 text-[#1d6f52]"} />
                <h2 className="mt-5 text-3xl font-semibold">{item.name}</h2>
                <p className={item.featured ? "mt-3 text-white/68" : "mt-3 text-[#10151f]/64"}>{item.description}</p>
                <p className={item.featured ? "mt-7 text-4xl font-semibold text-[#a9ffcb]" : "mt-7 text-4xl font-semibold text-[#10151f]"}>
                  {item.price}
                </p>
                <div className="mt-7 grid gap-3">
                  {item.features.map((feature) => (
                    <span key={feature} className={item.featured ? "flex gap-3 text-sm text-white/76" : "flex gap-3 text-sm text-[#10151f]/76"}>
                      <CheckCircle2 className={item.featured ? "mt-0.5 h-4 w-4 shrink-0 text-[#a9ffcb]" : "mt-0.5 h-4 w-4 shrink-0 text-[#1d6f52]"} />
                      {feature}
                    </span>
                  ))}
                </div>
                <Button asChild className={item.featured ? "mt-8 rounded-md bg-[#a9ffcb] text-[#10151f] hover:bg-[#8ef1b6]" : "mt-8 rounded-md bg-[#10151f] text-white hover:bg-[#1d6f52]"}>
                  <Link to="/contact">
                    Scope this build <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </article>
            ))}
          </div>
        </section>

        <section className="bg-white py-20">
          <div className="container-custom grid gap-10 lg:grid-cols-[0.75fr_1.25fr]">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.28em] text-[#1d6f52]">Common modules</p>
              <h2 className="mt-4 text-4xl font-semibold">Add what the business actually needs.</h2>
            </div>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {addOns.map(([label, Icon]) => (
                <div key={label} className="rounded-md border border-[#10151f]/12 bg-[#f4f0e8] p-5">
                  <Icon className="h-5 w-5 text-[#1d6f52]" />
                  <p className="mt-4 text-sm font-semibold">{label}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
    </Layout>
  );
};

export default Pricing;
