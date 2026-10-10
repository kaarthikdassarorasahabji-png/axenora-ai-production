import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowUpRight, PhoneCall, MessageSquare, Workflow } from "lucide-react";
import { Layout } from "@/components/layout/Layout";
import { Action, FinalCTA, ProductGrid, Reveal } from "@/components/Studio";
import { faqs } from "@/lib/catalog";
import office from "@/assets/empmetria/operations-team.jpg";

export default function StudioHome() {
  const services = [
    {
      icon: MessageSquare,
      title: "Customer conversations",
      text: "Useful answers across your website, WhatsApp and Instagram.",
    },
    {
      icon: PhoneCall,
      title: "AI calling workflows",
      text: "Qualification, appointment requests and follow-up with a clear human handoff.",
    },
    {
      icon: Workflow,
      title: "Connected operations",
      text: "CRM, workforce visibility and office workflows that share the same context.",
    },
  ];
  return (
    <Layout>
      <div className="studio">
        <section className="studio-hero">
          <img
            className="studio-hero-image"
            src={office}
            alt="Team reviewing a workforce operations dashboard"
            fetchPriority="high"
          />
          <div className="studio-hero-shade" />
          <div className="studio-wrap studio-hero-content">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55 }}
            >
              <p className="studio-label">
                Independent software & automation studio
              </p>
              <h1>Axenora AI</h1>
              <p className="studio-hero-statement">
                A better way to run
                <br />
                the work behind your business.
              </p>
              <p className="studio-hero-description">
                Custom AI chatbots, calling agents and connected business
                systems. Built around your customers, your team and your next
                step.
              </p>
              <div className="studio-hero-actions">
                <Action />
                <a className="studio-text-link" href="#projects">
                  Explore our work
                  <ArrowUpRight size={18} />
                </a>
              </div>
            </motion.div>
          </div>
        </section>
        <section className="studio-overview studio-wrap">
          <p className="studio-label">Less chasing. More progress.</p>
          <h2>
            Conversations become actions.
            <br />
            Teams stay connected.
          </h2>
          <div className="studio-services">
            {services.map(({ icon: Icon, title, text }) => (
              <div key={title}>
                <Icon size={25} />
                <h3>{title}</h3>
                <p>{text}</p>
              </div>
            ))}
          </div>
        </section>
        <section id="projects" className="studio-section studio-wrap">
          <div className="studio-section-heading">
            <div>
              <p className="studio-label">The Axenora portfolio</p>
              <h2>
                Built for the work
                <br />
                you actually do.
              </h2>
            </div>
            <p>
              Explore the products and custom systems behind better customer
              support, clearer operations and more useful automation.
            </p>
          </div>
          <ProductGrid />
        </section>
        <section className="studio-elovri">
          <div className="studio-wrap">
            <Reveal>
              <div className="studio-section-heading">
                <div>
                  <p className="studio-label">Meet Elvori</p>
                  <h2>
                    Your project.
                    <br />A shared view.
                  </h2>
                </div>
                <div>
                  <p>
                    Bring us your business challenge. Review the proposal,
                    follow milestones and keep documents, feedback and decisions
                    together in your private workspace.
                  </p>
                  <a
                    href="https://elovri.axenoraai.in"
                    target="_blank"
                    rel="noreferrer"
                    className="studio-text-link"
                  >
                    Explore Elvori
                    <ArrowUpRight size={18} />
                  </a>
                </div>
              </div>
              <a
                className="studio-elovri-image"
                href="https://elovri.axenoraai.in"
                target="_blank"
                rel="noreferrer"
              >
                <img
                  src="/images/elovri-site.jpg"
                  alt="Elvori by Axenora: business requests and private client workspaces"
                  loading="lazy"
                />
              </a>
            </Reveal>
          </div>
        </section>
        <section className="studio-section studio-wrap">
          <div className="studio-section-heading">
            <div>
              <p className="studio-label">How we work</p>
              <h2>
                A clear path
                <br />
                from idea to use.
              </h2>
            </div>
            <Link className="studio-text-link" to="/how-it-works">
              Our process
              <ArrowUpRight size={18} />
            </Link>
          </div>
          <ol className="studio-steps">
            {[
              ["Understand", "The current workflow, people and friction."],
              ["Define", "The scope, permissions and useful outcome."],
              ["Build", "The interface, integrations and automation."],
              ["Refine", "Test real scenarios and review the results."],
            ].map(([title, description], i) => (
              <li key={title}>
                <span>0{i + 1}</span>
                <h3>{title}</h3>
                <p>{description}</p>
              </li>
            ))}
          </ol>
        </section>
        <section className="studio-faq studio-wrap">
          <div>
            <p className="studio-label">Before we begin</p>
            <h2>
              Good questions.
              <br />
              Clear answers.
            </h2>
          </div>
          <div>
            {faqs.map(([question, answer]) => (
              <details key={question}>
                <summary>
                  {question}
                  <span aria-hidden="true">+</span>
                </summary>
                <p>{answer}</p>
              </details>
            ))}
          </div>
        </section>
        <FinalCTA />
      </div>
    </Layout>
  );
}
