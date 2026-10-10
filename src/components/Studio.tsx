import { Link } from "react-router-dom";
import { ArrowUpRight, Check, ExternalLink } from "lucide-react";
import { motion } from "framer-motion";
import { products } from "@/lib/catalog";

export function Reveal({ children }: { children: React.ReactNode }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.08 }}
      transition={{ duration: 0.45 }}
    >
      {children}
    </motion.div>
  );
}
export function Action({
  to = "/contact",
  children = "Discuss your project",
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
      <p className="studio-label">{label}</p>
      <h1>{title}</h1>
      <p className="studio-lead">{text}</p>
    </section>
  );
}
export function ProductGrid() {
  return (
    <div className="studio-products">
      {products.map((product) => (
        <Reveal key={product.slug}>
          <article className="studio-product">
            <Link to={`/projects/${product.slug}`} className="studio-media">
              <img
                src={product.image}
                alt={`${product.name} product overview`}
                loading="lazy"
              />
            </Link>
            <div className="studio-product-heading">
              <span className="studio-label">{product.category}</span>
              <ArrowUpRight size={20} />
            </div>
            <h3>
              <Link to={`/projects/${product.slug}`}>{product.name}</Link>
            </h3>
            <p>{product.summary}</p>
            <Link className="studio-text-link" to={`/projects/${product.slug}`}>
              Explore {product.name}
              <ArrowUpRight size={16} />
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
          <Check size={18} />
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
        <p className="studio-label">Start with one useful change</p>
        <h2>
          What should your business
          <br className="hidden md:block" /> do better?
        </h2>
        <div className="studio-final-actions">
          <Action />
          <a
            href="https://elovri.axenoraai.in"
            className="studio-text-link"
            target="_blank"
            rel="noreferrer"
          >
            Open Elvori
            <ExternalLink size={16} />
          </a>
        </div>
      </div>
    </section>
  );
}
