"use client";

import { LayoutGrid, List } from "lucide-react";
import SearchBar from "@/components/common/molecules/SearchBar/SearchBar";
import Button from "@/components/common/atoms/Button/Button";
import { ServerStatus } from "@/integration/types/response/server.response";
import { clsx } from "clsx";

type ViewMode = "grid" | "table";

interface FilterBarProps {
  search: string;
  onSearchChange: (value: string) => void;
  selectedStatus: ServerStatus | "all";
  onStatusChange: (status: ServerStatus | "all") => void;
  viewMode: ViewMode;
  onViewModeChange: (mode: ViewMode) => void;
}

const STATUS_OPTIONS: { value: ServerStatus | "all"; label: string }[] = [
  { value: "all", label: "All" },
  { value: "up", label: "Up" },
  { value: "degraded", label: "Degraded" },
  { value: "down", label: "Down" },
];

const FilterBar = ({
  search,
  onSearchChange,
  selectedStatus,
  onStatusChange,
  viewMode,
  onViewModeChange,
}: FilterBarProps) => {
  return (
    <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
        <SearchBar
          value={search}
          onChange={onSearchChange}
          placeholder="Search servers..."
          className="w-full sm:w-72"
        />

        <div className="flex items-center gap-1.5 rounded-lg border border-gray-200 bg-white p-1">
          {STATUS_OPTIONS.map(({ value, label }) => (
            <button
              key={value}
              onClick={() => onStatusChange(value)}
              className={clsx(
                "rounded-md px-3 py-1.5 text-xs font-medium transition-colors",
                selectedStatus === value
                  ? "bg-blue-600 text-white shadow-sm"
                  : "text-gray-600 hover:bg-gray-100"
              )}
            >
              {label}
            </button>
          ))}
        </div>
      </div>

      <div className="flex items-center gap-1 rounded-lg border border-gray-200 bg-white p-1">
        <button
          onClick={() => onViewModeChange("grid")}
          aria-label="Grid view"
          className={clsx(
            "rounded-md p-1.5 transition-colors",
            viewMode === "grid"
              ? "bg-blue-600 text-white"
              : "text-gray-500 hover:bg-gray-100"
          )}
        >
          <LayoutGrid size={16} />
        </button>
        <button
          onClick={() => onViewModeChange("table")}
          aria-label="Table view"
          className={clsx(
            "rounded-md p-1.5 transition-colors",
            viewMode === "table"
              ? "bg-blue-600 text-white"
              : "text-gray-500 hover:bg-gray-100"
          )}
        >
          <List size={16} />
        </button>
      </div>
    </div>
  );
};

export default FilterBar;
export type { FilterBarProps, ViewMode };
