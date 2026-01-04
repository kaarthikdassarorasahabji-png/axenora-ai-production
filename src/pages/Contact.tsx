import { useState } from "react";
import { motion } from "framer-motion";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "sonner";
import {
  Mail,
  Phone,
  MapPin,
  Send,
  MessageSquare,
  Linkedin,
  Github,
  Twitter,
  Instagram,
  Bot,
  Mic,
} from "lucide-react";

const formSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Enter a valid email address"),
  subject: z.string().min(4, "Subject must be at least 4 characters"),
  message: z.string().min(10, "Message must be at least 10 characters"),
  contactMethod: z.enum(["email", "phone", "whatsapp"]),
  phone: z
    .string()
    .regex(/^\+?[0-9\s-]+$/, "Enter a valid phone number")
    .optional(),
});

type FormValues = z.infer<typeof formSchema>;

const contactDetails = [
  {
    title: "Email",
    value: "kaarthikdassarorasahabji@gmail.com",
    description: "I'll respond within 24 hours",
    icon: Mail,
    href: "mailto:kaarthikdassarorasahabji@gmail.com",
  },
  {
    title: "Phone / WhatsApp",
    value: "+91 7814051678",
    description: "Available 9 AM – 6 PM IST",
    icon: Phone,
    href: "https://wa.me/917814051678",
  },
  {
    title: "Location",
    value: "Ludhiana, Punjab, India",
    description: "Open to remote collaborations",
    icon: MapPin,
  },
];

const socialLinks = [
  { label: "LinkedIn", icon: Linkedin, href: "https://linkedin.com/in/kaarthikdassarora" },
  { label: "GitHub", icon: Github, href: "https://github.com/kaarthikdass" },
  { label: "Instagram", icon: Instagram, href: "https://instagram.com/kaarthikdassarora" },
  { label: "Twitter", icon: Twitter, href: "https://twitter.com/kaarthikdass" },
];

type ChatMessage = {
  role: "ai" | "user";
  text: string;
};

const ContactPage = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [chatInput, setChatInput] = useState("");
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([
    { role: "ai", text: "Hey! I’m the Axenora AI assistant. How can I help today?" },
  ]);

  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: zodResolver(
      formSchema.refine(
        (data) =>
          data.contactMethod === "email" ||
          (data.phone && data.phone.trim().length >= 10),
        {
          message: "Phone number is required for phone or WhatsApp",
          path: ["phone"],
        },
      ),
    ),
    defaultValues: {
      contactMethod: "email",
    },
  });

  const contactMethod = watch("contactMethod");

  const onSubmit = async (values: FormValues) => {
    try {
      setIsSubmitting(true);
      await new Promise((resolve) => setTimeout(resolve, 1200));
      toast.success("Message sent successfully!");
      setSubmitted(true);
      reset({ contactMethod: "email" });
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChatSend = () => {
    if (!chatInput.trim()) return;
    setChatMessages((prev) => [...prev, { role: "user", text: chatInput }]);
    setChatInput("");
    setTimeout(() => {
      setChatMessages((prev) => [
        ...prev,
        {
          role: "ai",
          text: "Great! I’ve shared this with Kaarthik and will follow up shortly.",
        },
      ]);
    }, 500);
  };

  return (
    <Layout>
      <div className="min-h-screen bg-gradient-to-b from-background via-background to-muted/20">
        <section className="container mx-auto px-4 py-20">
          <div className="max-w-5xl mx-auto text-center mb-16">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <div className="flex flex-wrap items-center justify-center gap-2 mb-4">
                <p className="inline-flex items-center px-4 py-1 text-sm font-medium rounded-full bg-primary/10 text-primary">
                  Let&apos;s build something great
                </p>
                <p className="inline-flex items-center gap-2 px-4 py-1 text-xs font-semibold rounded-full bg-secondary/50 text-secondary-foreground border border-dashed border-primary/50">
                  <Mic className="w-3.5 h-3.5" />
                  AI voice bot for websites launching soon
                </p>
              </div>
              <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">
                Get in touch with <span className="text-primary">Kaarthik</span>
              </h1>
              <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
                Whether it’s a product idea, collaboration request, or just a hello,
                I’d love to hear from you. Use the form, hop on the chatbot, and stay tuned for the embedded voice bot experience rolling out next.
              </p>
            </motion.div>
          </div>

          <div className="grid lg:grid-cols-5 gap-8">
            <motion.div
              className="lg:col-span-2 space-y-6"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
            >
              {contactDetails.map((detail) => (
                <Card key={detail.title} className="border border-border/50">
                  <CardContent className="flex items-start gap-4 p-6">
                    <div className="w-12 h-12 rounded-lg bg-primary/10 text-primary flex items-center justify-center">
                      <detail.icon className="w-6 h-6" />
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">{detail.title}</p>
                      {detail.href ? (
                        <a
                          href={detail.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="block font-semibold text-lg hover:underline mt-1"
                        >
                          {detail.value}
                        </a>
                      ) : (
                        <p className="font-semibold text-lg mt-1">{detail.value}</p>
                      )}
                      <p className="text-sm text-muted-foreground mt-1">
                        {detail.description}
                      </p>
                    </div>
                  </CardContent>
                </Card>
              ))}

              <Card className="border border-border/50">
                <CardHeader>
                  <CardTitle className="text-base">Connect on social</CardTitle>
                </CardHeader>
                <CardContent className="flex flex-wrap gap-3">
                  {socialLinks.map((link) => (
                    <Button key={link.label} variant="outline" size="sm" asChild>
                      <a href={link.href} target="_blank" rel="noopener noreferrer">
                        <link.icon className="w-4 h-4 mr-2" />
                        {link.label}
                      </a>
                    </Button>
                  ))}
                </CardContent>
              </Card>

              <Card className="border border-border/50">
                <CardHeader className="flex flex-col gap-2">
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs w-fit">
                    <Bot className="w-3.5 h-3.5" />
                    Axenora chatbot is live
                  </div>
                  <CardTitle className="text-lg">Chat with the AI assistant</CardTitle>
                  <p className="text-sm text-muted-foreground">
                    Get instant answers or leave a quick brief. Voice bot support will join this widget soon.
                  </p>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="h-56 rounded-xl border border-border/60 bg-background/70 p-3 overflow-y-auto space-y-3 text-sm">
                    {chatMessages.map((message, index) => (
                      <div
                        key={`${message.role}-${index}`}
                        className={`flex ${message.role === "ai" ? "justify-start" : "justify-end"}`}
                      >
                        <div
                          className={`px-3 py-2 rounded-2xl max-w-[80%] ${
                            message.role === "ai" ? "bg-secondary/40" : "bg-primary text-white"
                          }`}
                        >
                          {message.text}
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="flex gap-2">
                    <Input
                      placeholder="Ask something..."
                      value={chatInput}
                      onChange={(event) => setChatInput(event.target.value)}
                      onKeyDown={(event) => {
                        if (event.key === "Enter") {
                          event.preventDefault();
                          handleChatSend();
                        }
                      }}
                    />
                    <Button type="button" onClick={handleChatSend}>
                      Send
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div
              className="lg:col-span-3"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              <Card className="shadow-xl">
                <CardHeader>
                  <CardTitle>Send a message</CardTitle>
                  <p className="text-sm text-muted-foreground">
                    I typically reply within one business day.
                  </p>
                </CardHeader>
                <CardContent>
                  <form className="space-y-5" onSubmit={handleSubmit(onSubmit)}>
                    <div className="space-y-1">
                      <label htmlFor="name" className="text-sm font-medium">
                        Full name
                      </label>
                      <Input id="name" placeholder="Jane Doe" {...register("name")} />
                      {errors.name && (
                        <p className="text-xs text-destructive">{errors.name.message}</p>
                      )}
                    </div>

                    <div className="space-y-1">
                      <label htmlFor="email" className="text-sm font-medium">
                        Email address
                      </label>
                      <Input
                        id="email"
                        type="email"
                        placeholder="you@example.com"
                        {...register("email")}
                      />
                      {errors.email && (
                        <p className="text-xs text-destructive">{errors.email.message}</p>
                      )}
                    </div>

                    <div className="space-y-1">
                      <label htmlFor="subject" className="text-sm font-medium">
                        Subject
                      </label>
                      <Input
                        id="subject"
                        placeholder="Project idea or question"
                        {...register("subject")}
                      />
                      {errors.subject && (
                        <p className="text-xs text-destructive">
                          {errors.subject.message}
                        </p>
                      )}
                    </div>

                    <div className="space-y-2">
                      <p className="text-sm font-medium">Preferred contact method</p>
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                        {["email", "phone", "whatsapp"].map((method) => (
                          <label
                            key={method}
                            className={`flex items-center justify-between rounded-md border px-3 py-2 text-sm capitalize cursor-pointer ${
                              contactMethod === method
                                ? "border-primary bg-primary/5"
                                : "border-border"
                            }`}
                          >
                            <span>{method}</span>
                            <input
                              type="radio"
                              className="sr-only"
                              value={method}
                              {...register("contactMethod")}
                            />
                          </label>
                        ))}
                      </div>
                    </div>

                    {(contactMethod === "phone" || contactMethod === "whatsapp") && (
                      <div className="space-y-1">
                        <label htmlFor="phone" className="text-sm font-medium">
                          Phone / WhatsApp number
                        </label>
                        <Input
                          id="phone"
                          placeholder="+91 90000 00000"
                          {...register("phone")}
                        />
                        {errors.phone && (
                          <p className="text-xs text-destructive">{errors.phone.message}</p>
                        )}
                      </div>
                    )}

                    <div className="space-y-1">
                      <label htmlFor="message" className="text-sm font-medium">
                        Message
                      </label>
                      <Textarea
                        id="message"
                        rows={6}
                        placeholder="Tell me about your project, timelines, and goals..."
                        {...register("message")}
                      />
                      {errors.message && (
                        <p className="text-xs text-destructive">{errors.message.message}</p>
                      )}
                    </div>

                    <Button
                      type="submit"
                      className="w-full"
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? (
                        "Sending..."
                      ) : (
                        <>
                          <Send className="w-4 h-4 mr-2" />
                          Send message
                        </>
                      )}
                    </Button>

                    {submitted && (
                      <p className="text-sm text-center text-green-600">
                        Thanks! Your message has been delivered.
                      </p>
                    )}
                  </form>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </section>
      </div>
    </Layout>
  );
};

export default ContactPage;
