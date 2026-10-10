import { Link, useParams } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";
import { Layout } from "@/components/layout/Layout";
import {
  Action,
  Features,
  FinalCTA,
  Intro,
  ProductGrid,
} from "@/components/Studio";
import { products } from "@/lib/catalog";
import NotFound from "@/pages/StudioNotFound";
import office from "@/assets/empmetria/operations-team.jpg";

export function Solutions() {
  return (
    <Layout>
      <div className="studio">
        <Intro
          label="Products & custom builds"
          title="The right system for the work."
          text="Client workspaces, workforce platforms, customer conversations and operational workflows. Explore a focused product or discuss a connected implementation."
        />
        <section className="studio-wrap studio-section">
          <ProductGrid />
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
  return (
    <Layout>
      <div className="studio">
        <Intro
          label={product.category}
          title={product.name}
          text={product.summary}
        />
        <section className="studio-wrap studio-project-intro">
          <div className="studio-project-visual">
            <img
              src={product.image}
              alt={`${product.name} overview`}
              fetchPriority="high"
            />
            <p>
              {external
                ? "Product website overview"
                : "Illustrative product visual. The implementation is scoped to your business."}
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
              .filter((item) => item.slug !== slug)
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
          <img
            className="studio-about-image"
            src={office}
            alt="Team reviewing business software"
          />
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
