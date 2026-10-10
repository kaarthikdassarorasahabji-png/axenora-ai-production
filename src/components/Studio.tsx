import { Link } from "react-router-dom";
import {
  ArrowUpRight,
  Check,
  ExternalLink,
  MessageSquare,
  PhoneCall,
  Workflow,
  Users,
  ShoppingBag,
  Calendar,
  ShieldCheck,
  ArrowRight,
  CheckCheck,
  FileText,
  Activity,
  Headphones,
} from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";
import { products } from "@/lib/catalog";

export function Reveal({ children }: { children: React.ReactNode }) {
  const reduce = useReducedMotion();
  return (
    <motion.div
      initial={{ opacity: 0, y: reduce ? 0 : 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.08 }}
      transition={{ duration: 0.55 }}
    >
      {children}
    </motion.div>
  );
}
export function Action({
  to = "/contact",
  children = "Start a conversation",
}: {
  to?: string;
  children?: React.ReactNode;
}) {
  return (
    <Link className="studio-action" to={to}>
      {children}
      <ArrowUpRight size={18} />
    </Link>
  );
}
export function Intro({
  label,
  title,
  text,
}: {
  label: string;
  title: string;
  text: string;
}) {
  return (
    <section className="studio-intro studio-wrap">
      <p className="studio-label">
        <span />
        {label}
      </p>
      <h1>{title}</h1>
      <p className="studio-lead">{text}</p>
    </section>
  );
}
const visualIcons = {
  elovri: FileText,
  empmetria: Activity,
  chatbots: MessageSquare,
  calling: PhoneCall,
  crm: Users,
  whatsapp: MessageSquare,
  instagram: ShoppingBag,
  "office-automation": Workflow,
  monitoring: ShieldCheck,
  meloqis: Headphones,
};

// Concept illustrations show workflow ideas, not product screenshots.
export function ProductVisual({
  slug,
  name,
  compact = false,
}: {
  slug: string;
  name: string;
  compact?: boolean;
}) {
  const Icon = visualIcons[slug as keyof typeof visualIcons] || Workflow;
  const conversation = ["chatbots", "whatsapp", "instagram"].includes(slug);
  const workforce = ["empmetria", "monitoring"].includes(slug);
  return (
    <div
      className={`product-art art-${slug} ${compact ? "art-compact" : ""}`}
      aria-label={`${name} animated workflow illustration`}
      role="img"
    >
      <div className="art-grid" />
      <div className="art-orbit art-orbit-one" />
      <div className="art-orbit art-orbit-two" />
      <div className="art-system">
        <div className="art-system-head">
          <span className="art-icon">
            <Icon size={22} />
          </span>
          <span>{name}</span>
          <span className="art-status" />
        </div>
        {["calling", "meloqis"].includes(slug) ? (
          <>
            <div className="art-wave">
              {Array.from({ length: 22 }, (_, i) => (
                <i
                  key={i}
                  style={
                    {
                      "--bar-height": `${16 + ((i * 17) % 55)}px`,
                      "--delay": `${i * 0.08}s`,
                    } as React.CSSProperties
                  }
                />
              ))}
            </div>
            <div className="art-caption">
              <Icon size={14} />
              {slug === "calling" ? "Conversation" : "Your music"}
              <ArrowRight size={14} />
              {slug === "calling" ? "Human handoff" : "Your mood"}
            </div>
          </>
        ) : conversation ? (
          <div className="art-messages">
            <div className="art-message art-message-user">
              Can you help me find the right fit?
            </div>
            <div className="art-message">
              <Icon size={15} />
              <span>Of course. What matters most to you?</span>
            </div>
            <div className="art-typing">
              <i />
              <i />
              <i />
            </div>
          </div>
        ) : workforce ? (
          <>
            <div className="art-team">
              {["Work status", "Attendance", "Activity context"].map(
                (label, i) => (
                  <div key={label}>
                    <span className="art-avatar">
                      <Users size={15} />
                    </span>
                    <span>{label}</span>
                    <div className="art-progress">
                      <i style={{ width: `${82 - i * 19}%` }} />
                    </div>
                    <Check size={13} />
                  </div>
                ),
              )}
            </div>
            <div className="art-caption">
              <ShieldCheck size={14} /> Team-scoped access
            </div>
          </>
        ) : (
          <>
            <div className="art-flow">
              <span>
                <FileText size={22} />
                <small>{slug === "crm" ? "Customer" : "Request"}</small>
              </span>
              <ArrowRight size={16} />
              <span>
                <Workflow size={22} />
                <small>{slug === "elovri" ? "Proposal" : "Route"}</small>
              </span>
              <ArrowRight size={16} />
              <span>
                <CheckCheck size={22} />
                <small>{slug === "elovri" ? "Milestone" : "Resolve"}</small>
              </span>
            </div>
            <div className="art-caption">
              <Calendar size={14} />
              Clear ownership. Visible progress.
            </div>
          </>
        )}
      </div>
      <span className="art-satellite">
        <Icon size={20} />
      </span>
      <span className="art-stamp">
        <Check size={13} />
        {slug === "meloqis" ? "Feel every beat" : "Connected workflow"}
      </span>
    </div>
  );
}
export function ProductGrid({
  items = products,
}: {
  items?: readonly (typeof products)[number][];
}) {
  return (
    <div className="studio-products">
      {items.map((product, i) => (
        <Reveal key={product.slug}>
          <article className="studio-product">
            <Link to={`/projects/${product.slug}`} className="studio-media">
              <ProductVisual slug={product.slug} name={product.name} compact />
            </Link>
            <div className="studio-product-heading">
              <span className="studio-label">{product.category}</span>
              <span className="studio-product-number">
                {String(i + 1).padStart(2, "0")}
              </span>
            </div>
            <h3>
              <Link to={`/projects/${product.slug}`}>
                {product.name}
                <ArrowUpRight size={22} />
              </Link>
            </h3>
            <p>{product.summary}</p>
            <Link className="studio-text-link" to={`/projects/${product.slug}`}>
              Features & workflow
              <ArrowRight size={16} />
            </Link>
          </article>
        </Reveal>
      ))}
    </div>
  );
}
export function Features({ items }: { items: readonly string[] }) {
  return (
    <ul className="studio-feature-list">
      {items.map((item) => (
        <li key={item}>
          <Check size={17} />
          <span>{item}</span>
        </li>
      ))}
    </ul>
  );
}
export function FinalCTA() {
  return (
    <section className="studio-final">
      <div className="studio-wrap">
        <div>
          <p className="studio-label">Your next chapter</p>
          <h2>
            Let's build something
            <br />
            that works for you.
          </h2>
        </div>
        <div>
          <p>
            One business challenge.
            <br />A clear place to start.
          </p>
          <Action />
          <a
            href="https://elovri.axenoraai.in"
            className="studio-text-link"
            target="_blank"
            rel="noreferrer"
          >
            Open your Elvori workspace
            <ExternalLink size={15} />
          </a>
        </div>
      </div>
    </section>
  );
}
