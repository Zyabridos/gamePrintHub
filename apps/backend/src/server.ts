import Fastify from "fastify";
import dotenv from "dotenv";
import cors from "@fastify/cors";
import { fileURLToPath } from "url";
import path, { dirname } from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

import { paintingArticlesRoutes } from "./routes/painting-articles/paintingArticlesRoutes.js";

dotenv.config({
  path: path.resolve(__dirname, "../../", ".env"),
});

const server = Fastify({ logger: true });

const allowedOrigins = [
  process.env.DEVELOPMENT_FRONTEND_URL,
  process.env.PRODUCTION_FRONTEND_URL,
].filter((o): o is string => Boolean(o));

await server.register(cors, {
  origin: allowedOrigins, // string[]
  methods: ["GET", "POST", "OPTIONS"],
});

server.get("/api/health", async () => {
  return { status: "ok" };
});

// let it be here, evnt I will move it to a routes/index.ts later when I decide on architecture
server.register(paintingArticlesRoutes);

const start = async () => {
  try {
    const port = Number(process.env.API_PORT);
    await server.listen({ port, host: "0.0.0.0" });
    console.log(`Backend running on http://localhost:${port}`);
  } catch (err) {
    server.log.error(err);
    process.exit(1);
  }
};

start();
