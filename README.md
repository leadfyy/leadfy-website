# Leadfy website

Hungarian-language marketing site for Leadfy, an organic Instagram and Facebook content service for owner-led HVAC businesses.

## Review status

This is a review version. Enquiry capture is intentionally disabled until Adam confirms the receiving address, sender identity and legal/privacy details. The proposed €250/month pilot price is not published because it has not been confirmed. Pages are marked noindex and robots.txt disallows crawling during review.

## Requirements

- Node.js 20.9+
- npm 10+

## Local development

```bash
npm install
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

## Deployment

The repository is connected to the existing Vercel project `leadfy-site`. Pushes to its production branch trigger deployments. Do not enable enquiry submissions until the owner confirms the recipient, sender and legal details, and the privacy notice is finalized.

## Enquiry activation checklist

1. Confirm the data controller's legal identity and privacy contact details.
2. Confirm the enquiry recipient address.
3. Confirm the sender address and configure the Resend API key in Vercel.
4. Set `ENQUIRY_TO_EMAIL`, `ENQUIRY_FROM_EMAIL` and `RESEND_API_KEY`.
5. Implement and test server-side validation, rate limiting, honeypot and duplicate-submit protection.
6. Publish the final privacy notice before enabling submissions.
7. Remove the review noindex and robots disallow policy only after launch approval.

Business details, pricing and feature flags are centralized in `lib/site-config.ts`.