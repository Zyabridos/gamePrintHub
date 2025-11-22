import { sanityClient } from "@/lib/sanityClient";
import { frosthavenScenariosQuery } from "@/lib/queries";
import { urlForImage } from "@/lib/sanityImage";
import Link from "next/link";
import Image from "next/image";

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

export const revalidate = 60;

export default async function FrosthavenScenariosPage() {
  const scenarios: FrosthavenScenario[] = await sanityClient.fetch(
    frosthavenScenariosQuery,
  );

  if (!scenarios || scenarios.length === 0) {
    return (
      <div className="space-y-4">
        <h1 className="text-3xl font-extrabold tracking-tight">
          Frosthaven Scenarios
        </h1>
        <p className="text-sm text-slate-600 dark:text-slate-300">
          there will be a typo <strong>frosthavenScenario</strong> with
          localization.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <header className="space-y-3">
        <h1 className="text-3xl font-extrabold tracking-tight">
          Frosthaven Scenarios
        </h1>
        <p className="max-w-2xl text-sm text-slate-600 dark:text-slate-300">
          details
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

type ScenarioCardProps = { scenario: FrosthavenScenario };

function ScenarioCard({ scenario }: ScenarioCardProps) {
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
    ? new Date(datePlayed).toLocaleDateString("ru-RU")
    : null;

  const href = slug?.current
    ? `/frosthaven-scenarios/${slug.current}`
    : undefined;

  const Wrapper: any = href ? Link : "div";
  const wrapperProps = href ? { href } : {};

  return (
    <Wrapper
      {...wrapperProps}
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
            {formattedDate && <span>Date: {formattedDate}</span>}
            {playersCount && <span>Players Count: {playersCount}</span>}
            {scenarioLevel !== undefined && (
              <span>Scenario level: {scenarioLevel}</span>
            )}
            {isSoloScenario && (
              <span className="font-medium text-amber-600 dark:text-amber-400">
                Solo
              </span>
            )}
          </div>
          {outcome && (
            <span className="text-xs text-slate-500">
              Result: <span className="font-medium">{outcome}</span>
            </span>
          )}
        </div>

        {href && (
          <div className="mt-1 text-xs font-medium text-slate-900 underline underline-offset-4 group-hover:no-underline dark:text-slate-100">
            Open scenario →
          </div>
        )}
      </div>
    </Wrapper>
  );
}
