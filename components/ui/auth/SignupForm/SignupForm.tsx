"use client";

import { useState } from "react";
import { Eye, EyeOff, Mail, Lock, User } from "lucide-react";
import Button from "@/components/common/atoms/Button/Button";
import Input from "@/components/common/atoms/Input/Input";
import { SignupPayload } from "@/integration/types/payload/auth.payload";

interface SignupFormProps {
  onSubmit: (payload: SignupPayload) => Promise<void>;
  isLoading?: boolean;
  error?: string;
}

type SignupErrors = Partial<Record<keyof SignupPayload, string>>;

const SignupForm = ({ onSubmit, isLoading, error }: SignupFormProps) => {
  const [payload, setPayload] = useState<SignupPayload>({
    name: "",
    email: "",
    password: "",
    confirm_password: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState<SignupErrors>({});

  const set = (field: keyof SignupPayload) => (e: React.ChangeEvent<HTMLInputElement>) =>
    setPayload((p) => ({ ...p, [field]: e.target.value }));

  const validate = (): boolean => {
    const e: SignupErrors = {};
    if (!payload.name.trim()) e.name = "Name is required";
    if (!payload.email) e.email = "Email is required";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(payload.email))
      e.email = "Enter a valid email address";
    if (!payload.password) e.password = "Password is required";
    else if (payload.password.length < 8)
      e.password = "Password must be at least 8 characters";
    if (!payload.confirm_password) e.confirm_password = "Please confirm your password";
    else if (payload.password !== payload.confirm_password)
      e.confirm_password = "Passwords do not match";
    setErrors(e);
    return Object.keys(e).length === 0;
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
        label="Full name"
        placeholder="John Doe"
        value={payload.name}
        onChange={set("name")}
        error={errors.name}
        leftIcon={<User size={15} />}
        autoComplete="name"
        disabled={isLoading}
      />

      <Input
        type="email"
        label="Email address"
        placeholder="you@example.com"
        value={payload.email}
        onChange={set("email")}
        error={errors.email}
        leftIcon={<Mail size={15} />}
        autoComplete="email"
        disabled={isLoading}
      />

      <Input
        type={showPassword ? "text" : "password"}
        label="Password"
        placeholder="Min. 8 characters"
        value={payload.password}
        onChange={set("password")}
        error={errors.password}
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
        autoComplete="new-password"
        disabled={isLoading}
      />

      <Input
        type={showPassword ? "text" : "password"}
        label="Confirm password"
        placeholder="••••••••"
        value={payload.confirm_password}
        onChange={set("confirm_password")}
        error={errors.confirm_password}
        leftIcon={<Lock size={15} />}
        autoComplete="new-password"
        disabled={isLoading}
      />

      <Button type="submit" variant="primary" fullWidth isLoading={isLoading}>
        Create Account
      </Button>
    </form>
  );
};

export default SignupForm;
export type { SignupFormProps };
