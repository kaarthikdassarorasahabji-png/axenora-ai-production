import monitoring from "@/assets/project-monitoring-user.jpg";
import crm from "@/assets/project-crm-user.jpg";
import office from "@/assets/project-office-user.jpg";
import chatbot from "@/assets/projects-chatbot.jpg";
import whatsapp from "@/assets/projects-whatsapp.jpg";
import instagram from "@/assets/projects-instagram.jpg";
import workforce from "@/assets/empmetria/product-home.jpg";
import calling from "@/assets/solution-calling.jpg";

export const products = [
  {
    slug: "elovri",
    name: "Elvori",
    category: "Client collaboration",
    image: "/images/elovri-site.jpg",
    summary:
      "A private space to turn your business challenge into a clear proposal and a project you can follow.",
    features: [
      "Business requests and requirements",
      "Custom proposals and project scope",
      "Private organization workspaces",
      "Milestones and project updates",
      "Documents, decisions and feedback",
      "Direct conversations with the Axenora team",
    ],
    workflow: [
      "Share the problem and business context",
      "Discuss requirements with our team",
      "Review a tailored proposal",
      "Follow milestones in your private workspace",
    ],
    external: "https://elovri.axenoraai.in",
    action: "Visit Elvori",
  },
  {
    slug: "empmetria",
    name: "EmpMetria",
    category: "Workforce operations",
    image: workforce,
    summary:
      "Attendance, activity context and permission-controlled work visibility for distributed teams.",
    features: [
      "Visible employee desktop agent",
      "Owner-approved device enrollment",
      "Live screen visibility and screenshots",
      "Attendance, shifts and timesheets",
      "Application and website activity",
      "Team-scoped permissions and audit history",
    ],
    workflow: [
      "Invite your team",
      "Approve people and devices",
      "Set work schedules and viewing permissions",
      "Review attendance and activity reports",
    ],
    external: "https://empmetria.axenoraai.in",
    action: "Visit EmpMetria",
  },
  {
    slug: "chatbots",
    name: "Custom AI chatbots",
    category: "Conversational AI",
    image: chatbot,
    summary:
      "Helpful answers grounded in your products and policies, with a clear path to your people.",
    features: [
      "Approved knowledge and product answers",
      "Lead qualification and callback requests",
      "Multilingual customer conversations",
      "Support routing and human handoff",
      "CRM and business API integrations",
      "Conversation history and operator controls",
    ],
    workflow: [
      "Organize approved business knowledge",
      "Define answer boundaries and handoff rules",
      "Connect approved tools and channels",
      "Test real customer questions before launch",
    ],
    action: "Plan a chatbot",
  },
  {
    slug: "calling",
    name: "AI calling agents",
    category: "Voice automation",
    image: calling,
    summary:
      "Design a voice workflow for inquiries, lead qualification and appointment requests, connected to your team.",
    features: [
      "Inbound inquiry workflows",
      "Permission-based follow-up calls",
      "Lead qualification and routing",
      "Appointment requests and calendar integration",
      "Human transfer and escalation",
      "Transcripts and call summaries when configured",
    ],
    workflow: [
      "Choose the call use case and approved script",
      "Select telephony, voice and calendar integrations",
      "Test interruptions, transfers and unavailable answers",
      "Launch with monitoring and human escalation",
    ],
    action: "Discuss a calling agent",
  },
  {
    slug: "crm",
    name: "CRM dashboards",
    category: "Customer operations",
    image: crm,
    summary:
      "Customers, orders, ownership and approvals in one connected operating workspace.",
    features: [
      "Customer 360 and segmentation",
      "Orders and Shopify-connected workflows",
      "CEO, admin, manager and staff scopes",
      "Tasks, approvals and leave management",
      "Revenue, shipping and NDR reporting",
      "Module permissions and audit history",
    ],
    workflow: [
      "Map the customer and order lifecycle",
      "Define roles and permissions",
      "Connect business data and integrations",
      "Launch dashboards and exception workflows",
    ],
    action: "Plan a CRM",
  },
  {
    slug: "whatsapp",
    name: "WhatsApp automation",
    category: "Business messaging",
    image: whatsapp,
    summary:
      "Product guidance, customer support and qualified inquiries inside your business messaging channel.",
    features: [
      "WhatsApp Cloud API integration",
      "Product FAQs and catalogue guidance",
      "Cart and checkout workflows",
      "Verified order-status assistance",
      "Lead capture and conversation routing",
      "Quick replies and human handoff",
    ],
    workflow: [
      "Connect an approved business account",
      "Prepare products and support knowledge",
      "Configure messaging and escalation rules",
      "Test the customer journey and handoff",
    ],
    action: "Discuss WhatsApp",
  },
  {
    slug: "instagram",
    name: "Instagram automation",
    category: "Social commerce",
    image: instagram,
    summary:
      "Turn product questions in DMs into useful conversations and a clear next step.",
    features: [
      "Instagram DM conversations",
      "Story replies and comment-to-DM workflows",
      "Multilingual product recommendations",
      "Catalogue and Shopify integration",
      "Cart guidance and order assistance",
      "Conversation logging and team escalation",
    ],
    workflow: [
      "Connect the business messaging channel",
      "Approve product and offer information",
      "Build conversation and handoff flows",
      "Test messages, permissions and webhooks",
    ],
    action: "Discuss Instagram",
  },
  {
    slug: "office-automation",
    name: "Office automation",
    category: "Workflow systems",
    image: office,
    summary:
      "Give repeated work an owner, a rule and a visible result, from approvals to management digests.",
    features: [
      "Event triggers and conditional rules",
      "Task assignment and approval routing",
      "Deadline reminders and escalation queues",
      "Onboarding and invoice workflows",
      "Notifications and executive digests",
      "Action history and operator overrides",
    ],
    workflow: [
      "Choose a repetitive workflow",
      "Define conditions, owners and approvals",
      "Connect events and notifications",
      "Monitor exceptions and refine rules",
    ],
    action: "Map a workflow",
  },
  {
    slug: "monitoring",
    name: "Employee monitoring",
    category: "Team visibility",
    image: monitoring,
    summary:
      "Live status, time and activity reports with visible agents and defined manager access.",
    features: [
      "Online and offline employee status",
      "Screen previews and screenshots",
      "Application, active and idle activity",
      "Attendance and daily timesheets",
      "Shift, late and absence alerts",
      "Device approval and team permissions",
    ],
    workflow: [
      "Agree on monitoring scope",
      "Invite employees and approve devices",
      "Set schedules and access boundaries",
      "Review work context and exceptions",
    ],
    action: "Discuss team visibility",
  },
] as const;

export const faqs = [
  [
    "Can you build a chatbot for our business?",
    "Yes. We scope the assistant around your approved products, policies and customer questions, then connect the channels and tools your team authorizes.",
  ],
  [
    "Can AI calling agents connect to our CRM?",
    "CRM updates, appointment requests and call summaries can be part of a custom implementation. Providers, permissions and usage costs are agreed during scoping.",
  ],
  [
    "What is Elvori?",
    "Elvori is the Axenora client workspace for business requests, proposals, milestones, documents and direct conversations with our team.",
  ],
  [
    "Can we keep our existing tools?",
    "We review your current systems first. Where APIs and permissions allow, we connect your CRM, store, messaging, email and internal services.",
  ],
  [
    "How do we start?",
    "Share one workflow, who handles it today and what is getting missed. We discuss requirements and propose a scope before implementation.",
  ],
];
