"use client";

import { useLocale } from "@/context/LocaleContext";

export default function PrintingStoragePage() {
  const { t } = useLocale();

  return (
    <div className="space-y-6">
      <header className="space-y-3">
        <h1 className="text-3xl font-extrabold tracking-tight">
          {t.printing.title}
        </h1>
        <p className="max-w-2xl text-sm text-slate-600 dark:text-slate-300">
          {t.printing.description}
        </p>
      </header>

      <p className="text-sm text-slate-500">{t.printing.placeholder}</p>
    </div>
  );
}
