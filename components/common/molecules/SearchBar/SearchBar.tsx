"use client";

import { InputHTMLAttributes, useCallback } from "react";
import { Search, X } from "lucide-react";
import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

interface SearchBarProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, "onChange"> {
  value: string;
  onChange: (value: string) => void;
  onClear?: () => void;
  placeholder?: string;
  className?: string;
}

const SearchBar = ({
  value,
  onChange,
  onClear,
  placeholder = "Search...",
  className,
  ...props
}: SearchBarProps) => {
  const handleClear = useCallback(() => {
    onChange("");
    onClear?.();
  }, [onChange, onClear]);

  return (
    <div className={twMerge(clsx("relative flex items-center"), className)}>
      <Search
        size={16}
        className="pointer-events-none absolute left-3 text-gray-400"
      />

      <input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className={clsx(
          "w-full rounded-lg border border-gray-300 bg-white py-2 pl-9 pr-9 text-sm",
          "text-gray-900 placeholder-gray-400",
          "transition-colors focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200"
        )}
        {...props}
      />

      {value && (
        <button
          type="button"
          onClick={handleClear}
          className="absolute right-3 rounded text-gray-400 transition-colors hover:text-gray-600"
          aria-label="Clear search"
        >
          <X size={14} />
        </button>
      )}
    </div>
  );
};

export default SearchBar;
export type { SearchBarProps };
