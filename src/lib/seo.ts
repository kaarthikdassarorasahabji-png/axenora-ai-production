export const siteUrl = "https://www.axenoraai.in";
export const pageSEO: Record<string, { title: string; description: string }> = {
  "/": {
    title: "AI Chatbots, Calling Agents & Business Automation | Axenora AI",
    description:
      "Axenora AI builds custom AI chatbots, voice calling workflows, WhatsApp and Instagram automation, CRM dashboards and workforce software in India.",
  },
  "/solutions": {
    title: "AI Automation Solutions & Products | Axenora AI",
    description:
      "Explore Elvori, EmpMetria, custom chatbots, AI calling agents, business messaging, CRM and office automation by Axenora AI.",
  },
  "/features": {
    title: "Chatbot & Business Automation Capabilities | Axenora AI",
    description:
      "Compare knowledge-grounded chatbots, voice workflows, lead capture, CRM integrations, workforce visibility and automation controls.",
  },
  "/about": {
    title: "About Axenora AI | Kaarthik Dass Arora",
    description:
      "Meet Axenora AI, a founder-led software studio building custom business systems, conversational AI and connected operations.",
  },
  "/how-it-works": {
    title: "Our AI Automation Development Process | Axenora AI",
    description:
      "From discovery and proposals to development, testing and rollout: how Axenora builds custom business automation systems.",
  },
  "/pricing": {
    title: "Custom AI Chatbot & Automation Project Pricing | Axenora AI",
    description:
      "Scope a chatbot, business automation or connected software platform. Review implementation scope, integrations and recurring provider costs.",
  },
  "/contact": {
    title: "Discuss an AI Chatbot or Automation Project | Axenora AI",
    description:
      "Contact Axenora AI to plan custom chatbots, AI calling workflows, WhatsApp automation, CRM and workforce software.",
  },
  "/projects/elovri": {
    title: "Elvori | Private Client Workspace by Axenora AI",
    description:
      "Elvori brings business requests, proposals, milestones, documents and direct Axenora team conversations into a private client workspace.",
  },
  "/projects/empmetria": {
    title: "EmpMetria | Workforce Operations by Axenora AI",
    description:
      "Explore EmpMetria for attendance, timesheets, live visibility, approved devices and permission-controlled workforce reporting.",
  },
  "/projects/chatbots": {
    title: "Custom AI Chatbot Development in India | Axenora AI",
    description:
      "Business chatbots grounded in approved products and policies, with lead qualification, multilingual support, CRM integration and human handoff.",
  },
  "/projects/calling": {
    title: "AI Calling Agents & Voice Automation | Axenora AI",
    description:
      "Plan custom AI voice workflows for inbound inquiries, lead qualification, appointment requests, CRM updates and human transfer.",
  },
  "/projects/whatsapp": {
    title: "WhatsApp Business Automation & AI Chatbots | Axenora AI",
    description:
      "WhatsApp Cloud API workflows for product guidance, support, lead qualification, cart assistance and human handoff.",
  },
  "/projects/instagram": {
    title: "Instagram DM Automation & Sales Chatbots | Axenora AI",
    description:
      "Custom Instagram DM, story reply and comment-to-DM workflows connected to approved product information and commerce tools.",
  },
  "/projects/crm": {
    title: "Custom CRM Dashboards & Business Operations | Axenora AI",
    description:
      "Connect customers, orders, role-based tasks, approvals, Shopify workflows, revenue and shipping in a custom CRM dashboard.",
  },
  "/projects/office-automation": {
    title: "Office & Business Workflow Automation | Axenora AI",
    description:
      "Automate task routing, approvals, notifications, reminders, onboarding and executive digests with reviewable action history.",
  },
  "/projects/monitoring": {
    title: "Employee Monitoring & Team Visibility | Axenora AI",
    description:
      "Attendance, employee screen visibility, active and idle reports, device approvals and manager-scoped workforce monitoring.",
  },
  "/privacy": {
    title: "Privacy Policy | Axenora AI",
    description: "How Axenora AI handles website and service data.",
  },
  "/projects/meloqis": {
    title: "Meloqis Music | Android Music Player by Axenora AI",
    description:
      "Discover Meloqis Music: synced lyrics, flexible queues, artwork-adaptive colors, equalizer, sleep timer and supported offline listening on Android.",
  },
  "/terms": {
    title: "Terms of Service | Axenora AI",
    description: "Terms for using Axenora AI websites and services.",
  },
  "/refund": {
    title: "Refund Policy | Axenora AI",
    description: "Refund terms for Axenora AI projects and services.",
  },
};
export function structuredData(path: string) {
  const page = pageSEO[path];
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": `${siteUrl}/#organization`,
        name: "Axenora AI",
        url: siteUrl,
        logo: `${siteUrl}/Logo.png`,
        founder: { "@type": "Person", name: "Kaarthik Dass Arora" },
        email: "contact@axenoraai.in",
        telephone: "+917814051678",
      },
      {
        "@type": "WebSite",
        "@id": `${siteUrl}/#website`,
        name: "Axenora AI",
        url: siteUrl,
        publisher: { "@id": `${siteUrl}/#organization` },
      },
      {
        "@type": "WebPage",
        "@id": `${siteUrl}${path}`,
        name: page?.title,
        description: page?.description,
        url: `${siteUrl}${path}`,
        isPartOf: { "@id": `${siteUrl}/#website` },
      },
      ...(path.startsWith("/projects/")
        ? [
            {
              "@type": "BreadcrumbList",
              itemListElement: [
                {
                  "@type": "ListItem",
                  position: 1,
                  name: "Axenora AI",
                  item: siteUrl,
                },
                {
                  "@type": "ListItem",
                  position: 2,
                  name: "Solutions",
                  item: `${siteUrl}/solutions`,
                },
                {
                  "@type": "ListItem",
                  position: 3,
                  name: page?.title.split("|")[0].trim(),
                  item: `${siteUrl}${path}`,
                },
              ],
            },
          ]
        : []),
    ],
  };
}
