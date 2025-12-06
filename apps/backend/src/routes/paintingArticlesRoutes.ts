import { FastifyInstance, FastifyPluginAsync } from "fastify";
import type { PaintingArticlePublic } from "@gameprinthub/shared-types";
import { db } from "../db/knex.js";

const paintingArticlesRoutes: FastifyPluginAsync = async (
  app: FastifyInstance,
) => {
  // GET /api/painting-articles — SSR (for SEO + performance) with some CSR "islands":
  // ArticlesSearch, TagFiler, Pagination and so on (not implemented yet, per now it is simple list)
  app.get("/api/painting-articles", async () => {
    const articles = await db<PaintingArticlePublic>("painting_articles")
      .select("*")
      .orderBy("created_at", "desc");

    return articles;
  });

  // GET /api/painting-articles/:id - SSR (for SEO + performance)
  app.get<{
    Params: { id: string };
  }>("/api/painting-articles/:id", async (request, reply) => {
    const id = Number(request.params.id);

    if (Number.isNaN(id)) {
      return reply.status(400).send({ error: "Invalid id" });
    }

    const article = await db<PaintingArticlePublic>("painting_articles")
      .where({ id })
      .first();

    if (!article) {
      return reply.status(404).send({ error: "Article not found" });
    }

    return article;
  });

  // POST /api/painting-articles — CSR (no SEO needed, easier to handle forms this way)
  app.post<{
    Body: { title: string; content: string };
  }>("/api/painting-articles", async (request, reply) => {
    const { title, content } = request.body;

    if (!title || !content) {
      return reply
        .status(400)
        .send({ error: "Title and content are required" });
    }

    const [created] = await db<PaintingArticlePublic>("painting_articles")
      .insert({ title, content })
      .returning("*");

    return reply.status(201).send(created);
  });
};

// TODO:
// edit article: /painting-articles/[id]/edit (per now I consider CSR here, since it is not public data, so SEO is not important. And also to simplify form handling)
// user`s articles: /my/painting-articles (per now I consider CSR here, since it is not public data, so SEO is not important)

export default paintingArticlesRoutes;
