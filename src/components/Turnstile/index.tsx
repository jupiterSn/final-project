"use client";

import Script from "next/script";
import { useEffect } from "react";

type TurnstileProps = {
  onVerify: (token: string) => void;
  onExpire?: () => void;
};

declare global {
  interface Window {
    onTurnstileVerify?: (token: string) => void;
    onTurnstileExpire?: () => void;
  }
}

const siteKey =
  process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY ||
  "1x00000000000000000000AA";

export default function Turnstile({ onVerify, onExpire }: TurnstileProps) {
  useEffect(() => {
    window.onTurnstileVerify = onVerify;
    window.onTurnstileExpire = onExpire;

    return () => {
      delete window.onTurnstileVerify;
      delete window.onTurnstileExpire;
    };
  }, [onExpire, onVerify]);

  return (
    <>
      <Script
        src="https://challenges.cloudflare.com/turnstile/v0/api.js"
        strategy="afterInteractive"
      />

      <div
        className="cf-turnstile"
        data-sitekey={siteKey}
        data-callback="onTurnstileVerify"
        data-expired-callback="onTurnstileExpire"
        data-appearance="always"
        data-theme="dark"
      />
    </>
  );
}
