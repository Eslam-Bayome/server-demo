"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import LoginForm from "@/components/ui/auth/LoginForm/LoginForm";
import { login } from "@/integration/service/auth.service";
import { saveSession } from "@/lib/auth";
import { LoginPayload } from "@/integration/types/payload/auth.payload";
import { ROUTES } from "@/lib/constants";

export function LoginPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | undefined>();

  const handleSubmit = async (payload: LoginPayload) => {
    setIsLoading(true);
    setError(undefined);
    try {
      const response = await login(payload);
      // Persist token to localStorage and sync cookie for proxy.ts
      saveSession(response);
      router.push(ROUTES.dashboard);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Login failed. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return <LoginForm onSubmit={handleSubmit} isLoading={isLoading} error={error} />;
}
