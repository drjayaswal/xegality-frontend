"use client";

import { useRef, useEffect, type KeyboardEvent } from "react";
import { Input } from "@/components/ui/input";

interface OTPInputProps {
  value: string;
  onChange: (value: string) => void;
  length?: number;
  disabled?: boolean;
}

export function OTPInput({
  value,
  onChange,
  length = 6,
  disabled = false,
}: OTPInputProps) {
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  useEffect(() => {
    inputRefs.current = inputRefs.current.slice(0, length);
  }, [length]);

  const handleChange = (index: number, inputValue: string) => {
    if (inputValue.length > 1) {
      // Handle paste
      const pastedValue = inputValue.slice(0, length);
      onChange(pastedValue);

      // Focus the last filled input or the last input
      const nextIndex = Math.min(pastedValue.length - 1, length - 1);
      inputRefs.current[nextIndex]?.focus();
      return;
    }

    const newValue = value.split("");
    newValue[index] = inputValue;
    onChange(newValue.join("").slice(0, length));

    // Move to next input if value is entered
    if (inputValue && index < length - 1) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (index: number, e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Backspace" && !value[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }

    if (e.key === "ArrowLeft" && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }

    if (e.key === "ArrowRight" && index < length - 1) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  return (
    <div className="flex gap-2 justify-center">
      {Array.from({ length }, (_, index) => (
        <Input
          key={index}
          ref={(el) => { inputRefs.current[index] = el; }}
          type="text"
          inputMode="numeric"
          pattern="[0-9]*"
          maxLength={1}
          value={value[index] || ""}
          onChange={(e) => handleChange(index, e.target.value)}
          onKeyDown={(e) => handleKeyDown(index, e)}
          disabled={disabled}
          className="w-12 h-12 text-center text-xl font-semibold bg-slate-50/50 border-2 border-slate-200 rounded-xl focus:bg-white focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 transition-all duration-200 sm:w-14 sm:h-14 sm:text-2xl"
        />
      ))}
    </div>
  );
}
