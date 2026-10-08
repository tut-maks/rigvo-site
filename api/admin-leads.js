// Internal CRM API. GET = list leads, PATCH = update status/note. Requires ADMIN_PASSWORD (Bearer).
const { db, configured, isAdmin, clip } = require('./_db');
const STATUS = ['new', 'contacted', 'demo', 'trial', 'won', 'lost', 'spam'];

module.exports = async (req, res) => {
  res.setHeader('Cache-Control', 'no-store');
  if (!isAdmin(req)) return res.status(401).json({ error: 'auth' });
  if (!configured()) return res.status(503).json({ error: 'not_configured' });
  try {
    if (req.method === 'GET') {
      const rows = await db('rigvo_leads?select=*&order=created_at.desc&limit=5000');
      return res.status(200).json({ rows });
    }
    if (req.method === 'PATCH') {
      const b = req.body || {};
      if (!/^[0-9a-f-]{36}$/i.test(b.id || '')) return res.status(400).json({ error: 'id' });
      const patch = { updated_at: new Date().toISOString() };
      if (b.status !== undefined) { if (!STATUS.includes(b.status)) return res.status(400).json({ error: 'status' }); patch.status = b.status; }
      if (b.note !== undefined) patch.note = clip(b.note, 2000);
      const rows = await db('rigvo_leads?id=eq.' + b.id, { method: 'PATCH', body: JSON.stringify(patch) });
      return res.status(200).json({ row: rows && rows[0] });
    }
    res.setHeader('Allow', 'GET, PATCH');
    return res.status(405).json({ error: 'method' });
  } catch (e) { console.error(e.message); return res.status(500).json({ error: 'db' }); }
};
