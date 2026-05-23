# Architecture

SecureExam uses the Next.js App Router with all application code inside `src`.

```text
src/
├── app/
├── components/
├── hooks/
├── layouts/
├── lib/
├── middleware/
├── services/
├── types/
└── utils/
```

## `src/app`

Contains pages and route handlers.

- `page.tsx` is the public landing page.
- `login/page.tsx` handles sign-in.
- `register/page.tsx` handles account creation and Turnstile verification.
- `verify-otp/page.tsx` handles email OTP verification.
- `dashboard/page.tsx` displays the authenticated dashboard.
- `api/` contains backend route handlers.

## `src/components`

Reusable UI components.

- `Navbar`
- `Sidebar`
- `ExamCard`
- `UserCard`
- `ProtectedRoute`
- `OTPInput`
- `Turnstile`

## `src/hooks`

Client-side React hooks.

- `useAuth.ts` reads local auth state and exposes logout helpers.

## `src/layouts`

Shared page shells.

- `AuthLayout.tsx`
- `DashboardLayout.tsx`

## `src/lib`

Server and shared application logic.

- `auth.ts` handles password hashing, JWT creation, JWT verification, and OTP generation.
- `mail.ts` sends OTP emails through Gmail SMTP.
- `turnstile.ts` verifies Cloudflare Turnstile tokens.
- `users.ts` contains the current in-memory user store.
- `storage.ts` wraps browser localStorage access.
- `examData.ts` contains demo exam data.

## `src/middleware`

Reusable middleware helpers for API authorization.

The root `middleware.ts` file protects route-level navigation, especially `/dashboard`.

## `src/services`

Client-side service wrappers for API calls.

## `src/types`

Shared TypeScript types.

## `src/utils`

Small reusable helper functions.

## Current Data Storage

The app currently uses in-memory arrays for users, OTPs, and documents. This is fine for a final-project demo, but data resets when the server restarts.

For production, replace the in-memory stores with a database such as PostgreSQL, MySQL, MongoDB, or a managed database service.
