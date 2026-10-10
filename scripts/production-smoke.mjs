import assert from 'node:assert/strict';
const base = process.env.QA_URL || 'https://www.axenoraai.in';
const sitemap = await fetch(`${base}/sitemap.xml`).then(response => response.text());
const urls = [...sitemap.matchAll(/<loc>(.*?)<\/loc>/g)].map(match => match[1]);
for (const url of urls) {
  const response = await fetch(url);
  const html = await response.text();
  assert.equal(response.status, 200, url);
  assert.equal((html.match(/<h1[ >]/g) || []).length, 1, `${url}: static H1`);
  assert.ok(html.includes(`href="${url}"`), `${url}: canonical`);
  assert.ok(html.includes('id="page-schema"'), `${url}: structured data`);
  assert.ok(!html.includes('src="/src/assets/'), `${url}: assets must be built`);
}
console.log(`Verified ${urls.length} live prerendered pages, canonicals and structured data.`);
const health = await fetch(`${base}/api/health`);
assert.equal(health.status, 200);
const invalidJson = await fetch(`${base}/api/chat`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: '{broken' });
assert.equal(invalidJson.status, 400);
const invalidLead = await fetch(`${base}/api/chat/lead`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ name: 'x', phone: 'bad', consent: false }) });
assert.equal(invalidLead.status, 400);
for (const prompt of ['What is Elvori and where can I visit it?', 'What can an Axenora AI calling agent do?']) {
  const response = await fetch(`${base}/api/chat`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ messages: [{ role: 'user', content: prompt }] }), signal: AbortSignal.timeout(40000) });
  const data = await response.json();
  console.log(JSON.stringify({ prompt, status: response.status, reply: data.reply || data.message }));
  assert.equal(response.status, 200);
  assert.ok(data.reply?.length > 20);
}
const services = await fetch(`${base}/api/services`, { signal: AbortSignal.timeout(20000) });
console.log(`Database-backed service endpoint: HTTP ${services.status}`);
console.log('API health, JSON validation, lead validation and live LLM responses verified.');
