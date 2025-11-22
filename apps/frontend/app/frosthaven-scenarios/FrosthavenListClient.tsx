"use client";

import { useLocale } from "@/app/context/LocaleContext";
import Image from "next/image";
import Link from "next/link";
import { urlForImage } from "@/lib/sanityImage";

export default function FrosthavenListClient({ scenarios }) {
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

      <div className="grid gap-6 md:grid-cols-2">
        {scenarios.map((scenario) => (
          <Card key={scenario._id} scenario={scenario} />
        ))}
      </div>
    </div>
  );
}

function Card({ scenario }) {
  const { t } = useLocale();
  const href = `/frosthaven-scenarios/${scenario.slug?.current}`;

  return (
    <Link
      href={href}
      className="group flex flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm hover:-translate-y-1 hover:shadow-md transition"
    >
      {scenario.mainImage && (
        <div className="relative h-40">
          <Image
            fill
            alt={scenario.title}
            src={urlForImage(scenario.mainImage).width(800).height(400).url()}
            className="object-cover group-hover:scale-105 transition"
          />
        </div>
      )}

      <div className="p-4 space-y-2">
        <h2 className="font-semibold">
          {scenario.scenarioNumber && (
            <span className="mr-1 text-slate-500">
              #{scenario.scenarioNumber}
            </span>
          )}
          {scenario.title}
        </h2>

        <p className="text-xs text-slate-500">{scenario.scenarioName}</p>

        <p className="text-xs text-slate-600">
          {t.frosthavenList.dateLabel}:{" "}
          {new Date(scenario.datePlayed).toLocaleDateString()}
        </p>
      </div>
    </Link>
  );
}
