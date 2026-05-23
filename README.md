# SecureExam

SecureExam is a Next.js secure exam and document portal with email OTP verification, Cloudflare Turnstile protection, role-based dashboard access, and document management APIs.

The app is built with the Next.js App Router, TypeScript, React, Tailwind CSS, HTTP-only auth cookies, Gmail SMTP OTP delivery, and Cloudflare Turnstile bot protection on registration.

## Features

- User registration with email OTP verification.
- Login protected by verified-account checks.
- HTTP-only session cookie for dashboard access.
- Cloudflare Turnstile challenge on registration.
- Admin and user dashboard experiences.
- Document API routes for listing, creating, updating, and deleting documents.
- Reusable components, hooks, services, layouts, and utility modules.
- GitHub Actions CI for linting and production builds.

## Tech Stack

- Next.js 16
- React 19
- TypeScript
- Tailwind CSS
- Nodemailer
- bcryptjs
- jsonwebtoken
- Cloudflare Turnstile
- GitHub Actions

## Project Structure

```text
FINAL-PROJECT/
├── .github/workflows/ci.yml
├── docs/
├── public/
├── src/
│   ├── app/
│   ├── components/
│   ├── hooks/
│   ├── layouts/
│   ├── lib/
│   ├── middleware/
│   ├── services/
│   ├── types/
│   └── utils/
├── middleware.ts
├── package.json
├── tsconfig.json
└── README.md
```

Read the full architecture notes in [docs/architecture.md](docs/architecture.md).

## Getting Started

Install dependencies:

```bash
npm ci
```

Create a local environment file:

```bash
cp .env.example .env.local
```

If `.env.example` does not exist yet, create `.env.local` manually using the variables in [docs/environment.md](docs/environment.md).

Start the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Environment Variables

Local secrets must stay in `.env.local`. This file is ignored by Git.

Required for email OTP:

```env
EMAIL_USER=your-gmail-address@gmail.com
EMAIL_PASS=your-gmail-app-password
```

Recommended for auth:

```env
JWT_SECRET=replace-with-a-long-random-secret
JWT_EXPIRES_IN=1h
```

Required in production for Cloudflare Turnstile:

```env
NEXT_PUBLIC_TURNSTILE_SITE_KEY=your-site-key
CLOUDFLARE_TURNSTILE_SECRET_KEY=your-secret-key
```

See [docs/environment.md](docs/environment.md) for setup details.

## Available Scripts

```bash
npm run dev
npm run lint
npm run build
npm run start
```

## Authentication Flow

1. A user registers with name, email, password, and Cloudflare Turnstile verification.
2. The server validates the Turnstile token.
3. The password is hashed.
4. A six-digit OTP is generated.
5. The OTP is emailed to the user.
6. The user verifies the OTP.
7. The account is marked verified and a session cookie is set.
8. The dashboard is available only when the auth cookie exists.

Details are documented in [docs/authentication.md](docs/authentication.md).

## API Routes

Authentication:

- `POST /api/auth/register`
- `POST /api/auth/login`
- `POST /api/auth/logout`
- `GET /api/auth/me`
- `POST /api/auth/send-otp`
- `POST /api/auth/verify-otp`

Documents:

- `GET /api/documents`
- `POST /api/documents`
- `PUT /api/documents/[id]`
- `DELETE /api/documents/[id]`

See [docs/api.md](docs/api.md).

## Security Notes

- Never commit `.env.local`.
- Use a Gmail app password, not your normal Gmail password.
- Use real Cloudflare Turnstile keys in production.
- Replace in-memory stores with a database before production use.
- Rotate any exposed secret immediately.

## CI

The GitHub Actions workflow in `.github/workflows/ci.yml` runs:

```bash
npm ci
npm run lint
npm run build
```

## Documentation

- [Architecture](docs/architecture.md)
- [Authentication and OTP](docs/authentication.md)
- [API Reference](docs/api.md)
- [Environment Setup](docs/environment.md)
- [Development Guide](docs/development.md)
- [Deployment Guide](docs/deployment.md)
