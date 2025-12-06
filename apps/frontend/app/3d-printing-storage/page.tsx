"use client";

import { useTranslation } from "react-i18next";

export default function PrintingStoragePage() {
  const { t } = useTranslation("printing");

  return (
    <div className="space-y-6">
      <header className="space-y-3">
        <h1 className="text-3xl font-extrabold tracking-tight">{t("title")}</h1>
        <p className="max-w-2xl text-sm text-slate-600 dark:text-slate-300">
          {t("description")}
        </p>
      </header>

      <p className="text-sm text-slate-500">{t("placeholder")}</p>
    </div>
  );
}
