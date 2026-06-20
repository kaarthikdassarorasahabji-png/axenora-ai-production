import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  Activity,
  ArrowRight,
  CheckCircle2,
  Clock3,
  ExternalLink,
  Eye,
  FileBarChart,
  Fingerprint,
  Network,
  ShieldCheck,
  Users,
} from "lucide-react";
import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import operationsTeam from "@/assets/empmetria/operations-team.jpg";
import productHome from "@/assets/empmetria/product-home.jpg";
import productFeatures from "@/assets/empmetria/product-features.jpg";
import productResources from "@/assets/empmetria/product-resources.jpg";
import liveWall from "@/assets/proof/monitor-live-wall-web.jpg";

const featureGroups = [
  {
    icon: Eye,
    title: "Live work visibility",
    description: "Open an approved employee screen only when immediate context is needed.",
    items: ["Live screen wall", "Automatic screenshots", "Multi-monitor support", "On-demand session recording"],
  },
  {
    icon: Clock3,
    title: "Attendance and time",
    description: "Keep attendance, shifts, active time, idle time, breaks and timesheets together.",
    items: ["Automatic attendance", "Late and absence signals", "Shift schedules", "Daily and monthly timesheets"],
  },
  {
    icon: Activity,
    title: "Work activity",
    description: "Understand work patterns through application and website context without keylogging.",
    items: ["App and URL usage", "Productivity categories", "Idle and activity trends", "Suspicious activity signals"],
  },
  {
    icon: FileBarChart,
    title: "Reports and alerts",
    description: "Turn raw activity into useful operational summaries for managers and executives.",
    items: ["Attendance reports", "Productivity summaries", "Real-time alerts", "Custom and shrinkage reports"],
  },
];

const governance = [
  ["Company owner", "Creates the workspace, approves enrollment and controls every policy."],
  ["Managers", "See only assigned teams, employees and features within their responsibility."],
  ["Employees", "Use a visible desktop agent and can review their own time and activity."],
];

const architecture = [
  ["Visible desktop agent", "Python application with clear status, device enrollment and no hidden mode."],
  ["Operations API", "Node and Express services for identity, attendance, activity, alerts and reports."],
  ["Manager workspace", "React and Vite interface with live updates and role-scoped views."],
  ["Private evidence layer", "PostgreSQL, Redis, private object storage and short-lived signed links."],
];

export default function Empmetria() {
  return (
    <Layout>
      <main className="bg-[#f4f0e8] text-[#10151f]">
        <section className="relative min-h-[calc(100svh-5rem)] overflow-hidden bg-[#0d1715] text-white">
          <img src={operationsTeam} alt="Operations team reviewing workforce activity" className="absolute inset-0 h-full w-full object-cover" />
          <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(9,21,20,0.98)_0%,rgba(9,21,20,0.86)_42%,rgba(9,21,20,0.18)_78%)]" />
          <div className="container-custom relative flex min-h-[calc(100svh-5rem)] items-center py-16">
            <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.65 }} className="max-w-3xl">
              <p className="text-sm font-semibold uppercase tracking-[0.28em] text-[#bdf6d2]">Axenora product / EmpMetria</p>
              <h1 className="mt-5 text-5xl font-semibold leading-[1.02] md:text-7xl lg:text-8xl">
                Know how work moves. Keep trust intact.
              </h1>
              <p className="mt-7 max-w-2xl text-lg leading-8 text-white/76 md:text-xl">
                EmpMetria is a CEO-controlled workforce operations platform for attendance, live visibility, activity context, timesheets and reports. Monitoring starts only after approval and stays visible to employees.
              </p>
              <div className="mt-9 flex flex-col gap-3 sm:flex-row">
                <Button asChild size="lg" className="h-12 rounded-md bg-[#bdf6d2] px-6 text-[#0d1715] hover:bg-[#9be7bb]">
                  <a href="https://empmetria.axenoraai.in" target="_blank" rel="noreferrer">
                    Open EmpMetria <ExternalLink className="ml-2 h-4 w-4" />
                  </a>
                </Button>
                <Button asChild size="lg" variant="outline" className="h-12 rounded-md border-white/30 bg-white/5 px-6 text-white hover:bg-white/10 hover:text-white">
                  <Link to="/contact">Discuss a rollout</Link>
                </Button>
              </div>
              <div className="mt-10 grid max-w-2xl gap-3 text-sm text-white/74 sm:grid-cols-3">
                {["No keylogging", "No hidden mode", "Approval before monitoring"].map((item) => (
                  <span key={item} className="flex items-center gap-2"><CheckCircle2 className="h-4 w-4 text-[#bdf6d2]" />{item}</span>
                ))}
              </div>
            </motion.div>
          </div>
        </section>

        <section className="border-b border-[#10151f]/12 bg-white">
          <div className="container-custom grid md:grid-cols-4">
            {[
              ["24/7", "workforce visibility"],
              ["One", "workspace for time and activity"],
              ["Role scoped", "manager access"],
              ["Private", "evidence storage"],
            ].map(([value, label]) => (
              <div key={label} className="border-b border-[#10151f]/12 px-5 py-7 md:border-b-0 md:border-r last:border-r-0">
                <p className="text-2xl font-semibold">{value}</p>
                <p className="mt-1 text-sm text-[#10151f]/60">{label}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="container-custom py-24">
          <div className="grid gap-10 lg:grid-cols-[0.72fr_1.28fr] lg:items-start">
            <div className="lg:sticky lg:top-28">
              <p className="text-sm font-semibold uppercase tracking-[0.28em] text-[#1d6f52]">The operating view</p>
              <h2 className="mt-4 text-4xl font-semibold leading-tight md:text-6xl">Current status and historical context, in one place.</h2>
              <p className="mt-6 text-lg leading-8 text-[#10151f]/66">
                Managers move from a live question to attendance, screenshots, apps, URLs and timesheets without stitching together separate tools.
              </p>
            </div>
            <div className="overflow-hidden rounded-md border border-[#10151f]/14 bg-[#0d1715] shadow-[0_24px_80px_rgba(16,21,31,0.14)]">
              <img src={productHome} alt="EmpMetria product website showing workforce visibility features" className="w-full" />
            </div>
          </div>
        </section>

        <section className="bg-[#10151f] py-24 text-white">
          <div className="container-custom">
            <div className="max-w-3xl">
              <p className="text-sm font-semibold uppercase tracking-[0.28em] text-[#bdf6d2]">Major capabilities</p>
              <h2 className="mt-4 text-4xl font-semibold leading-tight md:text-6xl">The signals managers need, without surveillance theatre.</h2>
            </div>
            <div className="mt-14 grid gap-px overflow-hidden rounded-md border border-white/14 bg-white/14 md:grid-cols-2">
              {featureGroups.map((group) => (
                <article key={group.title} className="bg-[#10151f] p-7 md:p-9">
                  <group.icon className="h-7 w-7 text-[#bdf6d2]" />
                  <h3 className="mt-5 text-2xl font-semibold">{group.title}</h3>
                  <p className="mt-3 max-w-xl leading-7 text-white/62">{group.description}</p>
                  <div className="mt-6 grid gap-3 sm:grid-cols-2">
                    {group.items.map((item) => <span key={item} className="text-sm text-white/78">{item}</span>)}
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="bg-white py-24">
          <div className="container-custom grid gap-12 lg:grid-cols-[0.92fr_1.08fr] lg:items-center">
            <div className="overflow-hidden rounded-md border border-[#10151f]/12 bg-[#08110f]">
              <img src={liveWall} alt="Live employee monitoring wall with online and offline status" className="aspect-[16/10] w-full object-cover" />
            </div>
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.28em] text-[#1d6f52]">Responsibility first</p>
              <h2 className="mt-4 text-4xl font-semibold leading-tight md:text-6xl">Visibility follows the company hierarchy.</h2>
              <p className="mt-6 text-lg leading-8 text-[#10151f]/66">
                The owner defines who can monitor whom, which modules they can use, and whether they can view live screens, screenshots or exports.
              </p>
              <div className="mt-8 divide-y divide-[#10151f]/12 border-y border-[#10151f]/12">
                {governance.map(([role, detail]) => (
                  <div key={role} className="grid gap-2 py-5 sm:grid-cols-[9rem_1fr]">
                    <strong>{role}</strong><span className="text-sm leading-6 text-[#10151f]/64">{detail}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="container-custom py-24">
          <div className="grid gap-10 lg:grid-cols-[0.78fr_1.22fr]">
            <div>
              <Fingerprint className="h-8 w-8 text-[#1d6f52]" />
              <h2 className="mt-5 text-4xl font-semibold leading-tight md:text-5xl">Private by architecture, clear by policy.</h2>
              <p className="mt-5 text-lg leading-8 text-[#10151f]/66">Every record is company-scoped. Screenshots remain private and live viewing is peer-to-peer wherever possible.</p>
            </div>
            <div className="grid gap-px overflow-hidden rounded-md border border-[#10151f]/12 bg-[#10151f]/12 sm:grid-cols-2">
              {architecture.map(([title, detail], index) => (
                <div key={title} className="bg-white p-6">
                  {index === 0 ? <ShieldCheck className="h-5 w-5 text-[#1d6f52]" /> : index === 2 ? <Users className="h-5 w-5 text-[#1d6f52]" /> : <Network className="h-5 w-5 text-[#1d6f52]" />}
                  <h3 className="mt-4 font-semibold">{title}</h3>
                  <p className="mt-2 text-sm leading-6 text-[#10151f]/62">{detail}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="bg-[#dfeee6] py-24">
          <div className="container-custom grid gap-10 lg:grid-cols-[1fr_1fr] lg:items-center">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.28em] text-[#1d6f52]">Explore the product</p>
              <h2 className="mt-4 text-4xl font-semibold leading-tight md:text-6xl">See every workflow before you choose.</h2>
              <p className="mt-6 text-lg leading-8 text-[#10151f]/66">The live product site explains features, pricing, security, resources and deployment for different team structures.</p>
              <Button asChild className="mt-8 rounded-md bg-[#10151f] text-white hover:bg-[#1d6f52]">
                <a href="https://empmetria.axenoraai.in" target="_blank" rel="noreferrer">Visit EmpMetria <ArrowRight className="ml-2 h-4 w-4" /></a>
              </Button>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <img src={productFeatures} alt="EmpMetria features page" className="w-full rounded-md border border-[#10151f]/12 shadow-xl" />
              <img src={productResources} alt="EmpMetria resources page" className="mt-10 w-full rounded-md border border-[#10151f]/12 shadow-xl" />
            </div>
          </div>
        </section>
      </main>
    </Layout>
  );
}
