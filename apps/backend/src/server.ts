import Fastify from "fastify";
import dotenv from "dotenv";

import frosthavenScenariosRoute from "./routes/frosthaven/scenarios.js";
import frosthavenStatsRoute from "./routes/frosthaven/stats.js";

dotenv.config();

const server = Fastify({ logger: true });

server.get("/health", async () => {
  return { status: "ok" };
});

// let it be here, evnt I will move it to a routes/index.ts later when I decide on architecture
server.register(frosthavenScenariosRoute, { prefix: "/api/frosthaven" });
server.register(frosthavenStatsRoute, { prefix: "/api/frosthaven" });

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
