import { Layout } from "@/components/layout/Layout";

export default function Refund() {
  return (
    <Layout>
      <div className="container mx-auto px-4 py-20 max-w-4xl">
        <h1 className="text-4xl font-bold mb-8">Refund Policy</h1>
        <div className="prose prose-slate dark:prose-invert max-w-none space-y-6">
          <p className="text-lg text-muted-foreground">Last updated: {new Date().toLocaleDateString()}</p>
          
          <section>
            <h2 className="text-2xl font-semibold mb-4">1. Satisfaction Guarantee</h2>
            <p>We strive to provide the highest quality AI solutions. If you are not satisfied with our service within the first 7 days of your purchase, please contact us for a resolution.</p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">2. Eligibility for Refunds</h2>
            <ul className="list-disc pl-5 space-y-2">
                <li>Refund requests must be made within 7 days of the original purchase date.</li>
                <li>Services that have been fully delivered and approved by the client are not eligible for a full refund.</li>
                <li>Custom development work is non-refundable once development has commenced.</li>
                <li>Subscription renewals are non-refundable unless cancelled prior to the renewal date.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">3. Processing Time</h2>
            <p>Approved refunds will be processed within 5-7 business days and credited back to the original payment method used for the purchase.</p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">4. Cancellations</h2>
            <p>You may cancel your subscription at any time. Your access will continue until the end of the current billing cycle, after which no further charges will be applied.</p>
          </section>

          <section>
             <h2 className="text-2xl font-semibold mb-4">5. Contact Us</h2>
             <p>To request a refund or cancellation, please email our billing department at contact@axenoraai.in with your order details.</p>
          </section>
        </div>
      </div>
    </Layout>
  );
}
