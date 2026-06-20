const SYSTEM_PROMPT = `You are the Axenora AI product assistant. Answer only from the approved company context below. Be concise, practical, and specific. Never invent clients, prices, guarantees, deployment status, legal compliance, or product capabilities.

AXENORA AI
- Builds custom business software, not generic templates.
- Core work: EmpMetria workforce operations, employee monitoring, retail CRM dashboards, office automation, custom LLM chatbots, WhatsApp commerce automation, and Instagram sales automation.
- Contact: +91 7814051678 and contact@axenoraai.in.

EMPMETRIA AND EMPLOYEE MONITORING
- Approval-first workforce operations. No keylogging and no hidden mode.
- Visible desktop agent, owner approval, approved-device enrollment, role/team/per-user viewing rules and audit logs.
- Live screens, automatic screenshots, attendance, shifts, breaks, timesheets, application and website activity, active/idle status, productivity context, alerts and reports.
- Private screenshots use signed access. Live viewing uses permission-gated WebRTC where possible.
- The live EmpMetria product is exactly https://empmetria.axenoraai.in.
- Axenora project pages are exactly https://axenoraai.in/projects/monitoring, https://axenoraai.in/projects/crm, https://axenoraai.in/projects/office-automation, https://axenoraai.in/projects/chatbots, https://axenoraai.in/projects/whatsapp and https://axenoraai.in/projects/instagram.
- Never invent, merge or alter a URL. Recommend at most one relevant page per response.

CRM
- CEO, admin, manager, team leader, staff and trainee scopes.
- Customer 360, orders, revenue, campaigns, tasks, approvals, attendance, shipping/NDR, audit history and Shopify-connected workflows.

AUTOMATION
- Event triggers, conditional rules, approvals, task routing, notifications, escalations, onboarding, invoice processing and management digests.

CHATBOTS AND MESSAGING
- Server-side LLM responses grounded in approved business data.
- Website, WhatsApp and Instagram assistants can answer product questions, qualify leads, create cart or support actions, route conversations and hand off to people.
- Integrations can include Shopify, WhatsApp Cloud API, Instagram Graph API, CRM, email, sheets, shipping providers and internal APIs.

CONVERSATION RULES
- Use plain text with short paragraphs. No markdown tables.
- Give a direct answer first, then one useful next step.
- Ask at most one follow-up question.
- If the visitor expresses buying intent, asks for pricing, a demo, rollout, quote, implementation, contact, or wants to speak to someone, set leadIntent to true and end the reply by asking whether they would like to share a phone number for a callback.
- Phone capture is optional and must be presented as consent-based. Never claim a phone number was stored until the lead endpoint confirms it.
- For unrelated questions, politely redirect to Axenora's products and services.

Return strict JSON only: {"reply":"your response","leadIntent":true_or_false,"topic":"monitoring|empmetria|crm|automation|chatbot|whatsapp|instagram|pricing|contact|other"}`;

function extractResponseText(data) {
  if (typeof data?.output_text === 'string') return data.output_text;
  for (const item of data?.output || []) {
    for (const content of item?.content || []) {
      if (typeof content?.text === 'string') return content.text;
    }
  }
  return '';
}

function parseAssistantResult(raw) {
  const cleaned = String(raw || '').replace(/^```json\s*/i, '').replace(/```$/i, '').trim();
  const objectStart = cleaned.indexOf('{');
  const objectEnd = cleaned.indexOf('}', objectStart);
  const firstObject = objectStart >= 0 && objectEnd > objectStart ? cleaned.slice(objectStart, objectEnd + 1) : cleaned;
  const candidates = [firstObject, cleaned, firstObject.replace(/\\"/g, '"').replace(/\\n/g, '\n'), cleaned.replace(/\\"/g, '"').replace(/\\n/g, '\n')];
  for (const candidate of candidates) {
    try {
      let parsed = JSON.parse(candidate);
      if (typeof parsed === 'string') parsed = JSON.parse(parsed);
      if (typeof parsed?.reply === 'string' && parsed.reply.trim().startsWith('{')) {
        const nested = parsed.reply.replace(/\\"/g, '"');
        try { parsed = JSON.parse(nested); } catch { /* use the outer reply */ }
      }
      if (typeof parsed?.reply !== 'string' || !parsed.reply.trim()) continue;
      const reply = parsed.reply.replace(/\s+/g, ' ').trim().slice(0, 1600);
      return {
        reply,
        leadIntent: parsed.leadIntent === true || parsed.leadIntent === 'true' || /share (?:a |your )?phone|phone number|callback/i.test(reply),
        topic: String(parsed.topic || 'other').slice(0, 40),
      };
    } catch {
      // Some free models escape JSON twice; the normalized candidate is tried next.
    }
  }
  const readable = cleaned.replace(/\\"/g, '"').replace(/\\n/g, ' ').replace(/\s+/g, ' ').trim();
  return { reply: readable.slice(0, 1600), leadIntent: /"leadIntent"\s*:\s*true|share (?:a |your )?phone|phone number|callback/i.test(readable), topic: 'other' };
}

async function askOpenAI(messages, signal) {
  const response = await fetch('https://api.openai.com/v1/responses', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      model: process.env.OPENAI_MODEL || 'gpt-4.1-mini',
      instructions: SYSTEM_PROMPT,
      input: messages,
      max_output_tokens: 320,
      temperature: 0.3,
    }),
    signal,
  });
  if (!response.ok) throw new Error(`openai_${response.status}`);
  return extractResponseText(await response.json());
}

async function askOpenRouter(messages, signal) {
  const models = [...new Set([
    process.env.OPENROUTER_MODEL,
    'nvidia/nemotron-nano-9b-v2:free',
    'openai/gpt-oss-120b:free',
    'openai/gpt-oss-20b:free',
    'qwen/qwen3-next-80b-a3b-instruct:free',
  ].filter(Boolean))];
  let lastStatus = 502;
  for (const model of models) {
    const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${process.env.OPENROUTER_API_KEY}`,
        'Content-Type': 'application/json',
        'HTTP-Referer': process.env.CLIENT_URL || 'https://axenoraai.in',
        'X-Title': 'Axenora AI Assistant',
      },
      body: JSON.stringify({
        model,
        messages: [{ role: 'system', content: SYSTEM_PROMPT }, ...messages],
        max_tokens: 900,
        temperature: 0.3,
        reasoning: { effort: 'low' },
        response_format: { type: 'json_object' },
      }),
      signal,
    });
    if (response.ok) {
      const data = await response.json();
      return data?.choices?.[0]?.message?.content || '';
    }
    lastStatus = response.status;
    if (![404, 429, 502, 503].includes(response.status)) break;
  }
  throw new Error(`openrouter_${lastStatus}`);
}

export async function generateAssistantReply(messages) {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 25000);
  try {
    let raw;
    if (process.env.OPENAI_API_KEY) raw = await askOpenAI(messages, controller.signal);
    else if (process.env.OPENROUTER_API_KEY) raw = await askOpenRouter(messages, controller.signal);
    else throw new Error('llm_not_configured');
    const result = parseAssistantResult(raw);
    if (!result.reply) throw new Error('empty_llm_response');
    return result;
  } finally {
    clearTimeout(timeout);
  }
}
