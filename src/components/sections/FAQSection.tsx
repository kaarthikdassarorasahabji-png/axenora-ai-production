import { motion } from "framer-motion";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqs = [
  {
    question: "How long does it take to implement Axenora AI solutions?",
    answer: "Most implementations are completed within 1-2 weeks. Simple chatbot integrations can be live within 48 hours, while more complex automation systems may take 2-4 weeks depending on your requirements.",
  },
  {
    question: "Do I need technical knowledge to use Axenora AI?",
    answer: "No technical knowledge is required. Our team handles all the technical implementation, and you'll have access to an intuitive dashboard to monitor performance. We also provide training and ongoing support.",
  },
  {
    question: "Can I integrate Axenora AI with my existing tools?",
    answer: "Absolutely! We integrate seamlessly with popular CRMs (Salesforce, HubSpot, Zoho), communication tools (WhatsApp, Slack), payment systems, and most business software through APIs.",
  },
  {
    question: "What happens if the AI can't handle a customer query?",
    answer: "Our AI is designed to seamlessly escalate complex queries to human agents. You'll receive notifications for escalations, and the AI provides context so your team can respond effectively.",
  },
  {
    question: "Is my data secure with Axenora AI?",
    answer: "Yes, security is our top priority. We use bank-level encryption, comply with GDPR and other data protection regulations, and never share your data with third parties.",
  },
  {
    question: "Can I customize the AI's voice and personality?",
    answer: "Yes! For both chatbots and calling agents, you can customize the tone, personality, language, and even create custom scripts that match your brand voice perfectly.",
  },
  {
    question: "What's included in the pricing plans?",
    answer: "Each plan includes the core AI features, integrations, analytics dashboard, and support. Higher tiers include more conversation limits, advanced features, and dedicated account management.",
  },
  {
    question: "Do you offer a free trial?",
    answer: "Yes, we offer a 14-day free trial for new customers. You can experience the full capabilities of our platform before committing to a plan.",
  },
];

export function FAQSection() {
  return (
    <section className="section-padding bg-card/30">
      <div className="container-custom">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="text-sm font-medium text-primary uppercase tracking-wider">
            FAQ
          </span>
          <h2 className="text-3xl md:text-5xl font-bold mt-4 mb-6 font-['Space_Grotesk']">
            Frequently Asked <span className="gradient-text">Questions</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Everything you need to know about Axenora AI and our services.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="max-w-3xl mx-auto"
        >
          <Accordion type="single" collapsible className="space-y-4">
            {faqs.map((faq, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05 }}
              >
                <AccordionItem
                  value={`item-${index}`}
                  className="border border-border rounded-xl px-6 bg-card/50 hover:border-primary/30 transition-colors data-[state=open]:border-primary/50 data-[state=open]:glow-sm"
                >
                  <AccordionTrigger className="text-left font-semibold hover:no-underline hover:text-primary transition-colors py-5">
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground pb-5">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              </motion.div>
            ))}
          </Accordion>
        </motion.div>
      </div>
    </section>
  );
}
