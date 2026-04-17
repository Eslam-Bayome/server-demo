"use client";

import { useSearchParams, useRouter, usePathname } from "next/navigation";
import { useCallback } from "react";

// Define overloads for the custom hook to ensure type safety
// Overload for a single query parameter name (string)
function useQueryParams<T extends string>(
  name: T,
): [string | undefined, (newValue: string | number | undefined) => void];
// Overload for multiple query parameter names (array of strings)
function useQueryParams<T extends string>(
  names: T[],
): [
  { [K in T]?: string },
  (newValues: Partial<{ [K in T]: string | number | undefined }>) => void,
];

/**
 * A custom hook to manage URL query parameters like React state.
 * It can handle a single parameter or multiple parameters at once.
 *
 * @param {string | string[]} nameOrNames - The name of a single query parameter or an array of names.
 * @returns A state-like array with the current value(s) and a function to update them.
 */
function useQueryParams<T extends string>(nameOrNames: T | T[]) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  /**
   * Updates the URL's query string with new parameters.
   * This function merges the new values with existing search parameters.
   *
   * @param {Record<string, string | undefined>} newValues - An object of query parameters to update.
   */
  const setQuery = useCallback(
    (newValues: Record<string, string | number | undefined>) => {
      const params = new URLSearchParams(searchParams.toString());

      // Iterate over the new values to set or delete parameters
      for (const [key, value] of Object.entries(newValues)) {
        if (!value || value === "undefined") {
          params.delete(key);
        } else {
          params.set(key, String(value));
        }
      }

      // Generate the new query string
      const queryString = params.toString();
      // Create the new URL path with the updated query string
      const newPath = queryString ? `${pathname}?${queryString}` : pathname;

      // Push the new state to the router without scrolling to the top
      router.push(newPath, { scroll: false });
    },
    [searchParams, pathname, router],
  );

  // --- Logic for handling a single query parameter ---
  if (typeof nameOrNames === "string") {
    const name = nameOrNames;
    const value = searchParams.get(name) ?? undefined;

    /**
     * Setter function for a single query parameter.
     * @param {string | undefined} newValue - The new value for the parameter.
     */
    const setValue = (newValue: string | undefined) => {
      setQuery({ [name]: newValue });
    };

    return [value, setValue] as const;
  }

  // --- Logic for handling multiple query parameters ---
  if (Array.isArray(nameOrNames)) {
    const names = nameOrNames;

    // Create an object with the current values of the specified parameters
    const values = names.reduce(
      (acc, name) => {
        const paramValue = searchParams.get(name);
        if (paramValue !== null) {
          acc[name] = paramValue;
        }
        return acc;
      },
      {} as { [K in T]?: string },
    );

    /**
     * Setter function for multiple query parameters.
     * @param {Partial<{ [K in T]: string | undefined }>} newValues - An object with new values for a subset of the parameters.
     */
    const setValues = (
      newValues: Partial<{ [K in T]: string | undefined }>,
    ) => {
      setQuery(newValues as Record<string, string | number | undefined>);
    };

    return [values, setValues] as const;
  }

  // Fallback for invalid input, though TypeScript should prevent this
  throw new Error(
    "useQueryParam must be called with a string or an array of strings.",
  );
}

export default useQueryParams;
