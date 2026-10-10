import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import { ArrowUpRight, Search, ArrowLeft } from "lucide-react";
import { Layout } from "@/components/layout/Layout";
import {
  Action,
  Features,
  FinalCTA,
  Intro,
  ProductGrid,
  ProductVisual,
  Reveal,
} from "@/components/Studio";
import { products, projectGuides } from "@/lib/catalog";
import NotFound from "@/pages/StudioNotFound";

export function Solutions() {
  const [group, setGroup] = useState("All systems");
  const [query, setQuery] = useState("");
  const groups = {
    "All systems": products.map((p) => p.slug),
    "Customer experience": [
      "chatbots",
      "calling",
      "whatsapp",
      "instagram",
      "crm",
    ],
    Workforce: ["empmetria", "monitoring"],
    Operations: ["elovri", "crm", "office-automation"],
    Music: ["meloqis"],
  };
  const filtered = products.filter(
    (p) =>
      groups[group as keyof typeof groups].includes(p.slug) &&
      `${p.name} ${p.summary} ${p.features.join(" ")}`
        .toLowerCase()
        .includes(query.toLowerCase()),
  );
  return (
    <Layout>
      <div className="studio">
        <Intro
          label="Products & custom builds"
          title="Software for your next chapter."
          text="Explore the Axenora ecosystem. Customer conversations, team visibility and connected operations, built around your business."
        />
        <section className="studio-wrap studio-section">
          <div className="project-filter">
            <div className="filter-options" aria-label="Filter solutions">
              {Object.keys(groups).map((name) => (
                <button
                  key={name}
                  aria-pressed={group === name}
                  onClick={() => setGroup(name)}
                >
                  {name}
                </button>
              ))}
            </div>
            <label className="project-search">
              <Search size={17} />
              <input
                aria-label="Search solutions"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Find a system..."
                type="search"
              />
            </label>
          </div>
          <p className="sr-only" aria-live="polite">
            {filtered.length} systems found
          </p>
          <ProductGrid items={filtered} />
          {!filtered.length && (
            <div className="project-empty">
              <h2>No matching systems.</h2>
              <p>Try a different search, or tell us what you need.</p>
              <Action />
            </div>
          )}
        </section>
        <FinalCTA />
      </div>
    </Layout>
  );
}
export function Project({ projectSlug }: { projectSlug?: string }) {
  const { slug } = useParams();
  const product = products.find((item) => item.slug === (projectSlug || slug));
  if (!product) return <NotFound />;
  const external = "external" in product ? product.external : undefined;
  const guide = projectGuides[product.slug];
  return (
    <Layout>
      <div className="studio">
        <div className="studio-wrap project-back">
          <Link className="studio-text-link" to="/solutions">
            <ArrowLeft size={15} />
            All systems
          </Link>
        </div>
        <Intro
          label={product.category}
          title={product.name}
          text={product.summary}
        />
        <section className="studio-wrap studio-project-intro">
          <div className="studio-project-visual">
            <ProductVisual slug={product.slug} name={product.name} />
            <p>
              Workflow concept. Features and integrations are scoped to your
              implementation.
            </p>
          </div>
          <div>
            <p className="studio-label">What it brings together</p>
            <Features items={product.features} />
            {external ? (
              <a
                className="studio-action"
                href={external}
                target="_blank"
                rel="noreferrer"
              >
                {product.action}
                <ArrowUpRight size={18} />
              </a>
            ) : (
              <Action>{product.action}</Action>
            )}
            {product.slug === "calling" && (
              <p className="studio-note">
                A custom implementation, configured with your chosen telephony
                and voice providers. Request a demonstration to discuss the
                available setup.
              </p>
            )}
          </div>
        </section>
        <section className="project-context">
          <div className="studio-wrap">
            <Reveal>
              <div>
                <p className="studio-label">Where it fits</p>
                <h2>
                  A useful system.
                  <br />
                  For a specific need.
                </h2>
                <p>{guide.fit}</p>
              </div>
            </Reveal>
            <Reveal>
              <div>
                <p className="studio-label">Connections & configuration</p>
                <div className="connection-list">
                  {guide.connections.map((item) => (
                    <span key={item}>{item}</span>
                  ))}
                </div>
                <h3>Clear boundaries. Human control.</h3>
                <p>{guide.controls}</p>
              </div>
            </Reveal>
          </div>
        </section>
        <section className="studio-section studio-wrap">
          <p className="studio-label">From requirements to rollout</p>
          <h2>A practical implementation path.</h2>
          <ol className="studio-steps">
            {product.workflow.map((step, index) => (
              <li key={step}>
                <span>0{index + 1}</span>
                <h3>{step}</h3>
              </li>
            ))}
          </ol>
        </section>
        <section className="studio-related studio-wrap">
          <p className="studio-label">Connect the next part</p>
          <div>
            {products
              .filter((item) => item.slug !== product.slug)
              .slice(0, 3)
              .map((item) => (
                <Link
                  className="studio-text-link"
                  to={`/projects/${item.slug}`}
                  key={item.slug}
                >
                  {item.name}
                  <ArrowUpRight size={18} />
                </Link>
              ))}
          </div>
        </section>
        <FinalCTA />
      </div>
    </Layout>
  );
}
export function About() {
  return (
    <Layout>
      <div className="studio">
        <Intro
          label="About the studio"
          title="Axenora AI"
          text="A founder-led software studio connecting business operations, customer conversations and practical AI."
        />
        <section className="studio-wrap studio-project-intro">
          <Reveal>
            <div className="studio-manifesto">
              <span className="studio-label">The Axenora approach</span>
              <h2>
                People first.
                <br />
                <em>Systems second.</em>
              </h2>
              <div className="manifesto-lines">
                <span>Listen closely.</span>
                <span>Build thoughtfully.</span>
                <span>Keep improving.</span>
              </div>
            </div>
          </Reveal>
          <div>
            <p className="studio-label">Led by Kaarthik Dass Arora</p>
            <h2>
              Good software starts
              <br />
              with listening.
            </h2>
            <p className="studio-lead">
              We work through how your team operates today before deciding what
              to automate. The result is a clear scope, a useful interface and
              connected systems your people can work with.
            </p>
            <Features
              items={[
                "One conversation across product, design and engineering",
                "Permissions and human handoff built into the workflow",
                "Real scenarios tested before rollout",
                "A private client workspace through Elvori",
              ]}
            />
            <Action />
          </div>
        </section>
        <section className="studio-section studio-wrap">
          <p className="studio-label">Our approach</p>
          <h2>Useful by design.</h2>
          <div className="studio-services">
            {[
              [
                "Clarity",
                "Understand the workflow and agree what success means.",
              ],
              [
                "Ownership",
                "Give actions an owner and operators the tools to intervene.",
              ],
              [
                "Continuity",
                "Connect the system to the tools and people you already depend on.",
              ],
            ].map(([title, text]) => (
              <div key={title}>
                <h3>{title}</h3>
                <p>{text}</p>
              </div>
            ))}
          </div>
        </section>
        <FinalCTA />
      </div>
    </Layout>
  );
}
export function Process() {
  return (
    <Layout>
      <div className="studio">
        <Intro
          label="The process"
          title="From a business problem to a working system."
          text="Clear requirements, a reviewed proposal and an implementation your team can follow from beginning to rollout."
        />
        <section className="studio-wrap studio-process">
          {[
            [
              "Discovery",
              "Show us how work happens today: channels, customers, tools, permissions and the moments where things get missed.",
            ],
            [
              "Scope & proposal",
              "Agree workflows, integrations, responsibilities, deliverables and commercial terms before development.",
            ],
            [
              "Design & development",
              "Build the interface and backend together. Use Elvori to keep project discussions, documents and milestones in view.",
            ],
            [
              "Testing & rollout",
              "Test ordinary work and exceptions: unanswered questions, failed integrations, access boundaries and human handoff.",
            ],
            [
              "Review & refinement",
              "Review how the system performs and agree the next improvements based on real usage.",
            ],
          ].map(([title, text], i) => (
            <article key={title}>
              <span className="studio-label">0{i + 1}</span>
              <h2>{title}</h2>
              <p>{text}</p>
            </article>
          ))}
          <Action />
        </section>
        <FinalCTA />
      </div>
    </Layout>
  );
}
export function Capabilities() {
  return (
    <Layout>
      <div className="studio">
        <Intro
          label="Capabilities"
          title="The details behind the workflow."
          text="Explore what each system brings together, then choose the integrations and controls that fit your business."
        />
        <section className="studio-wrap studio-capabilities">
          {products.map((product) => (
            <article key={product.slug}>
              <div>
                <p className="studio-label">{product.category}</p>
                <h2>
                  <Link to={`/projects/${product.slug}`}>{product.name}</Link>
                </h2>
                <p>{product.summary}</p>
              </div>
              <Features items={product.features} />
            </article>
          ))}
        </section>
        <FinalCTA />
      </div>
    </Layout>
  );
}
