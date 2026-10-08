// POST /api/lead — save a website lead. Public endpoint; validates and stores only known fields.
const { db, configured, clip } = require('./_db');
const KINDS = ['demo', 'early_access', 'demo_call'];
const EMAIL = /^[^\s@]{1,64}@[^\s@]{1,190}\.[^\s@]{2,24}$/;

module.exports = async (req, res) => {
  if (req.method !== 'POST') { res.setHeader('Allow', 'POST'); return res.status(405).json({ error: 'method' }); }
  const b = typeof req.body === 'object' && req.body ? req.body : {};
  if (b.website) return res.status(200).json({ ok: true }); // honeypot: bots fill hidden field
  const email = clip(b.email, 254);
  if (!email || !EMAIL.test(email)) return res.status(400).json({ error: 'email' });
  const kind = KINDS.includes(b.kind) ? b.kind : 'demo';
  if (!configured()) return res.status(503).json({ error: 'not_configured' });
  const utm = b.utm && typeof b.utm === 'object' ? Object.fromEntries(Object.entries(b.utm).slice(0, 6).map(([k, v]) => [clip(k, 30), clip(v, 120)])) : null;
  const row = {
    kind, email: email.toLowerCase(), name: clip(b.name, 120), company: clip(b.company, 160), country: clip(b.country, 4),
    city: clip(b.city, 120), phone: clip(b.phone, 40), vat_id: clip(b.vat_id, 30), plan: clip(b.plan, 30), billing: clip(b.billing, 10),
    language: clip(b.language, 5), marketing_opt_in: b.marketing_opt_in === true, consent_text: clip(b.consent_text, 400), page: clip(b.page, 200), referrer: clip(b.referrer, 300), utm,
    ip_country: clip(req.headers['x-vercel-ip-country'], 4), user_agent: clip(req.headers['user-agent'], 300)
  };
  try { await db('rigvo_leads', { method: 'POST', body: JSON.stringify(row), headers: { Prefer: 'return=minimal' } }); }
  catch (e) { console.error(e.message); return res.status(500).json({ error: 'save' }); }
  return res.status(200).json({ ok: true });
};
