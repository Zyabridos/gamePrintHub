import paintingArticlesRoutes from "./paintingArticlesRoutes";
import sessionRoutes from "./session";
import { FastifyInstance, FastifyPluginAsync } from "fastify";

const controllers = [paintingArticlesRoutes, sessionRoutes];

export default (app: FastifyInstance) =>
  controllers.forEach((controller) => controller(app, {}));
