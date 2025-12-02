"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";

const DEFAULT_TITLE = "Painting the Walls – Quick, Rough, but Effective";

const DEFAULT_CONTENT = `When it comes to painting walls, especially in large areas like basements or terrain pieces, the goal is often to achieve a quick and effective result rather than a flawless finish. Here are some tips and techniques to help you paint walls efficiently while still achieving a visually appealing outcome.`;

export default function NewPaintingArticlePage() {
  const router = useRouter();
  const [title, setTitle] = useState(DEFAULT_TITLE);
  const [content, setContent] = useState(DEFAULT_CONTENT);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    try {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL;
      console.log("API URL:", apiUrl);

      const res = await fetch(`${apiUrl}/api/painting-articles`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title, content }),
      });

      console.log("sending POST to", `${apiUrl}/api/painting-articles`);

      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.error || "Failed to create article");
      }

      // On success, navigate back to the articles list
      router.push("/painting-articles");
    } catch (err: any) {
      setError(err.message ?? "Unknown error");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main className="mx-auto max-w-3xl px-4 py-8">
      <h1 className="mb-4 text-3xl font-bold">Create painting article</h1>
      <p className="mb-6 text-sm text-gray-400">
        Здесь можно написать статью про покраску стен / террейна. По умолчанию
        подставлен твой пример.
      </p>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="mb-1 block text-sm font-semibold">Title</label>
          <input
            className="w-full rounded-md border border-gray-600 bg-gray-900 px-3 py-2 text-sm"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>

        <div>
          <label className="mb-1 block text-sm font-semibold">Content</label>
          <textarea
            className="min-h-[300px] w-full rounded-md border border-gray-600 bg-gray-900 px-3 py-2 text-sm"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            required
          />
        </div>

        {error && <p className="text-sm text-red-400">{error}</p>}

        <button
          type="submit"
          disabled={isSubmitting}
          className="rounded-md bg-emerald-600 px-4 py-2 text-sm font-semibold hover:bg-emerald-500 disabled:opacity-60"
        >
          {isSubmitting ? "Saving…" : "Save article"}
        </button>
      </form>
    </main>
  );
}
