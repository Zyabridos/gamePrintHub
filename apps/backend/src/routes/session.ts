import { FastifyInstance, FastifyPluginAsync } from "fastify";

const sessionRoutes: FastifyPluginAsync = async (app: FastifyInstance) => {
  // TODO: logout route
  // TODO: return unauthenticated user for GET /api/session - eventually only logged in users can access create/edit artucles
};

export default sessionRoutes;
