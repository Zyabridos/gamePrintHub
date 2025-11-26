import React from "react";

type PaintingArticle = {
  id: number;
  title: string;
  content: string;
  created_at: string;
  updated_at: string;
};

type PageProps = {
  params: Promise<{ id: string }>;
};

async function getArticle(id: string): Promise<PaintingArticle | null> {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5001";

  const res = await fetch(`${apiUrl}/api/painting-articles/${id}`, {
    cache: "no-store",
  });

  if (res.status === 404) {
    return null;
  }

  if (!res.ok) {
    console.error("Failed to fetch painting article", await res.text());
    return null;
  }

  return res.json();
}

export default async function PaintingArticleDetailsPage({
  params,
}: PageProps) {
  // IMPORTANT: await params to get the actual params object
  const { id } = await params;

  const article = await getArticle(id);

  if (!article) {
    return (
      <main className="mx-auto max-w-3xl px-4 py-8">
        <h1 className="mb-4 text-3xl font-bold">Article not found</h1>
        <a
          href="/painting-articles"
          className="text-sm text-emerald-400 hover:underline"
        >
          ← Back to list
        </a>
      </main>
    );
  }

  const created = new Date(article.created_at).toLocaleString();
  const paragraphs = article.content.split(/\n\s*\n/);

  return (
    <main className="mx-auto max-w-3xl px-4 py-8">
      <a
        href="/painting-articles"
        className="mb-4 inline-block text-sm text-emerald-400 hover:underline"
      >
        ← Back to list
      </a>

      <h1 className="mb-2 text-3xl font-bold">{article.title}</h1>
      <p className="mb-6 text-xs text-gray-500">{created}</p>

      <article className="prose prose-invert max-w-none">
        {paragraphs.map((p, idx) => (
          <p key={idx}>{p}</p>
        ))}
      </article>
    </main>
  );
}
