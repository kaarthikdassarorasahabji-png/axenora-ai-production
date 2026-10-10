import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";
import { products } from "@/lib/catalog";
export function Footer() {
  return (
    <footer className="site-footer">
      <div className="studio-wrap">
        <div className="footer-main">
          <div className="footer-brand">
            <Link to="/" className="brand" aria-label="Axenora AI home">
              <img src="/favicon-32x32.png" alt="" />
              <span>Axenora AI</span>
            </Link>
            <p>
              Practical AI.
              <br />
              Thoughtful software.
              <br />
              Better everyday work.
            </p>
            <a href="mailto:contact@axenoraai.in">
              contact@axenoraai.in
              <ArrowUpRight size={16} />
            </a>
            <a href="tel:+917814051678">+91 7814051678</a>
          </div>
          <div>
            <h3>Our ecosystem</h3>
            <div className="footer-product-links">
              {products.map((p) => (
                <Link to={`/projects/${p.slug}`} key={p.slug}>
                  {p.name}
                </Link>
              ))}
            </div>
          </div>
          <div>
            <h3>The studio</h3>
            {[
              ["About us", "/about"],
              ["Our process", "/how-it-works"],
              ["Capabilities", "/features"],
              ["Pricing", "/pricing"],
              ["Contact", "/contact"],
            ].map(([text, to]) => (
              <Link to={to} key={to}>
                {text}
              </Link>
            ))}
            <a
              href="https://elovri.axenoraai.in"
              target="_blank"
              rel="noreferrer"
            >
              Client workspace
              <ArrowUpRight size={12} />
            </a>
          </div>
        </div>
        <div className="footer-wordmark" aria-hidden="true">
          AXENORA<span>AI</span>
        </div>
        <div className="footer-bottom">
          <p>Copyright {new Date().getFullYear()} Axenora AI</p>
          <div>
            <Link to="/privacy">Privacy</Link>
            <Link to="/terms">Terms</Link>
            <Link to="/refund">Refunds</Link>
          </div>
          <span>Built in India. For your business.</span>
        </div>
      </div>
    </footer>
  );
}
