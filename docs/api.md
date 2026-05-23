# API Reference

All API routes live under `src/app/api`.

## Auth Routes

### `POST /api/auth/register`

Creates a new unverified user and sends an email OTP.

Request body:

```json
{
  "name": "Layla Hasan",
  "email": "layla@example.com",
  "password": "secure-password",
  "turnstileToken": "cloudflare-token"
}
```

Success response:

```json
{
  "message": "Registration successful. OTP sent to email.",
  "email": "layla@example.com"
}
```

### `POST /api/auth/verify-otp`

Verifies the OTP and sets the HTTP-only auth cookie.

Request body:

```json
{
  "email": "layla@example.com",
  "otp": "123456"
}
```

### `POST /api/auth/login`

Logs in a verified user and sets the HTTP-only auth cookie.

Request body:

```json
{
  "email": "layla@example.com",
  "password": "secure-password"
}
```

### `POST /api/auth/logout`

Clears the auth cookie.

### `GET /api/auth/me`

Returns the authenticated user from the auth cookie.

### `POST /api/auth/send-otp`

Sends a new OTP to an existing user.

Request body:

```json
{
  "email": "layla@example.com"
}
```

## Document Routes

### `GET /api/documents`

Returns documents visible to the authenticated user.

Admins can see all documents. Regular users see only documents assigned to their email.

### `POST /api/documents`

Creates a document. Admin only.

Request body:

```json
{
  "title": "Exam Instructions",
  "description": "Rules and timing for the exam.",
  "ownerEmail": "student@example.com"
}
```

### `PUT /api/documents/[id]`

Updates a document. Admin only.

### `DELETE /api/documents/[id]`

Deletes a document. Admin only.

## Error Style

API errors generally return:

```json
{
  "message": "Human-readable error message"
}
```
