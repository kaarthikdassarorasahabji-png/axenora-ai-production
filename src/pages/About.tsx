import { motion } from "framer-motion";
import { Layout } from "@/components/layout/Layout";
import { CTASection } from "@/components/sections/CTASection";
import aboutHero from "@/assets/about-hero.jpg";

const missionStatement =
  "Axenora AI installs autonomous revenue systems so ambitious companies can scale without adding headcount.";

const principles = [
  {
    title: "Design for measurable impact",
    description: "Every rollout ships with baselines, dashboards, and a playbook for iterating weekly.",
  },
  {
    title: "Operate with trust and safety",
    description: "Compliance, human-in-the-loop guardrails, and transparent escalation paths are built in from day one.",
  },
  {
    title: "Move with founder-level urgency",
    description: "We prototype in days, not quarters, and keep a shared mission doc open with every client.",
  },
];

const About = () => {
  return (
    <Layout>
      <section className="relative min-h-[60vh] flex items-center">
        <div className="absolute inset-0 z-0">
          <img src={aboutHero} alt="About" className="w-full h-full object-cover opacity-40" />
          <div className="absolute inset-0 bg-gradient-to-b from-background/80 via-background/60 to-background" />
        </div>
        <div className="container-custom relative z-10 py-20">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="max-w-3xl">
            <span className="text-sm font-medium text-primary uppercase tracking-wider">About Axenora</span>
            <h1 className="text-4xl md:text-6xl font-bold mt-4 mb-6 font-['Space_Grotesk']">
              A Revenue Mission Control for <span className="gradient-text">AI-Driven Teams</span>
            </h1>
            <p className="text-lg text-muted-foreground max-w-3xl">
              {missionStatement}
            </p>
          </motion.div>
        </div>
      </section>

      <section className="section-padding">
        <div className="container-custom">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
              <h2 className="text-3xl md:text-4xl font-bold mb-6 font-['Space_Grotesk']">The Mission</h2>
              <p className="text-muted-foreground mb-4">
                {missionStatement} We combine GTM strategy, automation engineering, and compliance rigor into a single operating layer for founders and revenue teams.
              </p>
              <div className="rounded-2xl border border-border/60 p-6 bg-card/60 space-y-3">
                <p className="text-sm uppercase tracking-widest text-primary font-semibold">What it means</p>
                <ul className="space-y-3 text-muted-foreground">
                  <li>• Plug in AI copilots across website, WhatsApp, voice, and sales ops without extra headcount.</li>
                  <li>• Maintain enterprise trust standards: SOC2 controls, audit logging, and region-aware data flows.</li>
                  <li>• Keep humans in the loop with a client portal, shared rituals, and real-time experiment notes.</li>
                </ul>
              </div>
            </motion.div>
            <motion.div initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="p-8 rounded-2xl bg-card border border-border">
              <h3 className="text-2xl font-bold mb-4 font-['Space_Grotesk']">Kaarthik Arora</h3>
              <p className="text-primary mb-4">Founder & CEO</p>
              <p className="text-muted-foreground">
                Kaarthik has led GTM and automation pods across APAC startups before building Axenora’s AI agency model.
                He still runs weekly “mission control” calls with every client to keep roadmaps aligned.
              </p>
              <div className="mt-6 space-y-2 text-sm text-muted-foreground">
                <p>• Based in Ludhiana, working remotely with teams across India, SEA, and MENA.</p>
                <p>• Favorite ritual: Sunday loom recaps that document learnings for our operators.</p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
      <section className="section-padding bg-card/30">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <span className="text-sm font-medium uppercase tracking-wider text-primary">Operating Principles</span>
            <h2 className="text-3xl md:text-4xl font-bold mt-4 mb-4 font-['Space_Grotesk']">
              How We Partner With Founders
            </h2>
            <p className="text-muted-foreground max-w-3xl mx-auto">
              These principles keep every build sprint, automation launch, and governance review aligned with the mission.
            </p>
          </motion.div>
          <div className="grid md:grid-cols-3 gap-6">
            {principles.map((principle, index) => (
              <motion.div
                key={principle.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="p-6 rounded-2xl border border-border bg-background/60"
              >
                <p className="text-xs uppercase tracking-widest text-primary font-semibold mb-2">Principle 0{index + 1}</p>
                <h3 className="text-xl font-semibold mb-3">{principle.title}</h3>
                <p className="text-muted-foreground text-sm">{principle.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
      <CTASection />
    </Layout>
  );
};

export default About;
