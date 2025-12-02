"use client";

import { useLocale } from "@/app/context/LocaleContext";

interface Scenario {
  _id: string;
  title: string;
  scenarioName: string;
  scenarioNumber?: number;
  datePlayed: string;
  slug?: { current: string };
  mainImage?: File; // evnt string
}

export default function FrosthavenListClient({
  scenarios,
}: {
  scenarios: Scenario[];
}) {
  const { t } = useLocale();

  if (!scenarios || scenarios.length === 0) {
    return (
      <div className="space-y-4">
        <h1 className="text-3xl font-extrabold tracking-tight">
          {t.frosthavenList.title}
        </h1>
        <p className="text-sm text-slate-600 dark:text-slate-300">
          {t.frosthavenList.emptyText}
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <header className="space-y-3">
        <h1 className="text-3xl font-extrabold tracking-tight">
          {t.frosthavenList.title}
        </h1>
        <p className="max-w-2xl text-sm text-slate-600 dark:text-slate-300">
          {t.frosthavenList.description}
        </p>
      </header>
    </div>
  );
}
