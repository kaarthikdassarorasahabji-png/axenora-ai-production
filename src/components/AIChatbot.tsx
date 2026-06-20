import { FormEvent, useEffect, useMemo, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowUpRight, Bot, Check, LoaderCircle, Minimize2, Send, ShieldCheck } from "lucide-react";
import { API_BASE_URL } from "@/lib/api";

type Role = "user" | "assistant";

interface ChatMessage {
  id: string;
  role: Role;
  content: string;
  createdAt: number;
}

interface ChatResponse {
  success: boolean;
  reply?: string;
  leadIntent?: boolean;
  topic?: string;
  message?: string;
}

const STORAGE_KEY = "axenora-chat-v2";
const SESSION_KEY = "axenora-chat-session";
const greeting: ChatMessage = {
  id: "welcome",
  role: "assistant",
  content: "Hello. Tell me what you want to improve, and I’ll recommend the right Axenora system and explain how it would work for your business.",
  createdAt: Date.now(),
};

const quickPrompts = ["Monitor a remote team", "Build a CRM", "Automate office work", "Create a sales chatbot"];

function getSessionId() {
  const existing = localStorage.getItem(SESSION_KEY);
  if (existing) return existing;
  const next = crypto.randomUUID();
  localStorage.setItem(SESSION_KEY, next);
  return next;
}

function readMessages(): ChatMessage[] {
  try {
    const value = JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]") as ChatMessage[];
    return Array.isArray(value) && value.length ? value.slice(-20) : [greeting];
  } catch {
    return [greeting];
  }
}

export function AIChatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>(readMessages);
  const [input, setInput] = useState("");
  const [isThinking, setIsThinking] = useState(false);
  const [leadIntent, setLeadIntent] = useState(false);
  const [topic, setTopic] = useState("General enquiry");
  const [leadStatus, setLeadStatus] = useState<"idle" | "sending" | "sent">("idle");
  const [leadError, setLeadError] = useState("");
  const endRef = useRef<HTMLDivElement>(null);
  const sessionId = useMemo(getSessionId, []);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(messages.slice(-20)));
    endRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, leadIntent, leadStatus]);

  async function sendMessage(text: string) {
    const clean = text.trim();
    if (!clean || isThinking) return;
    const userMessage: ChatMessage = { id: crypto.randomUUID(), role: "user", content: clean, createdAt: Date.now() };
    const nextMessages = [...messages, userMessage].slice(-10);
    setMessages((current) => [...current, userMessage]);
    setInput("");
    setIsThinking(true);

    try {
      const response = await fetch(`${API_BASE_URL}/api/chat`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: nextMessages.map(({ role, content }) => ({ role, content })) }),
      });
      const data = (await response.json()) as ChatResponse;
      if (!response.ok || !data.reply) throw new Error(data.message || "Assistant unavailable");
      setMessages((current) => [...current, { id: crypto.randomUUID(), role: "assistant", content: data.reply!, createdAt: Date.now() }]);
      setTopic(data.topic || "General enquiry");
      if (data.leadIntent) setLeadIntent(true);
    } catch {
      setMessages((current) => [...current, {
        id: crypto.randomUUID(),
        role: "assistant",
        content: "I’m briefly unable to reach the product assistant. Please try again in a moment, or use the project pages below to explore Axenora’s systems.",
        createdAt: Date.now(),
      }]);
    } finally {
      setIsThinking(false);
    }
  }

  async function submitLead(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLeadStatus("sending");
    setLeadError("");
    const form = new FormData(event.currentTarget);
    const summary = messages.slice(-6).map((message) => `${message.role}: ${message.content}`).join("\n");
    try {
      const response = await fetch(`${API_BASE_URL}/api/chat/lead`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: form.get("name"), phone: form.get("phone"), email: form.get("email"), website: form.get("website"),
          consent: form.get("consent") === "on" ? "true" : "false",
          interest: topic, summary, page: window.location.href, sessionId,
        }),
      });
      const data = (await response.json()) as ChatResponse;
      if (!response.ok) throw new Error(data.message || "Unable to save details");
      setLeadStatus("sent");
    } catch (error) {
      setLeadStatus("idle");
      setLeadError(error instanceof Error ? error.message : "Unable to save details");
    }
  }

  return (
    <>
      <AnimatePresence>
        {!isOpen && (
          <motion.button
            initial={{ scale: 0, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.85, opacity: 0 }} transition={{ type: "spring" }}
            onClick={() => setIsOpen(true)}
            className="fixed bottom-4 right-20 z-50 flex h-14 w-14 items-center justify-center rounded-full border border-white/15 bg-[#0c1413] text-[#bdf6d2] shadow-xl transition-transform hover:scale-105 sm:bottom-6 sm:right-24"
            aria-label="Open AI assistant"
          >
            <Bot className="h-5 w-5" />
          </motion.button>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {isOpen && (
          <motion.aside
            initial={{ opacity: 0, y: 18, scale: 0.97 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: 18, scale: 0.97 }}
            className="fixed bottom-20 right-3 z-50 flex h-[min(76svh,42rem)] w-[calc(100vw-1.5rem)] max-w-[25rem] flex-col overflow-hidden rounded-md border border-white/10 bg-[#0c1413] text-white shadow-2xl sm:bottom-24 sm:right-24"
            aria-label="Axenora AI assistant"
          >
            <header className="flex items-center justify-between border-b border-white/10 px-4 py-3">
              <div className="flex min-w-0 items-center gap-3">
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-md bg-[#bdf6d2] text-[#0c1413]"><Bot className="h-5 w-5" /></span>
                <div className="min-w-0"><h2 className="truncate text-sm font-semibold">Axenora product advisor</h2><p className="flex items-center gap-1.5 text-xs text-white/55"><span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />LLM assistant</p></div>
              </div>
              <button onClick={() => setIsOpen(false)} className="p-2 text-white/60 hover:text-white" aria-label="Minimize assistant"><Minimize2 className="h-4 w-4" /></button>
            </header>

            <div className="flex-1 space-y-4 overflow-y-auto px-4 py-4">
              {messages.map((message) => (
                <div key={message.id} className={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`}>
                  <div className={`max-w-[88%] rounded-md px-3 py-2.5 text-sm leading-6 ${message.role === "user" ? "bg-[#bdf6d2] text-[#0c1413]" : "border border-white/10 bg-white/[0.06] text-white/82"}`}>
                    <p className="whitespace-pre-wrap">{message.content}</p>
                  </div>
                </div>
              ))}
              {messages.length === 1 && <div className="grid grid-cols-2 gap-2">{quickPrompts.map((prompt) => <button key={prompt} onClick={() => sendMessage(prompt)} className="min-h-12 rounded-md border border-white/10 px-3 text-left text-xs leading-4 text-white/68 hover:border-[#bdf6d2]/50 hover:text-white">{prompt}</button>)}</div>}
              {isThinking && <div className="flex items-center gap-2 text-xs text-white/55"><LoaderCircle className="h-4 w-4 animate-spin text-[#bdf6d2]" />Thinking with your context</div>}

              {leadIntent && leadStatus !== "sent" && (
                <form onSubmit={submitLead} className="space-y-3 rounded-md border border-[#bdf6d2]/25 bg-[#bdf6d2]/[0.07] p-4">
                  <div><p className="text-sm font-semibold">Request a callback</p><p className="mt-1 text-xs leading-5 text-white/58">With your permission, we’ll store these details and email them to the Axenora team.</p></div>
                  <div className="grid grid-cols-2 gap-2"><input name="name" required minLength={2} placeholder="Name" aria-label="Name" className="min-w-0 rounded-md border border-white/12 bg-black/20 px-3 py-2 text-sm outline-none focus:border-[#bdf6d2]" /><input name="phone" required inputMode="tel" placeholder="Phone" aria-label="Phone number" className="min-w-0 rounded-md border border-white/12 bg-black/20 px-3 py-2 text-sm outline-none focus:border-[#bdf6d2]" /></div>
                  <input name="email" type="email" placeholder="Email (optional)" aria-label="Email address" className="w-full rounded-md border border-white/12 bg-black/20 px-3 py-2 text-sm outline-none focus:border-[#bdf6d2]" />
                  <input name="website" className="hidden" tabIndex={-1} autoComplete="off" aria-hidden="true" />
                  <label className="flex items-start gap-2 text-xs leading-5 text-white/65"><input name="consent" required type="checkbox" className="mt-1 accent-[#bdf6d2]" />I agree to be contacted about this enquiry.</label>
                  {leadError && <p className="text-xs text-red-300">{leadError}</p>}
                  <button disabled={leadStatus === "sending"} className="flex h-10 w-full items-center justify-center gap-2 rounded-md bg-[#bdf6d2] text-sm font-semibold text-[#0c1413] disabled:opacity-60">{leadStatus === "sending" ? <LoaderCircle className="h-4 w-4 animate-spin" /> : <Send className="h-4 w-4" />} Send details</button>
                </form>
              )}
              {leadStatus === "sent" && <div className="flex gap-3 rounded-md border border-emerald-300/20 bg-emerald-300/10 p-4"><Check className="mt-0.5 h-4 w-4 shrink-0 text-emerald-300" /><p className="text-sm text-white/75">Your details are saved. The Axenora team has been notified.</p></div>}
              <a href="/solutions" className="flex items-center justify-between rounded-md border border-white/10 p-3 text-xs text-white/65 hover:text-white"><span>Browse all Axenora systems</span><ArrowUpRight className="h-4 w-4" /></a>
              <div ref={endRef} />
            </div>

            <form onSubmit={(event) => { event.preventDefault(); void sendMessage(input); }} className="border-t border-white/10 bg-black/15 p-3">
              <div className="flex items-end gap-2"><textarea value={input} onChange={(event) => setInput(event.target.value)} onKeyDown={(event) => { if (event.key === "Enter" && !event.shiftKey) { event.preventDefault(); void sendMessage(input); } }} rows={1} maxLength={1200} placeholder="Ask about a system..." aria-label="Message" className="max-h-24 min-h-11 flex-1 resize-none rounded-md border border-white/12 bg-white/[0.06] px-3 py-2.5 text-sm outline-none placeholder:text-white/35 focus:border-[#bdf6d2]" /><button disabled={!input.trim() || isThinking} className="flex h-11 w-11 shrink-0 items-center justify-center rounded-md bg-[#bdf6d2] text-[#0c1413] disabled:opacity-40" aria-label="Send message"><Send className="h-4 w-4" /></button></div>
              <p className="mt-2 flex items-center gap-1.5 text-[10px] text-white/38"><ShieldCheck className="h-3 w-3" />Business guidance generated from approved Axenora context.</p>
            </form>
          </motion.aside>
        )}
      </AnimatePresence>
    </>
  );
}
