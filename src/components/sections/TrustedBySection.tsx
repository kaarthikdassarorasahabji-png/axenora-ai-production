import { motion } from "framer-motion";

const companies = [
  "TechCorp",
  "Innovate Inc",
  "FutureLabs",
  "GrowthCo",
  "ScaleUp",
  "NextGen",
];

export function TrustedBySection() {
  return (
    <section className="py-16 border-y border-border/50">
      <div className="container-custom">
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center text-sm text-muted-foreground mb-8"
        >
          TRUSTED BY MODERN BUSINESSES
        </motion.p>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="flex flex-wrap justify-center items-center gap-8 md:gap-16"
        >
          {companies.map((company, index) => (
            <motion.div
              key={company}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="text-xl md:text-2xl font-bold text-muted-foreground/50 hover:text-muted-foreground transition-colors font-['Space_Grotesk']"
            >
              {company}
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
