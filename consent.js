/* Rigvo — cookie & storage consent (ePrivacy / TTDSG §25). Rigvo sets no cookies.
   Essential: your consent choice, sign-in state of the demo. Optional ("analytics"): remembering the campaign
   you came from (utm) and that you already filled the demo form. Nothing optional is stored before you accept. */
(function () {
  const KEY = "rigvo_consent_v1";
  function read() { try { return JSON.parse(localStorage.getItem(KEY) || "null") } catch (e) { return null } }
  function save(analytics) { const v = { analytics: !!analytics, at: new Date().toISOString() }; try { localStorage.setItem(KEY, JSON.stringify(v)) } catch (e) {} if (!analytics) { try { sessionStorage.removeItem("rigvo_utm"); localStorage.removeItem("rigvo_demo_lead") } catch (e) {} } hide(); return v }
  window.rigvoConsent = function () { return read() || { analytics: false } };
  let el;
  function hide() { if (!el) return; el.animate([{ opacity: 1, transform: "none" }, { opacity: 0, transform: "translateY(12px)" }], { duration: 200, easing: "ease-in" }).onfinish = () => { el.remove(); el = null } }
  function show() {
    if (el) return;
    const css = document.createElement("style");
    css.textContent = ".rv-cc{position:fixed;left:16px;right:16px;bottom:16px;z-index:200;max-width:560px;margin-left:auto;background:#111110;color:#F5F5F2;border:1px solid #2C2C29;border-radius:16px;padding:18px 20px;box-shadow:0 20px 60px rgba(0,0,0,.35);font:15px/1.5 Geist,system-ui,sans-serif}.rv-cc p{margin:0 0 14px;color:#C9C9C4}.rv-cc a{color:#FFD400}.rv-cc .b{display:flex;gap:10px;flex-wrap:wrap}.rv-cc button{font:inherit;font-weight:600;border-radius:10px;padding:11px 16px;min-height:44px;cursor:pointer;border:1px solid #3A3A36;background:transparent;color:#fff}.rv-cc button.y{background:#FFD400;border-color:#FFD400;color:#0E0E0E}@media(prefers-reduced-motion:reduce){.rv-cc{animation:none}}";
    document.head.appendChild(css);
    el = document.createElement("div"); el.className = "rv-cc"; el.setAttribute("role", "dialog"); el.setAttribute("aria-label", "Cookie settings");
    el.innerHTML = '<p><b style="color:#fff">We don’t use cookies or trackers.</b> With your OK we remember which campaign brought you here and that you’ve already filled the demo form, so we don’t ask again. <a href="cookies.html">Details</a></p><div class="b"><button type="button" class="y" data-c="1">Accept</button><button type="button" data-c="0">Essential only</button></div>';
    el.addEventListener("click", e => { const b = e.target.closest("[data-c]"); if (b) save(b.dataset.c === "1") });
    document.body.appendChild(el);
    el.animate([{ opacity: 0, transform: "translateY(12px)" }, { opacity: 1, transform: "none" }], { duration: 260, easing: "cubic-bezier(.2,.8,.2,1)" });
  }
  window.rigvoCookieSettings = function () { try { localStorage.removeItem(KEY) } catch (e) {} show() };
  document.addEventListener("click", e => { if (e.target.closest("[data-cookie-settings]")) { e.preventDefault(); window.rigvoCookieSettings() } });
  if (!read()) (document.readyState === "loading" ? document.addEventListener("DOMContentLoaded", show) : show());
})();
