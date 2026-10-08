# Rigvo website — rules for development

- Owner: Maksym (not a developer). Explain changes simply, in Ukrainian.
- Static site on Vercel (no build). Push to `main` → Vercel deploys rigvo.app automatically.
- Pages: index (landing + demo gate), signup (early access), login (test account demo@rigvo.app → demo), demo (CRM prototype), admin (internal sales CRM — to move to admin.rigvo.app), privacy, terms, cookies, imprint.
- **English by default** on every page for visitors who are not logged in. Site languages: EN, DE, ES, PL, FR, PT, IT (picker in the header; choice kept in localStorage `rigvo_lang`). Landing/login strings live in `i18n/site.tsv` → run `python3 i18n/build.py` → `i18n/site.js`. Signup has its own dictionary. Demo app: EN/DE/ES/PL for now. Legal pages: English only until a lawyer-reviewed translation exists. Every new visible string must be added to the translations in the same change.
- **No Ukrainian anywhere on the public site for now** (no UA language, no Kyiv/Ukraine mentions, no Ukrainian names in demo data).
- **Everything that expands/collapses must animate smoothly and must not shift other content** (FAQ accordions, drawers, popovers, modals, toasts). Drawers overlay the content instead of squeezing it. Respect `prefers-reduced-motion`.
- No third-party requests from the browser: fonts are self-hosted (GDPR, Germany), no cookies, no trackers. Optional browser storage only after consent (consent.js).
- Never claim things we can't back up (hosting region, customer numbers, reviews).
- Forms send via `sendLead()` in lead.js → `/api/lead` → Supabase table `rigvo_leads` (EU, Frankfurt). Keys only in Vercel env vars (SUPABASE_URL, SUPABASE_SERVICE_KEY, ADMIN_PASSWORD). Fallback: mailto hello@rigvo.app.
- **Self-serve everywhere, in every market (owner's rule):** any company can sign up, pay, import data and start working without a call or manual action from us. Calls/demos are optional extras, never a required step. Every new feature must be self-configurable in settings with sensible defaults; paid onboarding/customisation are add-ons on top of the same single codebase (never a per-client fork).
- **Support without calls (owner's rule):** help = knowledge base (help.rigvo.app) + in-app hints + AI assistant + email/ticket support. No phone support, no required calls, so time zones don't matter. Every feature ships with its help article; every support email that repeats becomes an article.
- Three separate systems: rigvo.app (public site), app.rigvo.app (customer CRM, future), admin.rigvo.app (Rigvo management back-office). Rigvo staff never see customer workspaces without customer-granted, time-limited, logged support access.
- Logo: wordmark "rıgvo" with a yellow spotlight dot over the i (`.rv-logo` in brand.css), icon = spotlight (favicon.svg). Never an "R" in a square.
- Brand colours: #111110 / #0E0E0E dark, #FFD400 yellow. Fonts: Geist (UI), Bricolage Grotesque ExtraBold (logo only, subset).
- Prices: Start €99 (≤3 users), Pro €249 (4–8), Business €549 (9–18), Enterprise custom; yearly −20%.
