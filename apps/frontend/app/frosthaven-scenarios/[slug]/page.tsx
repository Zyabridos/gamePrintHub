interface FrosthavenScenarioPageProps {
  params: {
    slug: string;
  };
}

export default function FrosthavenScenarioPage({
  params,
}: FrosthavenScenarioPageProps) {
  const { slug } = params;

  return (
    <main className="mx-auto max-w-3xl px-4 py-8">
      <h1 className="text-2xl font-bold mb-4">Scenario: {slug}</h1>
      <p className="text-sm text-gray-500">
        This scenario page is being migrated from Sanity CMS to PostgreSQL.
        Detailed content is temporarily unavailable.
      </p>
    </main>
  );
}
