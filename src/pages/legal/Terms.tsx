import { Layout } from "@/components/layout/Layout";

export default function Terms() {
  return (
    <Layout>
      <div className="container mx-auto px-4 py-20 max-w-4xl">
        <h1 className="text-4xl font-bold mb-8">Terms of Service</h1>
        <div className="prose prose-slate dark:prose-invert max-w-none space-y-6">
          <p className="text-lg text-muted-foreground">Last updated: {new Date().toLocaleDateString()}</p>
          
          <section>
            <h2 className="text-2xl font-semibold mb-4">1. Acceptance of Terms</h2>
            <p>By accessing and using this website and services provided by Axenora AI ("we," "our," or "us"), you accept and agree to be bound by the terms and provision of this agreement.</p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">2. Services Description</h2>
            <p>Axenora AI provides AI-powered solutions including but not limited to website development, chatbots, automated calling systems, and digital marketing services. We reserve the right to modify, suspend, or discontinue any service at any time.</p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">3. User Responsibilities</h2>
            <p>You agree to use our services only for lawful purposes. You are responsible for maintaining the confidentiality of your account credentials and for all activities that occur under your account.</p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">4. Payment and Subscription</h2>
            <p>Services are billed according to the tier selected. Payments are processed securely via Razorpay. Subscriptions automatically renew unless cancelled at least 24 hours before the end of the current period.</p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">5. Intellectual Property</h2>
            <p>All content, features, and functionality of our services are owned by Axenora AI and are protected by international copyright, trademark, and other intellectual property laws.</p>
          </section>

          <section>
             <h2 className="text-2xl font-semibold mb-4">6. Contact Us</h2>
             <p>If you have any questions about these Terms, please contact us at contact@axenoraai.in.</p>
          </section>
        </div>
      </div>
    </Layout>
  );
}
