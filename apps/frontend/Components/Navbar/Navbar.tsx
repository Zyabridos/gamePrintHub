"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { cn } from "@/lib/utils";
import { useLocale } from "@/context/LocaleContext";
import { ThemeToggle } from "../ThemeToggle";

export function Navbar() {
  const pathname = usePathname();
  const { t, locale, setLocale } = useLocale();

  const navItems = [
    { href: "/3d-printing-storage", label: t.nav.printing, external: false },
    {
      href: "/painting-articles",
      label: t.nav.painting_articles,
      external: false,
    },
    {
      href: "https://github.com/Zyabridos/gamePrintHub",
      label: "Source Code",
      external: true,
    },
  ];

  return (
    <header className="border-b bg-white/80 backdrop-blur dark:bg-slate-900/80 sticky top-0 z-40">
      <nav className="mx-auto flex max-w-5xl items-center justify-between px-4 py-3">
        <Link href="/" className="flex items-center gap-2">
          <span className="text-xl font-bold tracking-tight">
            Games & Print Hub
          </span>
        </Link>

        <ul className="flex items-center gap-4 text-sm">
          {navItems.map((item) => {
            const isActive = !item.external && pathname.startsWith(item.href);

            const linkClasses = cn(
              "rounded-full px-3 py-1 transition-colors",
              isActive
                ? "bg-slate-900 text-white dark:bg-slate-100 dark:text-slate-900"
                : "text-slate-600 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-800",
            );

            return (
              <li key={item.href}>
                {item.external ? (
                  <a
                    href={item.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={linkClasses}
                  >
                    {item.label}
                  </a>
                ) : (
                  <Link href={item.href} className={linkClasses}>
                    {item.label}
                  </Link>
                )}
              </li>
            );
          })}
        </ul>

        {/* Language Switcher */}
        <div className="flex gap-2 text-sm">
          {(["en", "ru", "no"] as const).map((lng) => (
            <button
              key={lng}
              onClick={() => setLocale(lng)}
              className={cn(
                "px-2 py-1 rounded-md transition",
                locale === lng
                  ? "bg-slate-900 text-white dark:bg-slate-100 dark:text-slate-900"
                  : "text-slate-600 hover:bg-slate-200 dark:text-slate-300 dark:hover:bg-slate-800",
              )}
            >
              {lng.toUpperCase()}
            </button>
          ))}
        </div>
        <ThemeToggle />
      </nav>
    </header>
  );
}
