import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const pages: Record<string, { title: string; description: string }> = {
  "/": { title: "Axenora AI | Custom Business Automation Systems", description: "Custom CRM, employee monitoring, office automation, LLM chatbots, WhatsApp and Instagram systems built around real business workflows." },
  "/solutions": { title: "Business Automation Projects | Axenora AI", description: "Explore Axenora AI projects for workforce monitoring, CRM, office automation, custom chatbots and commerce messaging." },
  "/features": { title: "Platform Features | Axenora AI", description: "See the operational features behind Axenora AI workforce, CRM, automation and conversational systems." },
  "/how-it-works": { title: "How We Build Custom Systems | Axenora AI", description: "From workflow discovery to secure deployment, see how Axenora AI builds and operates custom business software." },
  "/pricing": { title: "Project Pricing | Axenora AI", description: "Plan a focused automation project, connected operating system or custom business platform with Axenora AI." },
  "/about": { title: "About Axenora AI", description: "Axenora AI builds practical business systems that connect people, customer operations, data and automated decisions." },
  "/contact": { title: "Plan Your System | Axenora AI", description: "Discuss a CRM, workforce platform, office automation, chatbot or messaging system with Axenora AI." },
  "/projects/empmetria": { title: "EmpMetria Workforce Operations | Axenora AI", description: "EmpMetria brings attendance, live work visibility, activity context, screenshots and permission-controlled reporting into one workforce platform." },
};

function setMeta(selector: string, value: string) {
  const element = document.querySelector<HTMLMetaElement>(selector);
  if (element) element.content = value;
}

export function SEOManager() {
  const { pathname } = useLocation();
  useEffect(() => {
    const page = pages[pathname];
    if (!page) return;
    document.title = page.title;
    setMeta('meta[name="description"]', page.description);
    setMeta('meta[property="og:title"]', page.title);
    setMeta('meta[property="og:description"]', page.description);
    setMeta('meta[property="og:url"]', `https://axenoraai.in${pathname}`);
    setMeta('meta[name="twitter:title"]', page.title);
    setMeta('meta[name="twitter:description"]', page.description);
    const canonical = document.querySelector<HTMLLinkElement>('link[rel="canonical"]');
    if (canonical) canonical.href = `https://axenoraai.in${pathname}`;
  }, [pathname]);
  return null;
}
