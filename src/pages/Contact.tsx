import { useState } from "react";
import { motion } from "framer-motion";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { API_BASE_URL as API_CONFIG } from "@/lib/api";
import { Mail, MessageCircle, Phone, Send, ShieldCheck } from "lucide-react";
import { toast } from "sonner";
import crmLiveCeo from "@/assets/proof/crm-live-ceo-web.jpg";

const formSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Enter a valid email address"),
  phone: z.string().optional(),
  website: z.string().optional(),
  service: z.string().min(3, "Choose a system type"),
  message: z.string().min(10, "Tell us a little more about the workflow"),
});

type FormValues = z.infer<typeof formSchema>;

const systemTypes = [
  "EmpMetria rollout",
  "CRM dashboard",
  "Employee monitoring",
  "Custom chatbot",
  "WhatsApp automation",
  "Instagram automation",
  "Full business operating system",
];

const ContactPage = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      service: "CRM dashboard",
    },
  });

  const onSubmit = async (values: FormValues) => {
    try {
      setIsSubmitting(true);
      const response = await fetch(`${API_CONFIG}/api/contact`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: values.name,
          email: values.email,
          phone: values.phone || "",
          service: values.service,
          company: "",
          website: values.website || "",
          message: values.message,
        }),
      });

      const data = await response.json();
      if (!response.ok) throw new Error(data.message || "Failed to send message");

      toast.success(data.message || "Message sent successfully.");
      setSubmitted(true);
      reset({ service: "CRM dashboard" });
    } catch (error: any) {
      toast.error(error?.message || "Something went wrong. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Layout>
      <main className="bg-[#f4f0e8] text-[#10151f]">
        <section className="relative overflow-hidden bg-[#10151f] py-24 text-white md:py-32">
          <div className="absolute inset-0">
            <img src={crmLiveCeo} alt="CRM dashboard contact background" className="h-full w-full object-cover opacity-30" />
            <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(16,21,31,0.98),rgba(16,21,31,0.72))]" />
          </div>
          <div className="container-custom relative">
            <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} className="max-w-4xl">
              <p className="text-sm font-semibold uppercase tracking-[0.3em] text-[#a9ffcb]">Contact</p>
              <h1 className="mt-5 text-5xl font-semibold leading-tight md:text-7xl">
                Tell us the workflow. We will map the system.
              </h1>
              <p className="mt-6 max-w-2xl text-lg leading-8 text-white/72">
                Use this form for CRM dashboards, employee monitoring, custom chatbots, WhatsApp automation, Instagram automation or a full operating system.
              </p>
            </motion.div>
          </div>
        </section>

        <section className="container-custom py-24">
          <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr]">
            <aside className="space-y-4">
              {[
                ["Call", "+91 7814051678", Phone, "tel:+917814051678"],
                ["Email", "contact@axenoraai.in", Mail, "mailto:contact@axenoraai.in"],
                ["WhatsApp", "Send a quick brief", MessageCircle, "https://wa.me/917814051678"],
              ].map(([label, value, Icon, href]) => (
                <a key={label as string} href={href as string} target={(href as string).startsWith("http") ? "_blank" : undefined} rel="noopener noreferrer" className="flex items-center gap-4 rounded-md border border-[#10151f]/12 bg-white p-5">
                  <Icon className="h-5 w-5 text-[#1d6f52]" />
                  <span>
                    <span className="block text-xs font-semibold uppercase tracking-[0.2em] text-[#10151f]/46">{label as string}</span>
                    <span className="mt-1 block font-semibold">{value as string}</span>
                  </span>
                </a>
              ))}
              <div className="rounded-md bg-[#10151f] p-6 text-white">
                <ShieldCheck className="h-6 w-6 text-[#a9ffcb]" />
                <h2 className="mt-5 text-2xl font-semibold">What to include</h2>
                <p className="mt-3 text-sm leading-6 text-white/68">
                  Mention the team roles, current tools, repeated tasks, integrations, and what you want monitored or automated.
                </p>
              </div>
            </aside>

            <form onSubmit={handleSubmit(onSubmit)} className="rounded-md border border-[#10151f]/12 bg-white p-6 shadow-[0_18px_70px_rgba(16,21,31,0.08)] md:p-8">
              <input {...register("website")} tabIndex={-1} autoComplete="off" className="hidden" aria-hidden="true" />
              <div className="grid gap-5 md:grid-cols-2">
                <label className="space-y-2">
                  <span className="text-sm font-semibold">Name</span>
                  <Input {...register("name")} placeholder="Your name" />
                  {errors.name && <span className="text-xs text-red-600">{errors.name.message}</span>}
                </label>
                <label className="space-y-2">
                  <span className="text-sm font-semibold">Email</span>
                  <Input type="email" {...register("email")} placeholder="you@company.com" />
                  {errors.email && <span className="text-xs text-red-600">{errors.email.message}</span>}
                </label>
                <label className="space-y-2">
                  <span className="text-sm font-semibold">Phone</span>
                  <Input {...register("phone")} placeholder="+91 90000 00000" />
                </label>
                <label className="space-y-2">
                  <span className="text-sm font-semibold">System type</span>
                  <select {...register("service")} className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm">
                    {systemTypes.map((type) => (
                      <option key={type} value={type}>{type}</option>
                    ))}
                  </select>
                  {errors.service && <span className="text-xs text-red-600">{errors.service.message}</span>}
                </label>
              </div>

              <label className="mt-5 block space-y-2">
                <span className="text-sm font-semibold">Workflow brief</span>
                <Textarea {...register("message")} rows={7} placeholder="Example: We need a CRM with CEO/admin/staff roles, order tracking, employee monitoring, WhatsApp bot and Shopify sync." />
                {errors.message && <span className="text-xs text-red-600">{errors.message.message}</span>}
              </label>

              <Button type="submit" disabled={isSubmitting} className="mt-6 w-full rounded-md bg-[#10151f] text-white hover:bg-[#1d6f52]">
                {isSubmitting ? "Sending..." : <><Send className="mr-2 h-4 w-4" /> Send brief</>}
              </Button>
              {submitted && <p className="mt-4 text-center text-sm font-medium text-[#1d6f52]">Thanks. Your brief has been delivered.</p>}
            </form>
          </div>
        </section>
      </main>
    </Layout>
  );
};

export default ContactPage;
