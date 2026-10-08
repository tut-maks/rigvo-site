/* Rigvo — send a lead (early access / demo request).
   Set FORMSPREE_ID (from formspree.io) to receive requests by email; until then the visitor's mail app opens. */
window.RIGVO_FORMSPREE_ID = "";
window.RIGVO_EMAIL = "hello@rigvo.app";
window.sendLead = async function (kind, data) {
  const id = window.RIGVO_FORMSPREE_ID;
  if (id) {
    const r = await fetch("https://formspree.io/f/" + id, {
      method: "POST",
      headers: { "Content-Type": "application/json", Accept: "application/json" },
      body: JSON.stringify(Object.assign({ _subject: "Rigvo · " + kind }, data))
    });
    if (!r.ok) throw new Error("send failed");
    return "sent";
  }
  const body = Object.entries(data).map(([k, v]) => k + ": " + v).join("\n");
  location.href = "mailto:" + window.RIGVO_EMAIL + "?subject=" + encodeURIComponent("Rigvo · " + kind) + "&body=" + encodeURIComponent(body);
  return "mailto";
};
