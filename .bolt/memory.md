# Project memory

## Product intent & audience

- Corporate website for **PT Purbaya Garda Nusantara**, a security services company.
- Bilingual (Indonesian / English).
- Public-facing: professional design, service catalog, client portfolio, contact form.
- Internal: secure admin dashboard.
- Audience: prospective corporate/institutional clients seeking security services; internal admins managing content.

## Brand personality & voice

- Professional, trustworthy, authoritative — appropriate for a security company.
- Corporate tone; not flashy. (Detailed design direction deferred to `.bolt/prompt`.)

## Visual design & UX direction

- Stack: Next.js (App Router) + Tailwind CSS + shadcn/ui + Lucide React icons.
- shadcn/ui is the UI library of choice; avoid installing other UI/icon packages unless necessary.
- Icons sourced exclusively from lucide-react.
- Next.js App Router in use; components using `useState`/`useEffect` must include `"use client"` directive.
- Must avoid server/client hydration attribute mismatches (`class`, `style`).
- Layout: home page includes a clients-preview section among other sections.

## Decisions, constraints & rationale

- Stale `.next` build cache can produce `TypeError: __webpack_require__.n is not a function`. Fix: clear `.next` and rebuild. Do not run a production build while the dev server holds the same cache folder.
- Admin dashboard backed by Supabase (auth + data).

## Open questions & assumptions

- Home page clients-preview visual correctness not yet verified after cache fix; user confirmation pending.
- Specific security service categories and content details not yet provided.
- Language switching mechanism (i18n approach) not yet determined.
- Supabase schema and admin dashboard scope not yet defined.