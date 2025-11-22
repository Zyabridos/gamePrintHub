import { FastifyInstance } from "fastify";
import { sanity } from "../../plugins/sanityClient.js";
import { frosthavenScenariosQuery } from "./queries.js";
import { calculateStats } from "../../utils/ stats.js";

export default async function statsRoute(server: FastifyInstance) {
  server.get("/stats", async () => {
    const data = await sanity.fetch(frosthavenScenariosQuery);
    return calculateStats(data);
  });
}
