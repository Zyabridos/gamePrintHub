// apps/backend/src/routes/paintingArticlesRoutes.ts
import { FastifyInstance, FastifyPluginAsync } from "fastify";
import { db } from "../../db/knex.js";

type PaintingArticle = {
  id: number;
  title: string;
  content: string;
  created_at: string;
  updated_at: string;
};

export const paintingArticlesRoutes: FastifyPluginAsync = async (
  app: FastifyInstance,
) => {
  // GET /api/painting-articles — list
  app.get("/api/painting-articles", async () => {
    const articles = await db<PaintingArticle>("painting_articles")
      .select("*")
      .orderBy("created_at", "desc");

    return articles;
  });

  // GET /api/painting-articles/:id — particular article
  app.get<{
    Params: { id: string };
  }>("/api/painting-articles/:id", async (request, reply) => {
    const id = Number(request.params.id);

    if (Number.isNaN(id)) {
      return reply.status(400).send({ error: "Invalid id" });
    }

    const article = await db<PaintingArticle>("painting_articles")
      .where({ id })
      .first();

    if (!article) {
      return reply.status(404).send({ error: "Article not found" });
    }

    return article;
  });

  // POST /api/painting-articles — create new article
  app.post<{
    Body: { title: string; content: string };
  }>("/api/painting-articles", async (request, reply) => {
    const { title, content } = request.body;

    if (!title || !content) {
      return reply
        .status(400)
        .send({ error: "Title and content are required" });
    }

    const [created] = await db<PaintingArticle>("painting_articles")
      .insert({ title, content })
      .returning("*");

    return reply.status(201).send(created);
  });
};
