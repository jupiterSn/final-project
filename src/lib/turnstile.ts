type TurnstileResponse = {
  success: boolean;
  "error-codes"?: string[];
};

const VERIFY_URL = "https://challenges.cloudflare.com/turnstile/v0/siteverify";
const TURNSTILE_SECRET =
  process.env.CLOUDFLARE_TURNSTILE_SECRET_KEY ||
  "1x0000000000000000000000000000000AA";

export async function verifyTurnstileToken(token: string) {
  if (!token) {
    return false;
  }

  const formData = new FormData();
  formData.append("secret", TURNSTILE_SECRET);
  formData.append("response", token);

  const response = await fetch(VERIFY_URL, {
    method: "POST",
    body: formData,
  });

  const result = (await response.json()) as TurnstileResponse;

  if (!result.success) {
    console.error("Turnstile verification failed:", result["error-codes"]);
  }

  return result.success;
}
