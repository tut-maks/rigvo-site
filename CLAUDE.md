# Rigvo website — rules for development

- Owner: Maksym (not a developer). Explain changes simply, in Ukrainian.
- Static site on Vercel (no build). Push to `main` → Vercel deploys rigvo.app automatically.
- Pages: index (landing + demo gate), signup (early access), login (test account demo@rigvo.app → demo), demo (CRM prototype), admin (internal sales CRM — to move to admin.rigvo.app), privacy, terms, cookies, imprint.
- **English by default** on every page for visitors who are not logged in. Other languages: DE, ES, PL only.
- **No Ukrainian anywhere on the public site for now** (no UA language, no Kyiv/Ukraine mentions, no Ukrainian names in demo data).
- **Everything that expands/collapses must animate smoothly and must not shift other content** (FAQ accordions, drawers, popovers, modals, toasts). Drawers overlay the content instead of squeezing it. Respect `prefers-reduced-motion`.
- No third-party requests from the browser: fonts are self-hosted (GDPR, Germany), no cookies, no trackers. Optional browser storage only after consent (consent.js).
- Never claim things we can't back up (hosting region, customer numbers, reviews).
- Forms send via `sendLead()` in lead.js → `/api/lead` → Supabase table `rigvo_leads` (EU, Frankfurt). Keys only in Vercel env vars (SUPABASE_URL, SUPABASE_SERVICE_KEY, ADMIN_PASSWORD). Fallback: mailto hello@rigvo.app.
- **Self-serve everywhere, in every market (owner's rule):** any company can sign up, pay, import data and start working without a call or manual action from us. Calls/demos are optional extras, never a required step. Every new feature must be self-configurable in settings with sensible defaults; paid onboarding/customisation are add-ons on top of the same single codebase (never a per-client fork).
- Three separate systems: rigvo.app (public site), app.rigvo.app (customer CRM, future), admin.rigvo.app (Rigvo management back-office). Rigvo staff never see customer workspaces without customer-granted, time-limited, logged support access.
- Logo: wordmark "rıgvo" with a yellow spotlight dot over the i (`.rv-logo` in brand.css), icon = spotlight (favicon.svg). Never an "R" in a square.
- Brand colours: #111110 / #0E0E0E dark, #FFD400 yellow. Fonts: Geist (UI), Bricolage Grotesque ExtraBold (logo only, subset).
- Prices: Start €99 (≤3 users), Pro €249 (4–8), Business €549 (9–18), Enterprise custom; yearly −20%.
