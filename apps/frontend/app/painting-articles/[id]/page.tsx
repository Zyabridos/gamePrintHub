// the logic is overcomplicated per now to weird Next.js behavior
// (sometimes it gives params as a Promise, sometimes as a normal object)
// although in CSR it is always normal object, but the choice was made to SSR.
// TODO: investigate later and maybe simplify
import { apiFetch } from "@/lib/apiClient";

export const dynamic = "force-dynamic"; // this will disable static optimization for the page

export type PaintingArticle = {
  id: number;
  title: string;
  content: string;
  created_at: string;
  updated_at: string;
};

type PageParams =
  | { id: string } // normal case
  | Promise<{ id: string }>; // just in case types start acting weird

type PageProps = {
  params: PageParams;
};

async function resolveParams(params: PageParams): Promise<{ id?: string }> {
  // Just in case Next gives a promise
  // (await on a normal object will also just return the object)
  const resolved = await (params as any);
  return resolved ?? {};
}

async function getArticle(
  id: string | undefined,
): Promise<PaintingArticle | null> {
  console.log("[getArticle] raw id:", id);

  if (!id) {
    console.error("[getArticle] No id provided on server");
    return null;
  }

  const numericId = Number(id);
  if (Number.isNaN(numericId)) {
    console.error("[getArticle] Invalid numeric id on server:", id);
    return null;
  }

  const res = await apiFetch(`/api/painting-articles/${numericId}`, {
    cache: "no-store",
  });

  console.log("[getArticle] response status:", res.status, "url:", res.url);

  if (res.status === 404) {
    console.warn("[getArticle] article not found:", numericId);
    return null;
  }

  if (!res.ok) {
    console.error(
      "[getArticle] Failed to fetch painting article",
      await res.text(),
    );
    return null;
  }

  return (await res.json()) as PaintingArticle;
}

export default async function PaintingArticleDetailsPage(props: PageProps) {
  const { params } = props;

  const resolved = await resolveParams(params);
  console.log("[PaintingArticleDetailsPage] resolved params:", resolved);

  const article = await getArticle(resolved.id);

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
