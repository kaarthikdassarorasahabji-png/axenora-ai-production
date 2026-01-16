import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import heroBg from "@/assets/hero-bg.jpg";

interface CTASectionProps {
  title?: string;
  subtitle?: string;
  primaryCTA?: string;
  primaryHref?: string;
  secondaryCTA?: string;
  secondaryHref?: string;
}

export function CTASection({
  title = "Ready to Automate Your Business?",
  subtitle = "Join hundreds of businesses using Axenora AI to automate growth, engagement, and operations.",
  primaryCTA = "Book Demo",
  primaryHref = "/contact",
  secondaryCTA = "View Pricing",
  secondaryHref = "/pricing",
}: CTASectionProps) {
  return (
    <section className="section-padding relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 z-0" data-parallax="-0.15">
        <img
          src={heroBg}
          alt="CTA Background"
          className="w-full h-full object-cover opacity-30"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/80 to-background/60" />
      </div>

      <div className="container-custom relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-3xl mx-auto text-center"
        >
          <h2 className="text-3xl md:text-5xl font-bold mb-6 font-['Space_Grotesk']">
            {title.split(" ").slice(0, -2).join(" ")}{" "}
            <span className="gradient-text">
              {title.split(" ").slice(-2).join(" ")}
            </span>
          </h2>
          <p className="text-lg text-muted-foreground mb-8">
            {subtitle}
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link to={primaryHref}>
              <Button className="btn-primary text-base px-8 py-4">
                {primaryCTA}
                <ArrowRight className="w-5 h-5" />
              </Button>
            </Link>
            <Link to={secondaryHref}>
              <Button variant="outline" className="btn-secondary text-base px-8 py-4">
                {secondaryCTA}
              </Button>
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
