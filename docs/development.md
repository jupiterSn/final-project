# Development Guide

## Install

```bash
npm ci
```

## Run Locally

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Lint

```bash
npm run lint
```

## Build

```bash
npm run build
```

If the build fails because Google Fonts cannot be fetched, check your network access. The app uses `next/font/google` in `src/app/layout.tsx`.

## Demo Admin

The in-memory user store includes a demo admin account:

```text
Email: admin@secureexam.com
Password: admin123
```

## Development Notes

- The app uses in-memory data, so users and documents reset when the server restarts.
- `.env.local` is required for real OTP emails.
- Cloudflare Turnstile uses test-key fallbacks locally unless real keys are provided.
- API route files live under `src/app/api`.

## Git Hygiene

Do not commit:

- `.env`
- `.env.local`
- `.next`
- `node_modules`

These are already ignored in `.gitignore`.
