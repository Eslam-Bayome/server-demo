"use client";

import { useState, useCallback } from "react";
import {
  ServerStatus,
  SortField,
  SortOrder,
  SortConfig,
} from "@/integration/types/response/server.response";
import { ViewMode } from "@/components/ui/dashboard/FilterBar/FilterBar";
import useQueryParams from "@/hooks/useQueryParams";

export function useDashboardFilters() {
  const [{ status, view }, setParams] = useQueryParams(["status", "view"]);
  const [search, setSearch] = useState("");
  const [sortConfig, setSortConfig] = useState<SortConfig | undefined>();

  const setStatus = useCallback(
    (value: ServerStatus | "all") =>
      setParams({ status: value === "all" ? undefined : value }),
    [setParams],
  );

  const setView = useCallback(
    (value: ViewMode) =>
      setParams({ view: value === "grid" ? undefined : value }),
    [setParams],
  );

  const handleSort = useCallback((field: SortField) => {
    setSortConfig((prev) => {
      if (prev?.field === field) {
        const nextOrder: SortOrder = prev.order === "asc" ? "desc" : "asc";
        return { field, order: nextOrder };
      }
      return { field, order: "asc" };
    });
  }, []);

  return {
    search,
    setSearch,
    status: (status ?? "all") as ServerStatus | "all",
    setStatus,
    view: (view ?? "grid") as ViewMode,
    setView,
    sortConfig,
    handleSort,
  };
}
