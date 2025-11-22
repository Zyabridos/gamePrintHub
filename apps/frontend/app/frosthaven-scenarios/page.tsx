"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";

import { sanityClient } from "@/lib/sanityClient";
import { frosthavenScenariosQuery } from "@/lib/queries";
import { urlForImage } from "@/lib/sanityImage";
import { useLocale } from "@/app/context/LocaleContext";

type Character = {
  name?: string;
  className?: string;
  level?: number;
};

type FrosthavenScenario = {
  _id: string;
  title: string;
  slug?: { current: string };
  mainImage?: any;
  scenarioNumber?: number;
  scenarioName?: string;
  datePlayed?: string;
  playersCount?: number;
  difficulty?: string;
  scenarioLevel?: number;
  characters?: Character[];
  outcome?: string;
  durationMinutes?: number;
  tags?: string[];
  isSoloScenario?: boolean;
};

export default function FrosthavenScenariosPage() {
  const { t } = useLocale();
  const [scenarios, setScenarios] = useState<FrosthavenScenario[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let isMounted = true;

    (async () => {
      try {
        const data = await sanityClient.fetch<FrosthavenScenario[]>(
          frosthavenScenariosQuery,
        );
        if (!isMounted) return;
        setScenarios(data || []);
      } catch (err) {
        console.error("Failed to fetch frosthaven scenarios:", err);
        if (!isMounted) return;
        setError("failed_to_fetch_scenarios");
      } finally {
        if (!isMounted) return;
        setLoading(false);
      }
    })();

    return () => {
      isMounted = false;
    };
  }, []);

  // loading state
  if (loading) {
    return (
      <div className="space-y-4">
        <h1 className="text-3xl font-extrabold tracking-tight">
          {t.frosthavenList.title}
        </h1>
        <p className="text-sm text-slate-600 dark:text-slate-300">
          Loading scenarios…
        </p>
      </div>
    );
  }

  // error state
  if (error) {
    return (
      <div className="space-y-4">
        <h1 className="text-3xl font-extrabold tracking-tight">
          {t.frosthavenList.title}
        </h1>
        <p className="text-sm text-red-600 dark:text-red-400">
          Не удалось загрузить сценарии из Sanity. Проверь настройки проекта
          (projectId, dataset, API version и публичный доступ) или попробуй
          позже.
        </p>
      </div>
    );
  }

  // empty state
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

  // normal state
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

      <div className="grid gap-6 md:grid-cols-2">
        {scenarios.map((scenario) => (
          <ScenarioCard key={scenario._id} scenario={scenario} />
        ))}
      </div>
    </div>
  );
}

function ScenarioCard({ scenario }: { scenario: FrosthavenScenario }) {
  const { t } = useLocale();
  const {
    title,
    scenarioNumber,
    scenarioName,
    mainImage,
    slug,
    datePlayed,
    playersCount,
    scenarioLevel,
    outcome,
    isSoloScenario,
  } = scenario;

  const formattedDate = datePlayed
    ? new Date(datePlayed).toLocaleDateString()
    : null;

  const href = slug?.current
    ? `/frosthaven-scenarios/${slug.current}`
    : undefined;

  const Wrapper: any = href ? Link : "div";

  return (
    <Wrapper
      href={href}
      className="group flex flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-md dark:border-slate-800 dark:bg-slate-900"
    >
      {mainImage && (
        <div className="relative h-40 w-full overflow-hidden">
          <Image
            src={urlForImage(mainImage).width(800).height(400).url()}
            alt={title}
            fill
            className="object-cover transition-transform duration-300 group-hover:scale-105"
          />
        </div>
      )}

      <div className="flex flex-1 flex-col gap-3 p-4">
        <div className="space-y-1">
          <h2 className="text-base font-semibold leading-tight">
            {scenarioNumber && (
              <span className="mr-1 text-slate-500">#{scenarioNumber}</span>
            )}
            {title}
          </h2>
          {scenarioName && (
            <p className="text-xs text-slate-500">{scenarioName}</p>
          )}
        </div>

        <div className="grid gap-1 text-xs text-slate-600 dark:text-slate-300">
          <div className="flex flex-wrap gap-x-4 gap-y-1">
            {formattedDate && (
              <span>
                {t.frosthavenList.dateLabel}: {formattedDate}
              </span>
            )}
            {playersCount && (
              <span>
                {t.frosthavenList.playersLabel}: {playersCount}
              </span>
            )}
            {scenarioLevel !== undefined && (
              <span>
                {t.frosthavenList.scenarioLevelLabel}: {scenarioLevel}
              </span>
            )}
            {isSoloScenario && (
              <span className="font-medium text-amber-600 dark:text-amber-400">
                {t.frosthavenList.soloLabel}
              </span>
            )}
          </div>

          {outcome && (
            <span className="text-xs text-slate-500">
              {t.frosthavenList.outcomeLabel}:{" "}
              <span className="font-medium">{outcome}</span>
            </span>
          )}
        </div>

        {href && (
          <div className="mt-1 text-xs font-medium text-slate-900 underline underline-offset-4 group-hover:no-underline dark:text-slate-100">
            {t.frosthavenList.openCta}
          </div>
        )}
      </div>
    </Wrapper>
  );
}
