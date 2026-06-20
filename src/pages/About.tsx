import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight, CheckCircle2, Code2, Database, MonitorUp, ShieldCheck } from "lucide-react";
import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import monitorLiveWall from "@/assets/proof/monitor-live-wall-web.jpg";
import officeAutomation from "@/assets/project-office-user.jpg";

const principles = [
  "Build around the real workflow before adding AI.",
  "Connect frontend, backend, database, automations and dashboards.",
  "Use real product evidence, not generic demos.",
  "Keep humans in control with roles, approvals and audit trails.",
];

const stack = [
  ["Product UI", "CRM dashboards, portals, live walls and admin panels", MonitorUp],
  ["Backend systems", "APIs, webhooks, auth, queues, integrations and databases", Database],
  ["Automation logic", "Chatbots, task routing, order flows, reminders and digests", Code2],
  ["Security controls", "Role hierarchy, module access, logs and production guardrails", ShieldCheck],
] as const;

const About = () => {
  return (
    <Layout>
      <main className="bg-[#f4f0e8] text-[#10151f]">
        <section className="relative min-h-[36rem] overflow-hidden bg-[#10151f] text-white">
          <div className="absolute inset-0">
            <img src={officeAutomation} alt="Axenora office automation platform" className="h-full w-full object-cover object-center" />
            <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(16,21,31,0.96),rgba(16,21,31,0.78)_48%,rgba(16,21,31,0.22))]" />
          </div>
          <div className="container-custom relative flex min-h-[36rem] items-center py-24">
            <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} className="max-w-4xl">
              <p className="text-sm font-semibold uppercase tracking-[0.3em] text-[#a9ffcb]">About Axenora</p>
              <h1 className="mt-5 max-w-3xl text-4xl font-semibold leading-[1.06] md:text-6xl">
                Software shaped around how a business actually runs.
              </h1>
              <p className="mt-6 max-w-2xl text-lg leading-8 text-white/72">
                Axenora is a founder-led product studio building workforce platforms, CRM dashboards, office automation and conversational systems connected to real company data.
              </p>
            </motion.div>
          </div>
        </section>

        <section className="border-b border-[#10151f]/12 bg-white">
          <div className="container-custom grid sm:grid-cols-2 lg:grid-cols-4">
            {[["Frontend + backend", "One accountable build"], ["Role-led", "Permissions before shortcuts"], ["Production", "Deployment and health checks"], ["Human control", "Approvals and audit history"]].map(([value, label]) => (
              <div key={value} className="border-b border-[#10151f]/10 px-5 py-7 sm:border-r lg:border-b-0 last:border-r-0"><p className="font-semibold">{value}</p><p className="mt-1 text-sm text-[#10151f]/58">{label}</p></div>
            ))}
          </div>
        </section>

        <section className="container-custom py-24">
          <div className="grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.28em] text-[#1d6f52]">Founder-led build process</p>
              <h2 className="mt-4 text-4xl font-semibold leading-tight md:text-5xl">
                Strategy, interface, backend and automation in one build loop.
              </h2>
              <p className="mt-6 text-lg leading-8 text-[#10151f]/68">
                The work starts with the business process, then becomes a shipped interface with APIs, auth, dashboards, integrations and operational controls.
              </p>
              <Button asChild className="mt-8 rounded-md bg-[#10151f] text-white hover:bg-[#1d6f52]">
                <Link to="/contact">
                  Work with Axenora <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>
            <div className="overflow-hidden rounded-md border border-[#10151f]/12 bg-white shadow-[0_18px_70px_rgba(16,21,31,0.08)]">
              <img src={monitorLiveWall} alt="Employee monitoring live wall" loading="lazy" className="aspect-[16/10] w-full object-cover" />
              <div className="p-7">
                <h3 className="text-2xl font-semibold">Built from live systems</h3>
                <p className="mt-3 leading-7 text-[#10151f]/66">
                  The website uses real screenshots from CRM and monitoring builds because the offer is implementation, not vague automation advice.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="bg-white py-20">
          <div className="container-custom grid gap-10 lg:grid-cols-[0.75fr_1.25fr]">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.28em] text-[#1d6f52]">Principles</p>
              <h2 className="mt-4 text-4xl font-semibold">How we build</h2>
            </div>
            <div className="grid gap-4 md:grid-cols-2">
              {principles.map((item) => (
                <div key={item} className="flex gap-3 rounded-md border border-[#10151f]/12 bg-[#f4f0e8] p-5">
                  <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-[#1d6f52]" />
                  <p className="text-sm font-medium leading-6 text-[#10151f]/78">{item}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="container-custom py-24">
          <div className="mb-10 max-w-2xl"><p className="text-sm font-semibold uppercase tracking-[0.28em] text-[#1d6f52]">Delivery capability</p><h2 className="mt-4 text-4xl font-semibold">The people-facing product and the systems behind it.</h2></div>
          <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-4">
            {stack.map(([title, description, Icon]) => (
              <div key={title} className="rounded-md border border-[#10151f]/12 bg-white p-6">
                <Icon className="h-6 w-6 text-[#1d6f52]" />
                <h3 className="mt-5 text-xl font-semibold">{title}</h3>
                <p className="mt-3 text-sm leading-6 text-[#10151f]/64">{description}</p>
              </div>
            ))}
          </div>
        </section>
      </main>
    </Layout>
  );
};

export default About;
