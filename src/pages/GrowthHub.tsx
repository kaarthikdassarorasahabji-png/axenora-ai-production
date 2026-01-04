import { useState } from "react";
import { motion } from "framer-motion";
import { Layout } from "@/components/layout/Layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import {
  ArrowRight,
  BarChart3,
  Calendar,
  CheckCircle2,
  Clock,
  Layers,
  LineChart,
  Link2,
  Lock,
  NotebookPen,
  Rocket,
  ShieldCheck,
  Sparkles,
  Users,
  Video,
  Globe,
  MessageCircle,
} from "lucide-react";

const industries = ["E-commerce", "SaaS", "Fintech", "Healthcare"];

const caseStudies = [
  {
    company: "Stellar Threads",
    industry: "E-commerce",
    summary: "Rebuilt acquisition funnel with AI-generated copy and conversational ads.",
    result: "42% lift in paid ROAS",
    metrics: [
      { label: "Pipeline influenced", value: "$2.4M" },
      { label: "Sales cycle", value: "-18 days" },
    ],
  },
  {
    company: "Nimbus CRM",
    industry: "SaaS",
    summary: "Built AI SDR squad for qualification, follow-ups, and demos.",
    result: "3.2× more SQLs",
    metrics: [
      { label: "NDR", value: "124%" },
      { label: "Meetings booked", value: "+167%" },
    ],
  },
  {
    company: "VaultBank",
    industry: "Fintech",
    summary: "Automated KYC concierge, loan nudges, and support triage.",
    result: "$81M new deposits",
    metrics: [
      { label: "Support CSAT", value: "4.9/5" },
      { label: "Handle time", value: "-63%" },
    ],
  },
];

const leadSteps = [
  { label: "Foundations", description: "Vision, ICP, channels, success metrics" },
  { label: "Systems", description: "Workflows, integrations, guardrails" },
  { label: "Go-Live", description: "Scheduling, pilots, success plan" },
];

const integrations = [
  {
    title: "Revenue Stack",
    description: "Sync AI agents with CRMs, CPQ, calendars, and billing.",
    tools: ["Salesforce", "HubSpot", "Zoho", "Close"],
  },
  {
    title: "Marketing & CX",
    description: "Connect creative testing, ad platforms, and omnichannel comms.",
    tools: ["Meta", "Google Ads", "Klaviyo", "Intercom"],
  },
  {
    title: "Operations & Data",
    description: "Pipe data through warehouses and workflow orchestrators.",
    tools: ["Snowflake", "BigQuery", "Zapier", "Make"],
  },
];

const playbooks = [
  {
    title: "AI Sales War Room",
    focus: "Acquisition",
    outcomes: ["Persona-specific scripts", "Routing logic", "CRM enrichment"],
    duration: "10 days",
  },
  {
    title: "Lifecycle Maestro",
    focus: "Retention",
    outcomes: ["Predictive nudges", "CS handoffs", "Churn saves"],
    duration: "14 days",
  },
  {
    title: "AI Support Autopilot",
    focus: "CX",
    outcomes: ["Knowledge grounding", "Deflection flows", "Escalation intel"],
    duration: "9 days",
  },
];

const values = [
  {
    title: "Ship Boldly",
    description: "We prototype weekly and measure relentlessly.",
  },
  {
    title: "Operate With Clarity",
    description: "Transparent goals, async rituals, thoughtful docs.",
  },
  {
    title: "Design For Trust",
    description: "Safety reviews and human-in-the-loop checkpoints.",
  },
];

const roles = [
  {
    title: "Founding AI Engineer",
    type: "Full-time · Remote",
    stack: "Python, Node, LangChain, Vector DBs",
  },
  {
    title: "Automation Strategist",
    type: "Full-time · Mumbai / Remote",
    stack: "RevOps, HubSpot, Make, Zapier",
  },
  {
    title: "Product Marketing Lead",
    type: "Contract · Remote",
    stack: "Narratives, launches, enablement",
  },
];

const securityHighlights = [
  {
    title: "Compliance Pipeline",
    details: ["SOC 2 Type II (in progress)", "GDPR & DPDP ready", "Vendor risk framework"],
  },
  {
    title: "Data Controls",
    details: ["Zero retention by default", "Per-client encryption keys", "Audit-ready logging"],
  },
  {
    title: "Model Governance",
    details: ["Prompt firewalling", "Safety eval harness", "Human override dashboard"],
  },
];

const demoIntents = [
  {
    title: "AI Chat Strategist",
    prompt: "Launch a retention campaign for premium users churning after day 30.",
    response:
      "Drafting multi-touch WhatsApp + email play with urgency copy, upgrade incentive, and concierge follow-up.",
  },
  {
    title: "Voice Concierge",
    prompt: "Confirm tomorrow’s onboarding workshop with Acme Bio.",
    response:
      "Calling ops lead, sharing agenda SMS, logging transcript, and updating Salesforce event with prep checklist.",
  },
];

const articles = [
  {
    title: "AI Agents As Revenue Teammates",
    type: "Research Note",
    time: "11 min read",
  },
  {
    title: "Playbook: Launching a Safe WhatsApp AI",
    type: "Guide",
    time: "9 min read",
  },
  {
    title: "Designing Guardrails for Voice Agents",
    type: "Field Report",
    time: "7 min read",
  },
];

const GrowthHub = () => {
  const [selectedIndustry, setSelectedIndustry] = useState(industries[0]);
  const [leadStep, setLeadStep] = useState(0);
  const [leadForm, setLeadForm] = useState({
    name: "",
    email: "",
    company: "",
    goal: "",
    budget: "₹5L - ₹15L monthly",
    timeframe: "Next 30 days",
    channel: "Demo call",
    notes: "",
  });
  const [leadSubmitted, setLeadSubmitted] = useState(false);
  const [chatInput, setChatInput] = useState("");
  const [chatHistory, setChatHistory] = useState([
    { role: "ai", text: "Hi! I’m your AI strategist. What should we build today?" },
  ]);
  const [copyPrompt, setCopyPrompt] = useState("");
  const [generatedCopy, setGeneratedCopy] = useState("Describe a goal to generate launch copy.");

  const filteredStudies = caseStudies.filter(
    (study) => study.industry === selectedIndustry || selectedIndustry === "Healthcare",
  );

  const canAdvance =
    (leadStep === 0 && leadForm.name && leadForm.email && leadForm.company) ||
    (leadStep === 1 && leadForm.goal && leadForm.timeframe);

  const handleLeadSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLeadSubmitted(true);
  };

  const sendChatMessage = () => {
    if (!chatInput.trim()) return;
    const updatedHistory = [...chatHistory, { role: "user" as const, text: chatInput }];
    setChatHistory(updatedHistory);
    setChatInput("");
    setTimeout(() => {
      setChatHistory((prev) => [
        ...prev,
        {
          role: "ai" as const,
          text: "Synthesizing plan → mapping workflows, picking the right model, and queuing handoff steps.",
        },
      ]);
    }, 500);
  };

  const generateCopy = () => {
    if (!copyPrompt.trim()) return;
    setGeneratedCopy(
      `Launch hook: ${copyPrompt}. Headline: “${copyPrompt} with Axenora AI.” CTA: “Book a 20-min build sprint.”`,
    );
  };

  return (
    <Layout>
      <div className="bg-gradient-to-b from-background via-background to-muted/20">
        <section className="container mx-auto px-4 pt-28 pb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center max-w-3xl mx-auto"
          >
            <Badge variant="secondary" className="mb-4">
              Axenora Growth Hub
            </Badge>
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">
              Everything needed to launch an AI-native agency
            </h1>
            <p className="text-lg text-muted-foreground mb-6">
              Case studies, playbooks, lead funnels, security packs, and interactive demos—
              built into one operating page so you can close enterprise deals faster.
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Button className="btn-primary" size="lg">
                Book a Build Sprint <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
              <Button variant="outline" size="lg">
                Explore demos
              </Button>
            </div>
          </motion.div>
        </section>

        {/* 1. Case studies */}
        <section className="container mx-auto px-4 pb-16">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
              <div>
                <p className="text-sm font-semibold text-primary uppercase tracking-wide">Case Studies</p>
                <h2 className="text-3xl font-bold mt-2">Proof, metrics, and playbacks</h2>
              </div>
              <div className="flex flex-wrap gap-2">
                {industries.map((industry) => (
                  <Button
                    key={industry}
                    variant={selectedIndustry === industry ? "default" : "outline"}
                    onClick={() => setSelectedIndustry(industry)}
                  >
                    {industry}
                  </Button>
                ))}
              </div>
            </div>

            <div className="grid lg:grid-cols-2 gap-8">
              <Card className="border border-border/60 bg-card/70">
                <CardHeader>
                  <CardTitle className="flex items-center gap-3 text-xl">
                    <BarChart3 className="w-5 h-5 text-primary" />
                    Signature win board
                  </CardTitle>
                  <p className="text-muted-foreground text-sm">
                    Quick tiles to prove vertical expertise, KPIs, and AI stack choices.
                  </p>
                </CardHeader>
                <CardContent className="grid sm:grid-cols-2 gap-4">
                  {filteredStudies.map((study) => (
                    <div key={study.company} className="rounded-2xl border border-border/60 p-4 bg-background/50">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-xs uppercase tracking-wide text-muted-foreground">{study.industry}</p>
                          <p className="font-semibold text-lg">{study.company}</p>
                        </div>
                        <Badge variant="outline">{study.result}</Badge>
                      </div>
                      <p className="text-sm text-muted-foreground mt-3">{study.summary}</p>
                      <div className="grid grid-cols-2 gap-2 mt-4 text-sm">
                        {study.metrics.map((metric) => (
                          <div key={metric.label} className="rounded-lg bg-secondary/30 p-2">
                            <p className="text-xs text-muted-foreground">{metric.label}</p>
                            <p className="font-semibold">{metric.value}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>

              <Card className="border border-border/60 bg-card/70">
                <CardHeader>
                  <CardTitle className="flex items-center gap-3 text-xl">
                    <LineChart className="w-5 h-5 text-primary" />
                    Impact dashboard snapshots
                  </CardTitle>
                  <p className="text-muted-foreground text-sm">
                    Include before/after charts, experiment notes, and highlights you can screen-share in pitches.
                  </p>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <p className="text-sm font-semibold">Qualified pipeline</p>
                      <span className="text-sm text-green-500">+187%</span>
                    </div>
                    <div className="h-24 rounded-xl bg-gradient-to-r from-primary/20 to-primary/5 relative overflow-hidden">
                      <div className="absolute bottom-0 left-0 right-0 flex items-end gap-1 h-full px-3 pb-2">
                        {[20, 45, 60, 80, 65, 95, 120].map((value, index) => (
                          <div
                            key={index}
                            className="flex-1 rounded-t-lg bg-primary/70"
                            style={{ height: `${value}%` }}
                          />
                        ))}
                      </div>
                    </div>
                  </div>
                  <div className="grid sm:grid-cols-3 gap-4">
                    {[
                      { label: "Meetings per rep", value: "23", delta: "+11" },
                      { label: "Avg. CSAT", value: "4.8/5", delta: "+0.7" },
                      { label: "Response SLA", value: "1m 12s", delta: "-82%" },
                    ].map((stat) => (
                      <div key={stat.label} className="rounded-xl border border-border/60 p-4">
                        <p className="text-xs text-muted-foreground uppercase">{stat.label}</p>
                        <p className="text-2xl font-bold my-2">{stat.value}</p>
                        <p className="text-xs text-green-500">{stat.delta}</p>
                      </div>
                    ))}
                  </div>
                  <div className="rounded-xl border border-border/60 p-4 bg-secondary/20">
                    <p className="text-sm font-semibold mb-1">Model + workflow summary</p>
                    <p className="text-sm text-muted-foreground">
                      GPT-4o mini + custom RAG, synced with HubSpot + WhatsApp Business, escalations via Slack Connect.
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </motion.div>
        </section>

        {/* 2. Lead intake & scheduling */}
        <section className="container mx-auto px-4 pb-16">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
              <div>
                <p className="text-sm font-semibold text-primary uppercase tracking-wide">Lead intake</p>
                <h2 className="text-3xl font-bold mt-2">Multi-step brief + instant scheduling</h2>
              </div>
            </div>
            <div className="grid lg:grid-cols-2 gap-8">
              <Card className="border border-border/60 bg-card/80">
                <CardHeader>
                  <CardTitle className="flex items-center gap-3">
                    <NotebookPen className="w-5 h-5 text-primary" />
                    Discovery questionnaire
                  </CardTitle>
                  <p className="text-sm text-muted-foreground">
                    Auto-qualify leads with context you’ll reuse in proposals.
                  </p>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center gap-4 mb-6">
                    {leadSteps.map((step, index) => (
                      <div key={step.label} className="flex-1">
                        <div
                          className={`h-1 rounded-full ${
                            index <= leadStep ? "bg-primary" : "bg-border"
                          } transition-all duration-300`}
                        />
                        <p className={`text-xs mt-2 ${index === leadStep ? "text-foreground" : "text-muted-foreground"}`}>
                          {step.label}
                        </p>
                      </div>
                    ))}
                  </div>
                  <form className="space-y-4" onSubmit={handleLeadSubmit}>
                    {leadStep === 0 && (
                      <>
                        <Input
                          placeholder="Full name"
                          value={leadForm.name}
                          onChange={(event) => setLeadForm({ ...leadForm, name: event.target.value })}
                        />
                        <Input
                          placeholder="Email"
                          type="email"
                          value={leadForm.email}
                          onChange={(event) => setLeadForm({ ...leadForm, email: event.target.value })}
                        />
                        <Input
                          placeholder="Company"
                          value={leadForm.company}
                          onChange={(event) => setLeadForm({ ...leadForm, company: event.target.value })}
                        />
                      </>
                    )}
                    {leadStep === 1 && (
                      <>
                        <Textarea
                          placeholder="What are we solving or automating?"
                          rows={4}
                          value={leadForm.goal}
                          onChange={(event) => setLeadForm({ ...leadForm, goal: event.target.value })}
                        />
                        <div className="grid sm:grid-cols-2 gap-3">
                          <Input
                            placeholder="Budget range"
                            value={leadForm.budget}
                            onChange={(event) => setLeadForm({ ...leadForm, budget: event.target.value })}
                          />
                          <Input
                            placeholder="Timeline"
                            value={leadForm.timeframe}
                            onChange={(event) => setLeadForm({ ...leadForm, timeframe: event.target.value })}
                          />
                        </div>
                      </>
                    )}
                    {leadStep === 2 && (
                      <>
                        <Input
                          placeholder="Preferred channel"
                          value={leadForm.channel}
                          onChange={(event) => setLeadForm({ ...leadForm, channel: event.target.value })}
                        />
                        <Textarea
                          placeholder="Additional notes or links"
                          rows={3}
                          value={leadForm.notes}
                          onChange={(event) => setLeadForm({ ...leadForm, notes: event.target.value })}
                        />
                        {leadSubmitted && (
                          <p className="text-sm text-green-500">Brief captured. We’ll share a tailored roadmap.</p>
                        )}
                      </>
                    )}
                    <div className="flex flex-wrap gap-3">
                      {leadStep > 0 && (
                        <Button type="button" variant="outline" onClick={() => setLeadStep((prev) => prev - 1)}>
                          Back
                        </Button>
                      )}
                      {leadStep < leadSteps.length - 1 ? (
                        <Button type="button" disabled={!canAdvance} onClick={() => canAdvance && setLeadStep((prev) => prev + 1)}>
                          Next
                        </Button>
                      ) : (
                        <Button type="submit">Submit overview</Button>
                      )}
                    </div>
                  </form>
                </CardContent>
              </Card>

              <Card className="border border-border/60 bg-card/80">
                <CardHeader>
                  <CardTitle className="flex items-center gap-3">
                    <Calendar className="w-5 h-5 text-primary" />
                    One-click scheduling
                  </CardTitle>
                  <p className="text-sm text-muted-foreground">
                    Embed your Cal.com or SavvyCal inside the flow with region-aware slots.
                  </p>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="rounded-xl border border-dashed border-border/70 p-4 bg-secondary/20">
                    <p className="text-sm font-semibold mb-2">Live availability preview</p>
                    <p className="text-sm text-muted-foreground mb-4">
                      Syncs to founders’ calendars, shows agenda, auto-inserts Zoom + Notion doc.
                    </p>
                    <div className="overflow-hidden rounded-lg border border-border/60">
                      <iframe
                        title="Scheduling"
                        src="https://cal.com/kaarthikdass/30min"
                        className="w-full h-80"
                        loading="lazy"
                      />
                    </div>
                  </div>
                  <div className="grid sm:grid-cols-2 gap-4">
                    {[
                      { label: "Average response", value: "7m 11s" },
                      { label: "Qualified acceptance", value: "86%" },
                      { label: "Docs auto-shared", value: "Proposal, MSA" },
                      { label: "Hand-off channel", value: "Slack Connect" },
                    ].map((item) => (
                      <div key={item.label} className="rounded-lg bg-secondary/30 p-3 text-sm">
                        <p className="text-muted-foreground">{item.label}</p>
                        <p className="font-semibold">{item.value}</p>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </motion.div>
        </section>

        {/* 3. Integrations */}
        <section className="container mx-auto px-4 pb-16">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
              <div>
                <p className="text-sm font-semibold text-primary uppercase tracking-wide">Integrations</p>
                <h2 className="text-3xl font-bold mt-2">Partner ecosystem & workflows</h2>
              </div>
            </div>
            <div className="grid lg:grid-cols-3 gap-6">
              {integrations.map((integration) => (
                <Card key={integration.title} className="border border-border/60 bg-card/70">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-3">
                      <Layers className="w-5 h-5 text-primary" />
                      {integration.title}
                    </CardTitle>
                    <p className="text-sm text-muted-foreground">{integration.description}</p>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="flex flex-wrap gap-2">
                      {integration.tools.map((tool) => (
                        <Badge key={tool} variant="outline">
                          {tool}
                        </Badge>
                      ))}
                    </div>
                    <p className="text-xs text-muted-foreground">
                      Include partner status, certification badges, and co-selling GTM offers.
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>
            <div className="rounded-2xl border border-dashed border-primary/40 mt-8 p-6 flex flex-wrap items-center gap-6">
              <div>
                <p className="text-sm uppercase tracking-wide text-primary">Featured partnership</p>
                <h3 className="text-2xl font-bold mt-2">Meta Business Messaging Accelerator</h3>
                <p className="text-muted-foreground text-sm mt-2">
                  Preferred partner access for WhatsApp Flows, CTA ads, and broadcast APIs.
                </p>
              </div>
              <Button variant="outline" className="ml-auto">
                Download partner deck <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </div>
          </motion.div>
        </section>

        {/* 4. Playbooks */}
        <section className="container mx-auto px-4 pb-16">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
              <div>
                <p className="text-sm font-semibold text-primary uppercase tracking-wide">AI Playbooks</p>
                <h2 className="text-3xl font-bold mt-2">Battle-tested launch kits</h2>
              </div>
            </div>
            <div className="grid md:grid-cols-3 gap-6">
              {playbooks.map((playbook) => (
                <Card key={playbook.title} className="border border-border/60 bg-card/70">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-3">
                      <Rocket className="w-5 h-5 text-primary" />
                      {playbook.title}
                    </CardTitle>
                    <Badge variant="secondary">{playbook.focus}</Badge>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <ul className="text-sm text-muted-foreground space-y-2">
                      {playbook.outcomes.map((outcome) => (
                        <li key={outcome} className="flex items-start gap-2">
                          <CheckCircle2 className="w-4 h-4 text-primary mt-0.5" />
                          {outcome}
                        </li>
                      ))}
                    </ul>
                    <div className="flex items-center justify-between text-sm">
                      <span>Duration: {playbook.duration}</span>
                      <Button size="sm" variant="outline">
                        View SOP
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </motion.div>
        </section>

        {/* 5. Client portal mock */}
        <section className="container mx-auto px-4 pb-16">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
              <div>
                <p className="text-sm font-semibold text-primary uppercase tracking-wide">Client Portal</p>
                <h2 className="text-3xl font-bold mt-2">Share progress, experiments, and SLAs</h2>
              </div>
            </div>
            <Card className="border border-border/60 bg-card/80">
              <CardContent className="grid lg:grid-cols-3 gap-6 p-6">
                <div className="lg:col-span-2 space-y-4">
                  <div className="rounded-xl border border-border/60 p-4">
                    <p className="text-sm text-muted-foreground">Live metrics</p>
                    <div className="grid sm:grid-cols-3 gap-4 mt-4">
                      {[
                        { label: "AI Qualified Leads", value: "312", change: "+38%" },
                        { label: "Automations live", value: "26", change: "+5" },
                        { label: "SLA meeting", value: "99.2%", change: "+1.2%" },
                      ].map((metric) => (
                        <div key={metric.label} className="rounded-lg bg-secondary/30 p-3">
                          <p className="text-xs text-muted-foreground uppercase">{metric.label}</p>
                          <p className="text-2xl font-bold my-1">{metric.value}</p>
                          <p className="text-xs text-green-500">{metric.change}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className="rounded-xl border border-border/60 p-4 bg-background/80">
                    <div className="flex items-center justify-between">
                      <h3 className="text-lg font-semibold">Experiment timeline</h3>
                      <Badge variant="outline">Sprint 12</Badge>
                    </div>
                    <div className="mt-4 space-y-3">
                      {[
                        { title: "WhatsApp concierge v2", status: "QA → Launch", owner: "CX pod" },
                        { title: "Voice agent guardrails", status: "Recording review", owner: "AI Studio" },
                        { title: "Payments nudges", status: "Awaiting compliance", owner: "RevOps" },
                      ].map((item) => (
                        <div key={item.title} className="flex items-center justify-between text-sm">
                          <div>
                            <p className="font-medium">{item.title}</p>
                            <p className="text-muted-foreground">{item.owner}</p>
                          </div>
                          <Badge>{item.status}</Badge>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="rounded-xl border border-border/60 p-4 bg-secondary/30">
                    <p className="text-sm text-muted-foreground">Next review</p>
                    <p className="text-2xl font-bold mt-2">Wednesday, 4 PM IST</p>
                    <p className="text-sm text-muted-foreground mt-2">Auto agenda + Loom recap drop 2 hours prior.</p>
                  </div>
                  <div className="rounded-xl border border-border/60 p-4">
                    <p className="font-semibold mb-2">Enablement</p>
                    <ul className="space-y-2 text-sm text-muted-foreground">
                      <li className="flex items-center gap-2">
                        <Link2 className="w-4 h-4 text-primary" /> Slack Connect channel
                      </li>
                      <li className="flex items-center gap-2">
                        <Link2 className="w-4 h-4 text-primary" /> Notion HQ + SOP wiki
                      </li>
                      <li className="flex items-center gap-2">
                        <Link2 className="w-4 h-4 text-primary" /> Experiment feedback form
                      </li>
                    </ul>
                  </div>
                  <div className="rounded-xl border border-dashed border-primary/40 p-4 text-sm">
                    <p className="font-semibold">Portal URL</p>
                    <p className="text-muted-foreground">portal.axenora.ai/client/acme</p>
                    <Button variant="outline" className="mt-3" size="sm">
                      View live portal
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </section>

        {/* 6. Careers & culture */}
        <section className="container mx-auto px-4 pb-16">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
              <div>
                <p className="text-sm font-semibold text-primary uppercase tracking-wide">Careers</p>
                <h2 className="text-3xl font-bold mt-2">Build the next AI agency rocketship</h2>
              </div>
              <Button>See all openings</Button>
            </div>
            <div className="grid md:grid-cols-3 gap-6">
              {values.map((value) => (
                <Card key={value.title} className="border border-border/60 bg-card/70">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-3">
                      <Sparkles className="w-5 h-5 text-primary" />
                      {value.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground">{value.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
            <div className="mt-8 rounded-2xl border border-border/60 p-6 bg-secondary/20">
              <div className="flex flex-wrap items-center justify-between gap-4 mb-4">
                <h3 className="text-2xl font-semibold">Open roles</h3>
                <Badge variant="outline">Early team</Badge>
              </div>
              <div className="space-y-4">
                {roles.map((role) => (
                  <div
                    key={role.title}
                    className="flex flex-wrap items-center justify-between gap-3 rounded-xl border border-border/60 p-4 bg-background/60"
                  >
                    <div>
                      <p className="font-semibold">{role.title}</p>
                      <p className="text-sm text-muted-foreground">{role.type}</p>
                    </div>
                    <p className="text-sm text-muted-foreground">{role.stack}</p>
                    <Button variant="outline" size="sm">
                      View role
                    </Button>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </section>

        {/* 8. Security & compliance */}
        <section className="container mx-auto px-4 pb-16">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
              <div>
                <p className="text-sm font-semibold text-primary uppercase tracking-wide">Security</p>
                <h2 className="text-3xl font-bold mt-2">Enterprise-grade trust center</h2>
              </div>
              <Button variant="outline">
                Download security brief <ShieldCheck className="w-4 h-4 ml-2" />
              </Button>
            </div>
            <div className="grid lg:grid-cols-3 gap-6">
              {securityHighlights.map((item) => (
                <Card key={item.title} className="border border-border/60 bg-card/70">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-3">
                      <Lock className="w-5 h-5 text-primary" />
                      {item.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2 text-sm text-muted-foreground">
                      {item.details.map((detail) => (
                        <li key={detail} className="flex items-start gap-2">
                          <CheckCircle2 className="w-4 h-4 text-primary mt-0.5" />
                          {detail}
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              ))}
            </div>
            <div className="mt-8 rounded-2xl border border-dashed border-primary/40 p-6 grid md:grid-cols-3 gap-6">
              {[
                { label: "Data residency", value: "India, EU, US regions" },
                { label: "Model privacy", value: "Dedicated tenants or on-prem" },
                { label: "Access controls", value: "SAML / SCIM, role ACLs" },
              ].map((item) => (
                <div key={item.label}>
                  <p className="text-xs text-muted-foreground uppercase">{item.label}</p>
                  <p className="text-lg font-semibold mt-1">{item.value}</p>
                </div>
              ))}
            </div>
          </motion.div>
        </section>

        {/* 9. Interactive demos */}
        <section className="container mx-auto px-4 pb-16">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
              <div>
                <p className="text-sm font-semibold text-primary uppercase tracking-wide">Interactive demos</p>
                <h2 className="text-3xl font-bold mt-2">Let prospects play with the AI</h2>
              </div>
            </div>
            <div className="grid lg:grid-cols-2 gap-6">
              <Card className="border border-border/60 bg-card/80">
                <CardHeader>
                  <CardTitle className="flex items-center gap-3">
                    <MessageCircle className="w-5 h-5 text-primary" />
                    Strategy copilot
                  </CardTitle>
                  <p className="text-sm text-muted-foreground">
                    Lightweight chat that explains workflows and next steps.
                  </p>
                </CardHeader>
                <CardContent>
                  <div className="h-64 border border-border/60 rounded-xl p-4 overflow-y-auto space-y-3 bg-background/80">
                    {chatHistory.map((message, index) => (
                      <div
                        key={index}
                        className={`flex ${message.role === "ai" ? "justify-start" : "justify-end"}`}
                      >
                        <div
                          className={`px-3 py-2 rounded-2xl text-sm ${
                            message.role === "ai"
                              ? "bg-secondary/40 text-foreground"
                              : "bg-primary text-white"
                          }`}
                        >
                          {message.text}
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="mt-4 flex gap-2">
                    <Input
                      placeholder="Ask the AI strategist…"
                      value={chatInput}
                      onChange={(event) => setChatInput(event.target.value)}
                    />
                    <Button onClick={sendChatMessage}>
                      Send <ArrowRight className="w-4 h-4 ml-1" />
                    </Button>
                  </div>
                </CardContent>
              </Card>

              <Card className="border border-border/60 bg-card/80">
                <CardHeader>
                  <CardTitle className="flex items-center gap-3">
                    <Video className="w-5 h-5 text-primary" />
                    Copy + demo generator
                  </CardTitle>
                  <p className="text-sm text-muted-foreground">
                    Showcase how you create campaigns in seconds.
                  </p>
                </CardHeader>
                <CardContent className="space-y-4">
                  <Textarea
                    rows={3}
                    placeholder="Ex: Personalize onboarding emails for high ARR accounts."
                    value={copyPrompt}
                    onChange={(event) => setCopyPrompt(event.target.value)}
                  />
                  <div className="flex gap-3">
                    <Button onClick={generateCopy}>Generate copy</Button>
                    <Button variant="outline">See voice sample</Button>
                  </div>
                  <div className="rounded-xl border border-border/60 p-4 bg-background/80 min-h-[120px]">
                    <p className="text-sm text-muted-foreground">{generatedCopy}</p>
                  </div>
                  <div className="grid sm:grid-cols-2 gap-3 text-sm text-muted-foreground">
                    {demoIntents.map((intent) => (
                      <div key={intent.title} className="rounded-lg border border-border/60 p-3">
                        <p className="font-semibold text-foreground">{intent.title}</p>
                        <p className="text-xs mt-1">{intent.prompt}</p>
                        <p className="text-xs text-primary mt-2">{intent.response}</p>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </motion.div>
        </section>

        {/* 7. Blog / research */}
        <section className="container mx-auto px-4 pb-24">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
              <div>
                <p className="text-sm font-semibold text-primary uppercase tracking-wide">Research hub</p>
                <h2 className="text-3xl font-bold mt-2">Publish authority-grade content</h2>
              </div>
              <Button variant="ghost">
                View archive <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </div>
            <div className="grid md:grid-cols-3 gap-6">
              {articles.map((article) => (
                <Card key={article.title} className="border border-border/60 bg-card/70">
                  <CardContent className="p-6 space-y-3">
                    <Badge variant="secondary">{article.type}</Badge>
                    <h3 className="text-xl font-semibold">{article.title}</h3>
                    <p className="text-sm text-muted-foreground">{article.time}</p>
                    <Button variant="link" className="px-0">
                      Read note <ArrowRight className="w-4 h-4 ml-1" />
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </motion.div>
        </section>
      </div>
    </Layout>
  );
};

export default GrowthHub;
