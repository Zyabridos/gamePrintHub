import Fastify from "fastify";
import dotenv from "dotenv";
import cors from "@fastify/cors";

import { paintingArticlesRoutes } from "./routes/painting-articles/paintingArticlesRoutes.js";

dotenv.config();

const server = Fastify({ logger: true });

const allowedOrigins = [
  process.env.DEVELOPMENT_FRONTEND_URL,
  process.env.PRODUCTION_FRONTEND_URL,
].filter((o): o is string => Boolean(o));

await server.register(cors, {
  origin: allowedOrigins, // string[]
  methods: ["GET", "POST", "OPTIONS"],
});

server.get("/health", async () => {
  return { status: "ok" };
});

// let it be here, evnt I will move it to a routes/index.ts later when I decide on architecture
server.register(paintingArticlesRoutes);

const start = async () => {
  try {
    const port = Number(process.env.PORT) || 5001;
    await server.listen({ port, host: "0.0.0.0" });
    console.log(`Backend running on http://localhost:${port}`);
  } catch (err) {
    server.log.error(err);
    process.exit(1);
  }
};

start();
