// Shared helpers for Rigvo API functions. Keys come only from Vercel environment variables.
const URL_ = process.env.SUPABASE_URL;
const KEY = process.env.SUPABASE_SERVICE_KEY;
const crypto = require('crypto');

function configured() { return Boolean(URL_ && KEY); }

async function db(path, opts = {}) {
  const r = await fetch(URL_.replace(/\/$/, '') + '/rest/v1/' + path, {
    ...opts,
    headers: { apikey: KEY, Authorization: 'Bearer ' + KEY, 'Content-Type': 'application/json', Prefer: 'return=representation', ...(opts.headers || {}) }
  });
  const text = await r.text();
  if (!r.ok) throw new Error('db ' + r.status + ': ' + text.slice(0, 200));
  return text ? JSON.parse(text) : null;
}

function isAdmin(req) {
  const pass = process.env.ADMIN_PASSWORD || '';
  const h = req.headers.authorization || '';
  const got = h.startsWith('Bearer ') ? h.slice(7) : '';
  if (pass.length < 10 || !got) return false;
  const a = crypto.createHash('sha256').update(got).digest();
  const b = crypto.createHash('sha256').update(pass).digest();
  return crypto.timingSafeEqual(a, b);
}

const clip = (v, n = 200) => (v == null ? null : String(v).trim().slice(0, n) || null);

module.exports = { db, configured, isAdmin, clip };
