"use client";

import React from "react";
import Link from "next/link";
import { useTranslation } from "react-i18next";
import { usePathname } from "next/navigation";

import routes from "@/routes";
import { cn } from "@/lib/utils";

import ThemeToggle from "../ThemeToggle";
import LanguageSwitcher from "../LanguageSwitcher";

const baseURL = "http://localhost:3000";

const GuestNavbar: React.FC = () => {
  const { t } = useTranslation("nav");
  const pathname = usePathname();

  const navItems = [
    { href: routes.app.printing.list(), label: t("printing") },
    { href: routes.app.paintingArticles.list(), label: t("painting_articles") },
    { href: routes.app.session.new(), label: t("signIn") },
    { href: routes.app.users.create(), label: t("signUp") },
  ];

  return (
    <header className="border-b bg-white/80 backdrop-blur dark:bg-slate-900/80 sticky top-0 z-40">
      <nav className="mx-auto flex max-w-5xl items-center justify-between px-4 py-3">
        <Link href="/" className="flex items-center gap-2">
          <span className="text-xl font-bold tracking-tight">
            {t("appName")}
          </span>
        </Link>

        <ul className="flex items-center gap-4 text-sm">
          {navItems.map((item) => {
            const isActive = pathname.startsWith(item.href);

            return (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className={cn(
                    "rounded-full px-3 py-1 transition-colors",
                    isActive
                      ? "bg-slate-900 text-white dark:bg-slate-100 dark:text-slate-900"
                      : "text-slate-600 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-800",
                  )}
                >
                  {item.label}
                </Link>
              </li>
            );
          })}
        </ul>
        <LanguageSwitcher />
        <ThemeToggle />
      </nav>
    </header>
  );
};

export default GuestNavbar;
