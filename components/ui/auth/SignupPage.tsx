"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import SignupForm from "@/components/ui/auth/SignupForm/SignupForm";
import { signup } from "@/integration/service/auth.service";
import { saveSession } from "@/lib/auth";
import { SignupPayload } from "@/integration/types/payload/auth.payload";
import { ROUTES } from "@/lib/constants";

export function SignupPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | undefined>();

  const handleSubmit = async (payload: SignupPayload) => {
    setIsLoading(true);
    setError(undefined);
    try {
      const response = await signup(payload);
      saveSession(response);
      router.push(ROUTES.dashboard);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Sign up failed. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return <SignupForm onSubmit={handleSubmit} isLoading={isLoading} error={error} />;
}
