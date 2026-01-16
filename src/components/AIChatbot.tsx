import { Bot, X, Send, Minimize2 } from "lucide-react";
import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "./ui/button";

interface Message {
  id: string;
  text: string;
  sender: "user" | "bot";
  timestamp: Date;
}

const KNOWLEDGE_BASE = {
  services: {
    chatbots: "We create intelligent AI chatbots that handle customer queries 24/7, reducing response time by 90% and increasing customer satisfaction.",
    whatsapp: "WhatsApp automation enables automated responses, lead capture, appointment booking, and customer support directly through WhatsApp Business API.",
    calling: "AI calling agents can make and receive calls, schedule appointments, qualify leads, and provide customer support with natural conversation.",
    website: "We build AI-powered websites with smart forms, personalized content, automated lead capture, and seamless user experiences.",
    ads: "AI-driven ad campaigns with smart targeting, budget optimization, and automated A/B testing to maximize your ROI.",
  },
  pricing: {
    starter: "₹14,999/month - 1 AI Chatbot, WhatsApp Integration, 500 Conversations/month, Email Support",
    growth: "₹29,999/month - 3 AI Chatbots, WhatsApp + Website, 2000 Conversations, AI Calling (100 mins), Priority Support",
    scale: "₹59,999/month - Unlimited Chatbots, All Integrations, 10000 Conversations, AI Calling (500 mins), Account Manager",
    enterprise: "Custom pricing - Everything in Scale + Custom AI Development + Unlimited Usage + SLA Guarantee",
  },
  company: {
    founder: "Kaarthik Dass Arora",
    mission: "Axenora AI transforms businesses with cutting-edge AI automation, helping companies scale revenue, save time, and boost conversions.",
    contact: "+91 7814051678",
    email: "contact@axenora.ai",
  },
};

const generateBotResponse = (userMessage: string): string => {
  const msg = userMessage.toLowerCase();

  if (msg.includes("hello") || msg.includes("hi") || msg.includes("hey")) {
    return `👋 Hello! I'm Axenora AI Assistant. I can help you with:\n\n✨ AI Solutions (Chatbots, WhatsApp, Calling, Ads, Websites)\n💰 Pricing & Plans\n📞 Booking a Demo\n\nWhat would you like to know?`;
  }

  if (msg.includes("chatbot") || msg.includes("bot")) {
    return `🤖 ${KNOWLEDGE_BASE.services.chatbots}\n\nWant to see how it works? Book a demo: +91 7814051678`;
  }

  if (msg.includes("whatsapp") || msg.includes("wa")) {
    return `💬 ${KNOWLEDGE_BASE.services.whatsapp}\n\nInterested? Let's chat: wa.me/917814051678`;
  }

  if (msg.includes("call") || msg.includes("phone") || msg.includes("voice")) {
    return `📞 ${KNOWLEDGE_BASE.services.calling}\n\nSchedule a live demo call with our team!`;
  }

  if (msg.includes("website") || msg.includes("web")) {
    return `🌐 ${KNOWLEDGE_BASE.services.website}\n\nSee examples and get a quote!`;
  }

  if (msg.includes("ad") || msg.includes("marketing") || msg.includes("campaign")) {
    return `📢 ${KNOWLEDGE_BASE.services.ads}\n\nLet's discuss your marketing goals!`;
  }

  if (msg.includes("price") || msg.includes("pricing") || msg.includes("cost") || msg.includes("plan")) {
    return `💰 **Our Pricing Plans:**\n\n📦 Starter: ${KNOWLEDGE_BASE.pricing.starter}\n\n🚀 Growth: ${KNOWLEDGE_BASE.pricing.growth}\n\n⚡ Scale: ${KNOWLEDGE_BASE.pricing.scale}\n\n🏢 Enterprise: ${KNOWLEDGE_BASE.pricing.enterprise}\n\nWhich plan interests you?`;
  }

  if (msg.includes("demo") || msg.includes("trial") || msg.includes("book")) {
    return `📅 Book a FREE demo now!\n\n📞 Call: ${KNOWLEDGE_BASE.company.contact}\n💬 WhatsApp: wa.me/917814051678\n✉️ Email: ${KNOWLEDGE_BASE.company.email}\n\nOur team will respond within minutes!`;
  }

  if (msg.includes("founder") || msg.includes("owner") || msg.includes("ceo")) {
    return `👔 Axenora AI was founded by **${KNOWLEDGE_BASE.company.founder}**, a visionary entrepreneur passionate about AI-driven business transformation.`;
  }

  if (msg.includes("contact") || msg.includes("reach") || msg.includes("email")) {
    return `📞 Contact Us:\n\n📱 Phone/WhatsApp: ${KNOWLEDGE_BASE.company.contact}\n✉️ Email: ${KNOWLEDGE_BASE.company.email}\n\nWe're available 24/7 to help you!`;
  }

  if (msg.includes("thank") || msg.includes("thanks")) {
    return `😊 You're welcome! Is there anything else I can help you with?`;
  }

  return `🤔 I'm here to help! You can ask me about:\n\n• AI Chatbots & WhatsApp Automation\n• AI Calling Agents\n• Website Development\n• Pricing & Plans\n• Booking a Demo\n\nOr contact us directly at ${KNOWLEDGE_BASE.company.contact}`;
};

export function AIChatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      text: "👋 Hi! I'm Axenora AI Assistant. I can help you learn about our AI solutions, pricing, and book a demo. What would you like to know?",
      sender: "bot",
      timestamp: new Date(),
    },
  ]);
  const [inputValue, setInputValue] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = () => {
    if (!inputValue.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: inputValue,
      sender: "user",
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputValue("");

    setTimeout(() => {
      const botResponse: Message = {
        id: (Date.now() + 1).toString(),
        text: generateBotResponse(inputValue),
        sender: "bot",
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, botResponse]);
    }, 800);
  };

  return (
    <>
      {/* AI Chatbot Button */}
      <motion.div
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 2.2, type: "spring" }}
        className="fixed bottom-6 right-24 z-50"
      >
        <button
          onClick={() => {
            setIsOpen(!isOpen);
            setIsMinimized(false);
          }}
          className="flex items-center justify-center w-14 h-14 rounded-full bg-gradient-to-r from-primary to-accent text-white shadow-lg hover:scale-110 transition-transform duration-200"
          aria-label="AI Assistant"
        >
          {isOpen ? <X className="w-6 h-6" /> : <Bot className="w-6 h-6" />}
        </button>
      </motion.div>

      {/* Chatbot Window */}
      <AnimatePresence>
        {isOpen && !isMinimized && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            className="fixed bottom-24 right-24 w-96 h-[32rem] bg-card border border-border rounded-2xl shadow-2xl overflow-hidden z-50 flex flex-col"
          >
            {/* Header */}
            <div className="bg-gradient-to-r from-primary to-accent p-4 text-white flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center">
                  <Bot className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-bold">AI Assistant</h3>
                  <p className="text-xs opacity-90">Always online</p>
                </div>
              </div>
              <button
                onClick={() => setIsMinimized(true)}
                className="hover:bg-white/20 p-1 rounded"
              >
                <Minimize2 className="w-4 h-4" />
              </button>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-background">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex ${message.sender === "user" ? "justify-end" : "justify-start"}`}
                >
                  <div
                    className={`max-w-[75%] rounded-2xl p-3 ${
                      message.sender === "user"
                        ? "bg-gradient-to-r from-primary to-accent text-white"
                        : "bg-card border border-border"
                    }`}
                  >
                    <p className="text-sm whitespace-pre-line">{message.text}</p>
                    <span className="text-xs opacity-70 mt-1 block">
                      {message.timestamp.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                    </span>
                  </div>
                </div>
              ))}
              <div ref={messagesEndRef} />
            </div>

            {/* Input */}
            <div className="p-4 border-t border-border bg-card">
              <div className="flex gap-2">
                <input
                  type="text"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyPress={(e) => e.key === "Enter" && handleSend()}
                  placeholder="Type your message..."
                  className="flex-1 px-4 py-2 rounded-xl bg-background border border-border focus:outline-none focus:ring-2 focus:ring-primary"
                />
                <Button
                  onClick={handleSend}
                  className="bg-gradient-to-r from-primary to-accent"
                  size="icon"
                >
                  <Send className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}