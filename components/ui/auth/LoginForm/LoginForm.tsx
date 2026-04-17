"use client";

import { useState } from "react";
import { Eye, EyeOff, Mail, Lock } from "lucide-react";
import Button from "@/components/common/atoms/Button/Button";
import Input from "@/components/common/atoms/Input/Input";
import { MOCK_CREDENTIALS } from "@/integration/mock_data/auth.mock";
import { LoginPayload } from "@/integration/types/payload/auth.payload";

interface LoginFormProps {
  onSubmit: (payload: LoginPayload) => Promise<void>;
  isLoading?: boolean;
  error?: string;
}

const LoginForm = ({ onSubmit, isLoading, error }: LoginFormProps) => {
  const [payload, setPayload] = useState<LoginPayload>({
    email: MOCK_CREDENTIALS.email,
    password: MOCK_CREDENTIALS.password,
  });
  const [showPassword, setShowPassword] = useState(false);
  const [validationErrors, setValidationErrors] = useState<
    Partial<LoginPayload>
  >({});

  const validate = (): boolean => {
    const errors: Partial<LoginPayload> = {};
    if (!payload.email) errors.email = "Email is required";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(payload.email))
      errors.email = "Enter a valid email address";
    if (!payload.password) errors.password = "Password is required";
    else if (payload.password.length < 6)
      errors.password = "Password must be at least 6 characters";
    setValidationErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    await onSubmit(payload);
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-5" noValidate>
      {error && (
        <div
          role="alert"
          className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700"
        >
          {error}
        </div>
      )}

      <Input
        type="email"
        label="Email address"
        placeholder="you@example.com"
        value={payload.email}
        onChange={(e) => setPayload((p) => ({ ...p, email: e.target.value }))}
        error={validationErrors.email}
        leftIcon={<Mail size={15} />}
        autoComplete="email"
        disabled={isLoading}
      />

      <Input
        type={showPassword ? "text" : "password"}
        label="Password"
        placeholder="••••••••"
        value={payload.password}
        onChange={(e) =>
          setPayload((p) => ({ ...p, password: e.target.value }))
        }
        error={validationErrors.password}
        leftIcon={<Lock size={15} />}
        rightIcon={
          <button
            type="button"
            onClick={() => setShowPassword((v) => !v)}
            className="text-gray-400 hover:text-gray-600"
            aria-label={showPassword ? "Hide password" : "Show password"}
          >
            {showPassword ? <EyeOff size={15} /> : <Eye size={15} />}
          </button>
        }
        autoComplete="current-password"
        disabled={isLoading}
      />

      <Button type="submit" variant="primary" fullWidth isLoading={isLoading}>
        Sign In
      </Button>
    </form>
  );
};

export default LoginForm;
export type { LoginFormProps };
