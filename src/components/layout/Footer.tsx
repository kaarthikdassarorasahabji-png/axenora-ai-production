import { Link } from "react-router-dom";
import { Mail, Phone, MapPin, Linkedin, Twitter, Instagram } from "lucide-react";

const footerLinks = {
  solutions: [
    { name: "EmpMetria", href: "/projects/empmetria" },
    { name: "CRM Dashboards", href: "/projects/crm" },
    { name: "Employee Monitoring", href: "/projects/monitoring" },
    { name: "Office Automation", href: "/projects/office-automation" },
    { name: "Custom Chatbots", href: "/projects/chatbots" },
    { name: "WhatsApp Automation", href: "/projects/whatsapp" },
    { name: "Instagram Automation", href: "/projects/instagram" },
  ],
  company: [
    { name: "About", href: "/about" },
    { name: "How It Works", href: "/how-it-works" },
    { name: "Pricing", href: "/pricing" },
    { name: "Contact", href: "/contact" },
  ],
};

export function Footer() {
  return (
    <footer className="border-t border-white/10 bg-[#0c1413] text-white">
      <div className="container-custom section-padding">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand */}
          <div className="lg:col-span-1">
            <Link to="/" className="mb-6 flex items-center gap-2" aria-label="Axenora AI home">
              <span className="flex h-9 w-9 items-center justify-center rounded-md border border-white/15 bg-white/[0.04]">
                <img src="/favicon-32x32.png" alt="" className="h-6 w-6 object-contain" />
              </span>
              <span className="text-sm font-semibold uppercase tracking-[0.18em]">Axenora AI</span>
            </Link>
            <p className="mb-6 text-sm leading-relaxed text-white/56">
              We design and build serious operating software: workforce products, CRM systems, custom chatbots and commerce automation.
            </p>
            <div className="flex gap-4">
              <a href="https://linkedin.com/in/kaarthikdassarora" target="_blank" rel="noopener noreferrer" className="p-2 rounded-lg bg-secondary/50 hover:bg-primary/20 transition-colors">
                <Linkedin className="w-5 h-5" />
              </a>
              <a href="https://twitter.com/kaarthikdass" target="_blank" rel="noopener noreferrer" className="p-2 rounded-lg bg-secondary/50 hover:bg-primary/20 transition-colors">
                <Twitter className="w-5 h-5" />
              </a>
              <a href="https://instagram.com/kaarthikdassarora" target="_blank" rel="noopener noreferrer" className="p-2 rounded-lg bg-secondary/50 hover:bg-primary/20 transition-colors">
                <Instagram className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Solutions */}
          <div>
            <h4 className="mb-6 font-['Space_Grotesk'] font-semibold">Products and systems</h4>
            <ul className="space-y-3">
              {footerLinks.solutions.map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.href}
                    className="text-sm text-muted-foreground hover:text-primary transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="font-semibold mb-6 font-['Space_Grotesk']">Company</h4>
            <ul className="space-y-3">
              {footerLinks.company.map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.href}
                    className="text-sm text-muted-foreground hover:text-primary transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-semibold mb-6 font-['Space_Grotesk']">Contact</h4>
            <ul className="space-y-4">
              <li>
                <a
                  href="tel:+917814051678"
                  className="flex items-center gap-3 text-sm text-muted-foreground hover:text-primary transition-colors"
                >
                  <Phone className="w-4 h-4" />
                  +91 7814051678
                </a>
              </li>
              <li>
                <a
                  href="mailto:contact@axenoraai.in"
                  className="flex items-center gap-3 text-sm text-muted-foreground hover:text-primary transition-colors"
                >
                  <Mail className="w-4 h-4" />
                  contact@axenoraai.in
                </a>
              </li>
              <li className="flex items-start gap-3 text-sm text-muted-foreground">
                <MapPin className="w-4 h-4 mt-0.5" />
                India
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-border mt-12 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-muted-foreground">
            Copyright {new Date().getFullYear()} Axenora AI. All rights reserved.
          </p>
          <div className="flex gap-6">
            <Link to="/privacy" className="text-sm text-muted-foreground hover:text-primary transition-colors">
              Privacy Policy
            </Link>
            <Link to="/terms" className="text-sm text-muted-foreground hover:text-primary transition-colors">
              Terms of Service
            </Link>
            <Link to="/refund" className="text-sm text-muted-foreground hover:text-primary transition-colors">
              Refund Policy
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
