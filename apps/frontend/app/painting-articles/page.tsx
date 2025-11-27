import React from "react";

type PaintingArticle = {
  id: number;
  title: string;
  content: string;
  created_at: string;
  updated_at: string;
};

async function getArticles(): Promise<PaintingArticle[]> {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;

  const res = await fetch(`${apiUrl}/api/painting-articles`, {
    // so we always get fresh data
    cache: "no-store",
  });

  if (!res.ok) {
    console.error("Failed to fetch painting articles");
    return [];
  }

  return res.json();
}

export default async function PaintingArticlesListPage() {
  const articles = await getArticles();

  return (
    <main className="mx-auto max-w-3xl px-4 py-8">
      <div className="mb-6 flex items-center justify-between gap-4">
        <h1 className="text-3xl font-bold">Painting articles</h1>
        <a
          href="/painting-articles/new"
          className="rounded-md bg-emerald-600 px-4 py-2 text-sm font-semibold hover:bg-emerald-500"
        >
          New article
        </a>
      </div>

      {articles.length === 0 && (
        <p className="text-sm text-gray-400">
          Пока статей нет. Нажми «New article», чтобы создать первую.
        </p>
      )}

      <ul className="space-y-4">
        {articles.map((article) => (
          // apps/frontend/app/painting-articles/page.tsx (внутри map)

          <li
            key={article.id}
            className="rounded-lg border border-gray-700 bg-gray-900/60 p-4"
          >
            <a href={`/painting-articles/${article.id}`}>
              <h2 className="text-xl font-semibold hover:underline">
                {article.title}
              </h2>
            </a>
            <p className="mt-1 text-xs text-gray-500">
              {new Date(article.created_at).toLocaleString()}
            </p>
            <p className="mt-3 text-sm text-gray-200">
              {article.content.length > 300
                ? `${article.content.slice(0, 300)}…`
                : article.content}
            </p>
          </li>
        ))}
      </ul>
    </main>
  );
}
