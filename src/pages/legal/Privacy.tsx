import { Layout } from "@/components/layout/Layout";

export default function Privacy() {
  return (
    <Layout>
      <div className="container mx-auto px-4 py-20 max-w-4xl">
        <h1 className="text-4xl font-bold mb-8">Privacy Policy</h1>
        <div className="prose prose-slate dark:prose-invert max-w-none space-y-6">
          <p className="text-lg text-muted-foreground">Last updated: {new Date().toLocaleDateString()}</p>
          
          <section>
            <h2 className="text-2xl font-semibold mb-4">1. Information We Collect</h2>
            <p>We collect information you provide directly to us, including name, email address, phone number, and payment information when you purchase our services.</p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">2. How We Use Your Information</h2>
            <p>We use the information we collect to provide, maintain, and improve our services, to process your transactions, and to communicate with you about updates and offers.</p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">3. Data Security</h2>
            <p>We implement appropriate technical and organizational measures to protect your personal data against unauthorized access, alteration, disclosure, or destruction.</p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">4. Cookies</h2>
            <p>We use cookies and similar tracking technologies to track the activity on our service and hold certain information to improve your experience.</p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">5. Third-Party Services</h2>
            <p>We may employ third-party companies (such as payment processors like Razorpay) to facilitate our service. These third parties have access to your personal data only to perform these tasks on our behalf.</p>
          </section>

          <section>
             <h2 className="text-2xl font-semibold mb-4">6. Contact Us</h2>
             <p>For any privacy-related concerns, please contact our Data Protection Officer at contact@axenoraai.in.</p>
          </section>
        </div>
      </div>
    </Layout>
  );
}
