# Authentication and OTP

SecureExam uses a registration flow with Cloudflare Turnstile and email OTP verification.

## Registration Flow

1. The user opens `/register`.
2. The Cloudflare Turnstile widget loads.
3. The user submits name, email, password, and the Turnstile token.
4. `POST /api/auth/register` validates required fields.
5. The server verifies the Turnstile token with Cloudflare.
6. The server checks that the email is not already registered.
7. The password is hashed with `bcryptjs`.
8. A six-digit OTP is generated.
9. The OTP is sent to the user's email using Gmail SMTP.
10. The user is stored as unverified with a five-minute OTP expiry.
11. The browser redirects to `/verify-otp`.

## OTP Verification Flow

1. The user enters their email and OTP.
2. `POST /api/auth/verify-otp` checks the user and OTP.
3. Expired or incorrect OTPs are rejected.
4. A successful OTP marks the user as verified.
5. A signed JWT is created.
6. The JWT is stored in an HTTP-only `secureexam_token` cookie.
7. The user can access `/dashboard`.

## Login Flow

1. The user submits email and password on `/login`.
2. `POST /api/auth/login` checks credentials.
3. Unverified users are blocked.
4. A valid login sets the `secureexam_token` HTTP-only cookie.
5. The user is redirected to the dashboard.

## Route Protection

The root `middleware.ts` protects `/dashboard`.

- Requests without `secureexam_token` are redirected to `/login`.
- Authenticated users visiting `/login`, `/register`, or `/verify-otp` are redirected to `/dashboard`.

## Email Delivery

OTP emails are sent by `src/lib/mail.ts`.

The mailer uses Gmail SMTP:

- Host: `smtp.gmail.com`
- Port: `587`
- TLS: required

Use a Gmail app password for `EMAIL_PASS`. Do not use your normal Gmail account password.

## Cloudflare Turnstile

The register page uses `src/components/Turnstile`.

The server verifies the token in `src/lib/turnstile.ts`.

Development can use Cloudflare test keys. Production should use real site and secret keys from the Cloudflare dashboard.
