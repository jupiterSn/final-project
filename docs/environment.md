# Environment Setup

Create `.env.local` in the project root.

This file must never be committed. It is ignored by `.gitignore`.

## Required Variables

```env
EMAIL_USER=your-gmail-address@gmail.com
EMAIL_PASS=your-gmail-app-password
```

`EMAIL_PASS` must be a Gmail app password. A normal Gmail password will not work.

## Recommended Variables

```env
JWT_SECRET=replace-with-a-long-random-secret
JWT_EXPIRES_IN=1h
```

Use a long random value for `JWT_SECRET`.

## Cloudflare Turnstile

For local development, the app has Cloudflare Turnstile test-key fallbacks.

For production, set real keys:

```env
NEXT_PUBLIC_TURNSTILE_SITE_KEY=your-cloudflare-site-key
CLOUDFLARE_TURNSTILE_SECRET_KEY=your-cloudflare-secret-key
```

## Gmail App Password Setup

1. Open your Google Account.
2. Enable 2-Step Verification.
3. Create an app password for Mail.
4. Put the generated app password in `EMAIL_PASS`.
5. Restart the dev server after editing `.env.local`.

## Common Email Issues

If OTP email fails:

- Confirm `EMAIL_USER` is a Gmail address.
- Confirm `EMAIL_PASS` is an app password.
- Restart the dev server after changing `.env.local`.
- Check whether your network blocks SMTP.
- The app uses Gmail SMTP on port `587` with TLS.

## Do Not Commit Secrets

Before pushing, you can check that `.env.local` is not tracked:

```bash
git ls-files .env.local
```

The command should print nothing.
