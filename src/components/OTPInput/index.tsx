"use client";

type OTPInputProps = {
  value: string;
  onChange: (value: string) => void;
};

export default function OTPInput({ value, onChange }: OTPInputProps) {
  return (
    <input
      type="text"
      inputMode="numeric"
      placeholder="Enter OTP Code"
      className="w-full rounded-lg bg-slate-800 p-3 text-center tracking-[10px] text-white"
      maxLength={6}
      value={value}
      onChange={(event) => onChange(event.target.value.replace(/\D/g, ""))}
    />
  );
}
