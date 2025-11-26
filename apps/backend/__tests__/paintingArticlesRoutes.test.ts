import { describe, it, expect, beforeAll, afterAll } from "vitest";
import Fastify from "fastify";
import { paintingArticlesRoutes } from "../src/routes/painting-articles/paintingArticlesRoutes";
import { db } from "../src/db/knex";

describe("paintingArticlesRoutes", () => {
  const app = Fastify();

  beforeAll(async () => {
    app.register(paintingArticlesRoutes);
    await app.ready();
    // clear the table before tests
    await db("painting_articles").del();
  });

  afterAll(async () => {
    await app.close();
    await db.destroy();
  });

  it("creates and reads article", async () => {
    const createRes = await app.inject({
      method: "POST",
      url: "/api/painting-articles",
      payload: {
        title: "Test article",
        content: "Some content",
      },
    });

    expect(createRes.statusCode).toBe(201);
    const created = createRes.json() as { id: number };

    const getRes = await app.inject({
      method: "GET",
      url: `/api/painting-articles/${created.id}`,
    });

    expect(getRes.statusCode).toBe(200);
    const article = getRes.json() as { title: string; content: string };

    expect(article.title).toBe("Test article");
    expect(article.content).toBe("Some content");
  });
});
