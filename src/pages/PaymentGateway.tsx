import { Layout } from "@/components/layout/Layout";
import { motion } from "framer-motion";
import { AlertTriangle, Clock, ArrowLeft, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const PaymentGateway = () => {
  return (
    <Layout>
      <section className="min-h-[70vh] flex items-center">
        <div className="container-custom py-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-2xl mx-auto text-center"
          >
            <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-yellow-500/10 text-yellow-400">
              <AlertTriangle className="h-9 w-9" />
            </div>

            <h1 className="mb-4 text-3xl md:text-4xl font-bold font-['Space_Grotesk']">
              Payment Gateway{" "}
              <span className="gradient-text">Under Maintenance</span>
            </h1>

            <p className="mb-6 text-muted-foreground">
              Our online payment system is temporarily unavailable while we
              upgrade to a new, more seamless gateway. You can still reach out
              to our team to get started.
            </p>

            <div className="mx-auto mb-8 inline-flex items-center gap-2 rounded-full bg-card/60 px-4 py-2 text-sm text-muted-foreground border border-border/60">
              <Clock className="h-4 w-4" />
              <span>Payments will be back online soon.</span>
            </div>

            <div className="grid gap-3 sm:grid-cols-2 max-w-xl mx-auto mb-10">
              <Link to="/contact">
                <Button className="btn-primary w-full">
                  Contact Sales
                </Button>
              </Link>

              <a
                href="mailto:contact@axenora.ai"
                className="block"
              >
                <Button
                  variant="outline"
                  className="w-full flex items-center justify-center gap-2"
                >
                  <Mail className="h-4 w-4" />
                  Email Us
                </Button>
              </a>
            </div>

            <Link
              to="/pricing"
              className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              <ArrowLeft className="h-4 w-4" />
              Back to Pricing
            </Link>
          </motion.div>
        </div>
      </section>
    </Layout>
  );
};

export default PaymentGateway;
