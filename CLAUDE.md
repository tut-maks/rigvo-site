# Rigvo website — rules for development

- Owner: Maksym (not a developer). Explain changes simply, in Ukrainian.
- Static site on Vercel (no build). Push to `main` → Vercel deploys rigvo.app automatically.
- Pages: index (landing), signup (early access), login (test account → demo), demo (CRM prototype), privacy, imprint.
- **English by default** on every page for visitors who are not logged in. Other languages: DE, ES, PL only.
- **No Ukrainian anywhere on the public site for now** (no UA language, no Kyiv/Ukraine mentions, no Ukrainian names in demo data).
- **Everything that expands/collapses must animate smoothly and must not shift other content** (FAQ accordions, drawers, popovers, modals, toasts). Drawers overlay the content instead of squeezing it. Respect `prefers-reduced-motion`.
- No external requests except Formspree (lead.js): fonts are self-hosted (GDPR, Germany), no cookies, no trackers.
- Never claim things we can't back up (hosting region, customer numbers, reviews).
- Forms send via `sendLead()` in lead.js → Formspree when `RIGVO_FORMSPREE_ID` is set, else mailto hello@rigvo.app.
- Logo: wordmark "rıgvo" with a yellow spotlight dot over the i (`.rv-logo` in brand.css), icon = spotlight (favicon.svg). Never an "R" in a square.
- Brand colours: #111110 / #0E0E0E dark, #FFD400 yellow. Fonts: Geist (UI), Bricolage Grotesque ExtraBold (logo only, subset).
- Prices: Start €99 (≤3 users), Pro €249 (4–8), Business €549 (9–18), Enterprise custom; yearly −20%.
