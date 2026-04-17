"use client";

import { ReactNode } from "react";
import { clsx } from "clsx";

interface FormFieldProps {
  label: string;
  htmlFor?: string;
  error?: string;
  hint?: string;
  required?: boolean;
  children: ReactNode;
  className?: string;
}

const FormField = ({
  label,
  htmlFor,
  error,
  hint,
  required = false,
  children,
  className,
}: FormFieldProps) => {
  return (
    <div className={clsx("flex flex-col gap-1.5", className)}>
      <label
        htmlFor={htmlFor}
        className="text-sm font-medium text-gray-700"
      >
        {label}
        {required && <span className="ml-0.5 text-red-500">*</span>}
      </label>

      {children}

      {error && (
        <p role="alert" className="text-xs text-red-600">
          {error}
        </p>
      )}
      {hint && !error && <p className="text-xs text-gray-500">{hint}</p>}
    </div>
  );
};

export default FormField;
export type { FormFieldProps };
