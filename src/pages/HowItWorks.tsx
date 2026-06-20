import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight, ClipboardList, Code2, DatabaseZap, Rocket, ShieldCheck } from "lucide-react";
import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import crmLiveCeo from "@/assets/proof/crm-live-ceo-web.jpg";
import crmOrders from "@/assets/proof/crm-orders-web.jpg";

const steps = [
  {
    icon: ClipboardList,
    title: "Map the workflow",
    description: "We document the actual business process: users, hierarchy, data, repeated tasks, approvals, bottlenecks and success metrics.",
  },
  {
    icon: Code2,
    title: "Design the product surface",
    description: "We create the dashboard, portal, bot flow or monitoring wall as a real working interface with clear operator actions.",
  },
  {
    icon: DatabaseZap,
    title: "Wire the backend",
    description: "We connect APIs, databases, auth, webhooks, Shopify, WhatsApp, Instagram, email, sheets or any internal tools required.",
  },
  {
    icon: ShieldCheck,
    title: "Add controls and logs",
    description: "We add roles, permissions, audit trails, escalation paths, health checks and admin overrides so the system is manageable.",
  },
  {
    icon: Rocket,
    title: "Deploy and improve",
    description: "We launch, verify every button and form, then tune automations based on real user activity and business outcomes.",
  },
];

const deliverables = [
  "Frontend pages and dashboards",
  "Backend APIs and database models",
  "Role hierarchy and module access",
  "Custom chatbot flows",
  "WhatsApp and Instagram automation",
  "Employee monitoring and live views",
  "Order, shipping and revenue workflows",
  "Production deployment and verification",
];

const HowItWorks = () => {
  return (
    <Layout>
      <main className="bg-[#f4f0e8] text-[#10151f]">
        <section className="relative overflow-hidden bg-[#10151f] py-24 text-white md:py-32">
          <div className="absolute inset-0">
            <img src={crmOrders} alt="CRM order operations dashboard" className="h-full w-full object-cover opacity-30" />
            <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(16,21,31,0.98),rgba(16,21,31,0.74))]" />
          </div>
          <div className="container-custom relative">
            <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} className="max-w-4xl">
              <p className="text-sm font-semibold uppercase tracking-[0.3em] text-[#a9ffcb]">How it works</p>
              <h1 className="mt-5 text-5xl font-semibold leading-tight md:text-7xl">
                From workflow problem to shipped automation system.
              </h1>
              <p className="mt-6 max-w-2xl text-lg leading-8 text-white/72">
                We do not drop in generic AI tools. We design, build and verify the real product surface, backend, data flow and automation rules around your business.
              </p>
            </motion.div>
          </div>
        </section>

        <section className="container-custom py-24">
          <div className="grid gap-6">
            {steps.map((step, index) => (
              <motion.div
                key={step.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05 }}
                className="grid rounded-md border border-[#10151f]/12 bg-white p-6 shadow-[0_18px_70px_rgba(16,21,31,0.06)] md:grid-cols-[9rem_1fr]"
              >
                <div className="flex items-center gap-4">
                  <span className="text-4xl font-semibold text-[#1d6f52]">{String(index + 1).padStart(2, "0")}</span>
                  <step.icon className="h-7 w-7 text-[#1d6f52]" />
                </div>
                <div>
                  <h2 className="text-2xl font-semibold">{step.title}</h2>
                  <p className="mt-3 max-w-3xl leading-7 text-[#10151f]/66">{step.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        <section className="bg-white py-20">
          <div className="container-custom grid gap-10 lg:grid-cols-[1fr_1.1fr] lg:items-center">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.28em] text-[#1d6f52]">What you receive</p>
              <h2 className="mt-4 text-4xl font-semibold leading-tight md:text-6xl">
                A connected software system, not a collection of loose pages.
              </h2>
              <p className="mt-6 text-lg leading-8 text-[#10151f]/68">
                Each build includes the user interface, backend wiring, permissions, workflows and verification needed for production use.
              </p>
              <Button asChild className="mt-8 rounded-md bg-[#10151f] text-white hover:bg-[#1d6f52]">
                <Link to="/contact">
                  Start the build <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>
            <div className="overflow-hidden rounded-md border border-[#10151f]/12 bg-[#f4f0e8]">
              <img src={crmLiveCeo} alt="CRM executive dashboard" className="aspect-[16/10] w-full object-cover" />
              <div className="grid gap-3 p-6 sm:grid-cols-2">
                {deliverables.map((item) => (
                  <span key={item} className="text-sm font-medium text-[#10151f]/74">{item}</span>
                ))}
              </div>
            </div>
          </div>
        </section>
      </main>
    </Layout>
  );
};

export default HowItWorks;
