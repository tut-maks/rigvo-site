/* Rigvo — send a lead to /api/lead (stored in the Rigvo database, shown in /admin).
   Falls back to the visitor's mail app if the API is not available. */
window.RIGVO_EMAIL = "hello@rigvo.app";
window.rigvoUtm = function () { try { if (!(window.rigvoConsent && window.rigvoConsent().analytics)) return null; const q = new URLSearchParams(location.search), u = {}; ["utm_source","utm_medium","utm_campaign","utm_term","utm_content","gclid"].forEach(k => { if (q.get(k)) u[k] = q.get(k) }); if (Object.keys(u).length) sessionStorage.setItem("rigvo_utm", JSON.stringify(u)); return JSON.parse(sessionStorage.getItem("rigvo_utm") || "null") } catch (e) { return null } };
window.rigvoUtm();
window.sendLead = async function (kind, data, opts) {
  const body = Object.assign({ kind: kind, page: location.pathname, referrer: document.referrer || null, utm: window.rigvoUtm() }, data);
  try {
    const r = await fetch("/api/lead", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(body) });
    if (r.ok) return "sent";
    if (r.status === 400) throw new Error("invalid");
  } catch (e) { if (e.message === "invalid") throw e; }
  if (opts && opts.noMailto) return "failed";
  const text = Object.entries(data).filter(([, v]) => v).map(([k, v]) => k + ": " + v).join("\n");
  location.href = "mailto:" + window.RIGVO_EMAIL + "?subject=" + encodeURIComponent("Rigvo · " + kind) + "&body=" + encodeURIComponent(text);
  return "mailto";
};
