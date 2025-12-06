import { FastifyInstance, FastifyPluginAsync } from "fastify";
import type { PaintingArticle } from "../types/db/PaintingArticle";
import { db as realDb } from "../src/db/knex.js";

export type PaintingArticlesDeps = {
  db: typeof realDb;
};

export const buildPaintingArticlesRoutes = ({
  db,
}: PaintingArticlesDeps): FastifyPluginAsync => {
  const routes: FastifyPluginAsync = async (app: FastifyInstance) => {
    // POST /api/painting-articles
    app.post("/api/painting-articles", async (request, reply) => {
      const { title, content } = request.body as {
        title: string;
        content: string;
      };

      const [inserted] = await db<PaintingArticle>("painting_articles")
        .insert({ title, content })
        .returning("*");

      return reply.status(201).send(inserted);
    });

    // GET /api/painting-articles/:id
    app.get("/api/painting-articles/:id", async (request, reply) => {
      const id = Number(request.params.id);

      const article = await db<PaintingArticle>("painting_articles")
        .where({ id })
        .first();

      if (!article) {
        return reply.status(404).send({ error: "Not found" });
      }

      return reply.send(article);
    });
  };

  return routes;
};

// default for production
export default buildPaintingArticlesRoutes({ db: realDb });
