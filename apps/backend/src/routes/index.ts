import paintingArticlesRoutes from "./paintingArticlesRoutes";
import sessionRoutes from "./session";
import usersRoutes from "./users";
import { FastifyInstance, FastifyPluginAsync } from "fastify";

const controllers = [paintingArticlesRoutes, sessionRoutes, usersRoutes];

export default (app: FastifyInstance) =>
  controllers.forEach((controller) => controller(app, {}));
