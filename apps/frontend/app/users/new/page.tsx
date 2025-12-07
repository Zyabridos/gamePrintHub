"use client";

import { useTranslation } from "react-i18next";

import RegistrationForm from "@/Forms/Session/RegistrationForm";

export default function RegisterPage() {
  const { t } = useTranslation("auth");

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 transition-colors dark:bg-slate-950 dark:text-slate-50">
      <div className="mx-auto flex min-h-screen max-w-md flex-col px-4 py-8">
        <header className="mb-8 flex items-center justify-between">
          <h1 className="text-xl font-semibold tracking-tight">
            {t("signup.title")}
          </h1>
        </header>
        <h2>{t("signup.subtitle")}</h2>
        <RegistrationForm />
      </div>
    </div>
  );
}
