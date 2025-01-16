"use client";

import { toast } from "sonner";
import { useState, useReducer } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/app/components/ui";
// import { API_URL, API_KEY } from "@/app/constants";
import { otpReducer, initialOtpState } from "@/app/lib/otp";

export default function OTP() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [otpState, dispatch] = useReducer(otpReducer, initialOtpState);

  const handleOtpSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    try {
      const otpString = Object.values(otpState).join("");

      const response = await fetch(`endpoint`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ otp: otpString }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "OTP verification failed");
      }

      if (data.success) {
        toast.success("OTP verified successfully");
        dispatch({ type: "reset", payload: "" });
        router.push("/signin");
      } else {
        throw new Error(data.message || "Invalid OTP");
      }
    } catch (err) {
      dispatch({ type: "reset", payload: "" });
      toast.error(
        err instanceof Error ? err.message : "OTP verification failed"
      );
    } finally {
      setLoading(false);
    }
  };

  const isOtpValid = Object.values(otpState).every((value) => value !== "");

  const handleOtpChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    inputKey: string
  ) => {
    const value = e.target.value;
    const lastChar = value.slice(-1); // Get only the last character
    const numValue = lastChar === "" ? -1 : Number(lastChar);

    if ((numValue >= 0 && numValue < 10) || lastChar === "") {
      dispatch({ type: inputKey, payload: lastChar });

      const currentIndex = parseInt(inputKey.split("_")[1]) - 1;

      // Move to next input if a number was entered
      if (lastChar !== "") {
        const nextInput = document.getElementById(
          `otp-${currentIndex + 2}`
        ) as HTMLInputElement;
        if (nextInput) {
          nextInput.focus();
        }
      }
    }
  };

  const handleOtpPaste = (e: React.ClipboardEvent) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData("text").trim();

    if (pastedData.length === 6 && /^\d+$/.test(pastedData)) {
      const digits = pastedData.split("");
      digits.forEach((digit, index) => {
        dispatch({ type: `input_${index + 1}`, payload: digit });
      });
      // Focus last input after paste
      document.getElementById("otp-6")?.focus();
    }
  };

  return (
    <form onSubmit={handleOtpSubmit} className="flex flex-col gap-4">
      <div className="flex justify-between gap-2">
        {Object.keys(initialOtpState).map((key, index) => (
          <input
            key={key}
            type="text"
            pattern="\d*"
            maxLength={1}
            placeholder="*"
            inputMode="numeric"
            value={otpState[key]}
            id={`otp-${index + 1}`}
            className="w-12 h-12 text-center bg-[#283142] p-4 rounded-[12px] text-white placeholder:text-[#FFFFFF80] font-aloeSemBold text-[24px] leading-[22.4px] focus:outline-none focus:ring-0"
            onPaste={index === 0 ? handleOtpPaste : undefined}
            onChange={(e) => handleOtpChange(e, key)}
            onKeyDown={(e) => {
              const currentIndex = parseInt(key.split("_")[1]) - 1;

              switch (e.key) {
                case "Backspace":
                  if (!otpState[key]) {
                    const prevInput = document.getElementById(
                      `otp-${currentIndex}`
                    ) as HTMLInputElement;
                    if (prevInput) {
                      prevInput.focus();
                    }
                  }
                  break;
                case "Tab":
                  e.preventDefault();
                  const nextInput = document.getElementById(
                    `otp-${currentIndex + 2}`
                  ) as HTMLInputElement;
                  if (nextInput) {
                    nextInput.focus();
                  }
                  break;
                case "ArrowLeft":
                  e.preventDefault();
                  const leftInput = document.getElementById(
                    `otp-${currentIndex}`
                  ) as HTMLInputElement;
                  if (leftInput) {
                    leftInput.focus();
                  }
                  break;
                case "ArrowRight":
                  e.preventDefault();
                  const rightInput = document.getElementById(
                    `otp-${currentIndex + 2}`
                  ) as HTMLInputElement;
                  if (rightInput) {
                    rightInput.focus();
                  }
                  break;
              }
            }}
            onFocus={(e) => e.target.select()}
            autoComplete="off"
          />
        ))}
      </div>
      <Button type="submit" loading={loading} disabled={!isOtpValid || loading}>
        Verify OTP
      </Button>
    </form>
  );
}
