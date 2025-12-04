"use client";

import Link from "next/link";
import { useLocale } from "@/app/context/LocaleContext";

// TODO: remove hardcoded routes, do it via map.

export default function HomePage() {
  const { t } = useLocale();

  return (
    <div className="space-y-10">
      <section className="space-y-4">
        <h1 className="text-4xl font-extrabold tracking-tight">
          {t.home.title}
        </h1>
        <p className="max-w-2xl text-base text-slate-600 dark:text-slate-300">
          {t.home.description}
        </p>
      </section>

      <section className="grid gap-6 md:grid-cols-2">
        {/* 3D Printing Storage */}
        <Link
          href="/3d-printing-storage"
          className="group block rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition hover:-translate-y-1 hover:shadow-md dark:border-slate-800 dark:bg-slate-900"
        >
          <h2 className="mb-2 text-xl font-semibold flex items-center justify-between">
            {t.home.printingTitle}
            <span className="text-xs rounded-full border px-2 py-0.5 text-slate-500 group-hover:border-slate-400 dark:text-slate-400">
              {t.home.printingBadge}
            </span>
          </h2>
          <p className="mb-4 text-sm text-slate-600 dark:text-slate-300">
            {t.home.printingDescription}
          </p>
          <span className="text-sm font-medium text-slate-900 underline underline-offset-4 group-hover:no-underline dark:text-slate-100">
            {t.home.printingCta}
          </span>
        </Link>

        {/* Painting Articles */}
        <Link
          href="/painting-articles"
          className="group block rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition hover:-translate-y-1 hover:shadow-md dark:border-slate-800 dark:bg-slate-900"
        >
          <h2 className="mb-2 text-xl font-semibold flex items-center justify-between">
            Printing articles
            <span className="text-xs rounded-full border px-2 py-0.5 text-slate-500 group-hover:border-slate-400 dark:text-slate-400">
              badge
            </span>
          </h2>
          <p className="mb-4 text-sm text-slate-600 dark:text-slate-300">
            description
          </p>
          <span className="text-sm font-medium text-slate-900 underline underline-offset-4 group-hover:no-underline dark:text-slate-100">
            go to
          </span>
        </Link>
      </section>
    </div>
  );
}
