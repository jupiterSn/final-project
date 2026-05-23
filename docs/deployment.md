# Deployment Guide

## Before Deployment

Set production environment variables:

```env
EMAIL_USER=your-gmail-address@gmail.com
EMAIL_PASS=your-gmail-app-password
JWT_SECRET=replace-with-a-long-random-secret
JWT_EXPIRES_IN=1h
NEXT_PUBLIC_TURNSTILE_SITE_KEY=your-cloudflare-site-key
CLOUDFLARE_TURNSTILE_SECRET_KEY=your-cloudflare-secret-key
```

## Build Check

Run locally before deploying:

```bash
npm run lint
npm run build
```

## Cloudflare Turnstile

Create a Turnstile widget in Cloudflare and add the production domain.

Use:

- Site key: `NEXT_PUBLIC_TURNSTILE_SITE_KEY`
- Secret key: `CLOUDFLARE_TURNSTILE_SECRET_KEY`

## Email

The app sends OTP email through Gmail SMTP on port `587`.

Some hosting providers restrict SMTP. If email does not send in production, use a transactional email provider such as Resend, SendGrid, Mailgun, or AWS SES.

## Data Persistence

The current app uses in-memory arrays. This is not production-persistent.

Before production, replace in-memory stores with a database and move user, OTP, and document data into persistent tables or collections.

## CI

GitHub Actions runs on pushes and pull requests to `main` and `development`.

The workflow:

```text
npm ci
npm run lint
npm run build
```
