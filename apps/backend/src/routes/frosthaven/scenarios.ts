import { FastifyInstance } from "fastify";
import { sanity } from "../../plugins/sanityClient.js";
import {
  frosthavenScenariosQuery,
  frosthavenScenarioBySlugQuery,
} from "./queries.js";

export default async function scenarios(server: FastifyInstance) {
  // list
  server.get("/scenarios", async () => {
    return await sanity.fetch(frosthavenScenariosQuery);
  });

  // particular scenario
  server.get("/scenarios/:slug", async (req) => {
    const { slug } = req.params as { slug: string };
    return await sanity.fetch(frosthavenScenarioBySlugQuery, { slug });
  });
}
