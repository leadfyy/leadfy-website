# Leadfy website

Hungarian-language marketing site for Leadfy, an organic Instagram and Facebook content service for owner-led HVAC businesses.

## Current launch status

The website and enquiry flow are implemented. The enquiry form remains unavailable until a valid `RESEND_API_KEY` is added to the Vercel production environment. The production project already contains the confirmed recipient (`LEAD_NOTIFICATION_EMAIL=sales@leadfy.hu`) and sender (`LEAD_FROM_EMAIL=Leadfy <sales@leadfy.hu>`). The introductory €250/month price is not published because it has not been confirmed.

The site is configured as a review version: `noindex` metadata and a disallow-all robots policy remain enabled until launch approval and domain verification.

## Requirements

- Node.js 20.9+
- npm 10+

## Local development

```bash
npm ci
cp .env.example .env.local
npm run dev
```

Open http://localhost:3000.

## Validation

```bash
npm run typecheck
npm run lint
npm run build
```

## Enquiry configuration

Set these variables in Vercel Project Settings → Environment Variables:

- `RESEND_API_KEY` — secret Resend API key (Production)
- `LEAD_NOTIFICATION_EMAIL` — destination address (already configured as `sales@leadfy.hu`)
- `LEAD_FROM_EMAIL` — verified sender (already configured as `Leadfy <sales@leadfy.hu>`)
- `NEXT_PUBLIC_SITE_URL` — set to the verified production origin when the custom domain is connected

The form automatically becomes available once the three email variables are present. Do not paste API keys into source control or chat.

The endpoint validates all fields server-side, uses a honeypot, best-effort per-instance throttling, and Resend idempotency keys. It does not persist enquiries to a database or log their contents. Provider acceptance does not guarantee inbox delivery.

## Deployment

The repository is connected to the existing Vercel project `leadfy-site`. Pushes to `main` trigger deployments. The custom domain `leadfy.hu` should only be connected after its DNS records have been checked and preserved.

## Project structure

- `app/` — Next.js routes, metadata, API endpoint and global styles
- `components/` — shared navigation, FAQ and enquiry form
- `lib/site-config.ts` — confirmed business details, pricing and feature flags
- `public/` — static assets

Business details and pricing are centralized in `lib/site-config.ts`.
