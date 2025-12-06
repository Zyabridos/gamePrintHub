"use client";

import { useEffect, useState } from "react";

type Theme = "light" | "dark";

const THEME_STORAGE_KEY = "theme";

function getInitialTheme(): Theme {
  if (typeof window === "undefined") {
    return "light";
  }

  const stored = window.localStorage.getItem(THEME_STORAGE_KEY);
  if (stored === "light" || stored === "dark") {
    return stored;
  }

  // Fallback to system preference
  const prefersDark = window.matchMedia?.(
    "(prefers-color-scheme: dark)",
  ).matches;

  return prefersDark ? "dark" : "light";
}

function applyTheme(theme: Theme) {
  const root = document.documentElement;

  if (theme === "dark") {
    root.classList.add("dark");
  } else {
    root.classList.remove("dark");
  }
}

const ThemeToggle = () => {
  const [theme, setTheme] = useState<Theme>("light");
  const [isMounted, setIsMounted] = useState(false);

  // Initialize theme only on the client side
  useEffect(() => {
    const initialTheme = getInitialTheme();
    setTheme(initialTheme);
    applyTheme(initialTheme);
    setIsMounted(true);
  }, []);

  const toggleTheme = () => {
    setTheme((prev) => {
      const next: Theme = prev === "light" ? "dark" : "light";
      applyTheme(next);
      window.localStorage.setItem(THEME_STORAGE_KEY, next);
      return next;
    });
  };

  // do not render until mounted to avoid hydration mismatch
  if (!isMounted) return null;

  const isDark = theme === "dark";

  return (
    <button
      type="button"
      onClick={toggleTheme}
      className="inline-flex items-center gap-2 rounded-full border border-slate-300 px-3 py-1 text-xs font-medium shadow-sm transition hover:bg-slate-100 dark:border-slate-700 dark:hover:bg-slate-800"
      aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
    >
      <span className="hidden sm:inline">
        {isDark ? "Dark mode" : "Light mode"}
      </span>

      {/* Switch */}
      <span
        aria-hidden
        className="flex h-4 w-8 items-center rounded-full bg-slate-300 p-0.5 dark:bg-slate-600"
      >
        <span
          className={`h-3 w-3 rounded-full bg-white shadow transition-transform ${
            isDark ? "translate-x-4" : ""
          }`}
        />
      </span>
    </button>
  );
};

export { ThemeToggle };
