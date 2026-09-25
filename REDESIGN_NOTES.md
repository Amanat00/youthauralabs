# YouthAura Labs — Full Redesign

## Redesigned routes
- `/` — Home
- `/about` — About
- `/programs` — Programs
- `/community` — Community
- `/apply` — Application flow
- `/contact` — Contact
- `/auth` — Admin authentication demo
- `/admin` — Application review dashboard

## Design direction
- Warm cream background with YouthAura navy + orange accents, aligned to the supplied logo.
- Editorial career-tech layout with stronger hierarchy, proof-focused messaging and conversion CTAs.
- Shared responsive navbar/footer and reusable page hero / CTA components.
- Fully responsive Tailwind layouts for desktop, tablet and mobile.

## Functional notes
- Existing application demo behavior is preserved: submissions are stored in browser local storage and shown in `/admin`.
- Contact submission remains a front-end demo interaction.
- Replace `REPLACE-WITH-YOUR-INVITE-CODE` with the real WhatsApp invite code before launch.
- Founder module on About is intentionally marked for real founder content rather than fabricated biography.

## Run locally
```bash
npm install
npm run dev
```

Production check:
```bash
npm run build
```

## Validation completed in delivery environment
- TypeScript: `tsc --noEmit` — passed
- Tailwind CSS compile — passed
- Full Next.js build could not be executed in the delivery sandbox because the uploaded dependencies were Windows-specific and the sandbox blocks downloading the Linux SWC binary. A fresh `npm install` on the target machine installs the correct platform binary.
