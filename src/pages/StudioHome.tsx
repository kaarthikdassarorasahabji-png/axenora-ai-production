import { Link } from "react-router-dom";
import { motion, useReducedMotion } from "framer-motion";
import {
  ArrowUpRight,
  ArrowDown,
  PhoneCall,
  MessageSquare,
  Workflow,
} from "lucide-react";
import { Layout } from "@/components/layout/Layout";
import {
  Action,
  FinalCTA,
  ProductGrid,
  ProductVisual,
  Reveal,
} from "@/components/Studio";
import { faqs, products } from "@/lib/catalog";

export default function StudioHome() {
  const reduce = useReducedMotion();
  return (
    <Layout>
      <div className="studio">
        <section className="studio-hero">
          <img
            className="studio-hero-image"
            src="/images/studio-hero-v2.jpg"
            alt="Product designers collaborating in a bright software studio"
            fetchPriority="high"
          />
          <div className="studio-hero-shade" />
          <div className="studio-wrap studio-hero-content">
            <motion.div
              initial={{ opacity: 0, y: reduce ? 0 : 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7 }}
            >
              <p className="studio-label">
                <span />
                Business software. Thoughtfully connected.
              </p>
              <h1>
                Axenora AI<span className="hero-period">.</span>
              </h1>
              <p className="studio-hero-statement">
                Make room for
                <br />
                <em>better work.</em>
              </p>
              <p className="studio-hero-description">
                AI conversations, smarter operations and software built around
                the way your business moves.
              </p>
              <div className="studio-hero-actions">
                <Action />
                <a className="studio-text-link" href="#projects">
                  Discover our systems
                  <ArrowDown size={16} />
                </a>
              </div>
            </motion.div>
          </div>
          <div className="hero-bottom">
            <span>Built for people. Connected by software.</span>
            <span>
              Explore what comes next <ArrowDown size={15} />
            </span>
          </div>
        </section>
        <section className="studio-overview studio-wrap">
          <Reveal>
            <div className="studio-section-heading">
              <p className="studio-label">01 / What we build</p>
              <h2>
                Every part of your business.
                <br />
                <span className="studio-muted">Working better together.</span>
              </h2>
            </div>
          </Reveal>
          <div className="studio-services">
            {[
              {
                icon: MessageSquare,
                title: "Conversations that help",
                text: "Custom chatbots, WhatsApp and Instagram automation that guide customers and connect them to your team.",
                link: "/projects/chatbots",
              },
              {
                icon: PhoneCall,
                title: "A voice for your business",
                text: "AI calling workflows for inquiries, qualification and appointment requests, with human handoff built in.",
                link: "/projects/calling",
              },
              {
                icon: Workflow,
                title: "Operations in sync",
                text: "CRM, workforce visibility and office workflows. Clear ownership, connected information and fewer loose ends.",
                link: "/projects/crm",
              },
            ].map(({ icon: Icon, title, text, link }, i) => (
              <Reveal key={title}>
                <Link className="service-item" to={link}>
                  <div className="service-top">
                    <Icon size={24} />
                    <span>0{i + 1}</span>
                  </div>
                  <h3>{title}</h3>
                  <p>{text}</p>
                  <ArrowUpRight className="service-arrow" size={23} />
                </Link>
              </Reveal>
            ))}
          </div>
        </section>
        <section id="projects" className="studio-featured">
          <div className="studio-wrap">
            <div className="studio-section-heading">
              <div>
                <p className="studio-label">02 / Selected systems</p>
                <h2>
                  Built around
                  <br />
                  real business needs.
                </h2>
              </div>
              <Link className="studio-text-link" to="/solutions">
                All products & services
                <ArrowUpRight size={18} />
              </Link>
            </div>
            {products
              .filter((p) => ["empmetria", "chatbots", "crm"].includes(p.slug))
              .map((p, i) => (
                <Reveal key={p.slug}>
                  <article
                    className={`featured-project ${i % 2 ? "featured-reverse" : ""}`}
                  >
                    <Link
                      className="featured-visual"
                      to={`/projects/${p.slug}`}
                    >
                      <ProductVisual slug={p.slug} name={p.name} />
                    </Link>
                    <div className="featured-copy">
                      <p className="studio-label">{p.category}</p>
                      <h3>{p.name}</h3>
                      <p>{p.summary}</p>
                      <ul>
                        {p.features.slice(0, 3).map((f) => (
                          <li key={f}>{f}</li>
                        ))}
                      </ul>
                      <Link
                        className="studio-text-link"
                        to={`/projects/${p.slug}`}
                      >
                        Explore the system
                        <ArrowUpRight size={18} />
                      </Link>
                    </div>
                  </article>
                </Reveal>
              ))}
          </div>
        </section>
        <section className="studio-section studio-wrap">
          <div className="studio-section-heading">
            <div>
              <p className="studio-label">03 / More possibilities</p>
              <h2>
                Your next workflow.
                <br />
                <span className="studio-muted">Already taking shape.</span>
              </h2>
            </div>
            <p>
              From a first customer message to an internal approval, explore the
              rest of the Axenora ecosystem.
            </p>
          </div>
          <ProductGrid
            items={products.filter(
              (p) =>
                !["empmetria", "chatbots", "crm", "elovri"].includes(p.slug),
            )}
          />
        </section>
        <section className="studio-elovri">
          <div className="studio-wrap elovri-layout">
            <Reveal>
              <p className="studio-label">Meet Elvori / Client collaboration</p>
              <h2>
                A place for
                <br />
                <em>your next idea.</em>
              </h2>
              <p>
                Share a challenge. Review a tailored proposal. Keep milestones,
                documents and decisions together in your private client
                workspace.
              </p>
              <a
                href="https://elovri.axenoraai.in"
                target="_blank"
                rel="noreferrer"
                className="studio-action"
              >
                Explore Elvori
                <ArrowUpRight size={18} />
              </a>
            </Reveal>
            <Reveal>
              <ProductVisual slug="elovri" name="Elvori" />
            </Reveal>
          </div>
        </section>
        <section className="studio-section studio-wrap">
          <div className="studio-section-heading">
            <div>
              <p className="studio-label">04 / From idea to everyday</p>
              <h2>
                Good systems start
                <br />
                with a conversation.
              </h2>
            </div>
            <Link className="studio-text-link" to="/how-it-works">
              The way we work
              <ArrowUpRight size={18} />
            </Link>
          </div>
          <ol className="studio-steps">
            {[
              ["Listen", "Understand your people, tools and workflows."],
              ["Define", "Agree a clear scope and useful outcome."],
              ["Build", "Design the experience and connect the systems."],
              ["Refine", "Test, launch and improve with real feedback."],
            ].map(([title, text], i) => (
              <li key={title}>
                <span>0{i + 1}</span>
                <h3>{title}</h3>
                <p>{text}</p>
              </li>
            ))}
          </ol>
        </section>
        <section className="studio-faq studio-wrap">
          <div>
            <p className="studio-label">A little clarity</p>
            <h2>
              Before we
              <br />
              get started.
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
