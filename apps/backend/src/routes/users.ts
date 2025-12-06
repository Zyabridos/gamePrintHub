// apps/backend/src/routes/users.ts
import { FastifyInstance, FastifyPluginAsync } from "fastify";
import bcrypt from "bcrypt";

import { db as realDb } from "../db/knex.js";

import type { UserPublic } from "@gameprinthub/shared-types";
import type { UserDb } from "../types/db/UserDb.js";
import { toUserPublic } from "../mappers/userManpper.js";

type DbType = typeof realDb;

export type UsersRoutesDeps = {
  db: DbType;
};

export const buildUsersRoutes = ({
  db,
}: UsersRoutesDeps): FastifyPluginAsync => {
  const usersRoutes: FastifyPluginAsync = async (app: FastifyInstance) => {
    // POST /api/users - create new user
    app.post<{
      Body: { username: string; email: string; password: string };
      Reply:
        | UserPublic
        | {
            error: string;
            message?: string;
          };
    }>("/api/users", async (request, reply) => {
      const { username, email, password } = request.body;

      if (!username || !email || !password) {
        return reply.status(400).send({ error: "Missing required fields" });
      }

      try {
        const existingUser = await db<UserDb>("users").where({ email }).first();

        if (existingUser) {
          return reply.code(422).send({
            error: "Email already exists",
            message: "Email already exists",
          });
        }
      } catch (error) {
        return reply.status(500).send({ error: "Database error" });
      }

      const password_hash = await bcrypt.hash(password, 10);

      const [newUser] = await db<UserDb>("users")
        .insert({ username, email, password_hash })
        .returning("*");

      const dto = toUserPublic(newUser);
      return reply.status(201).send(dto);
    });

    // GET /api/users/:id - get user by id
    app.get<{
      Params: { id: string };
      Reply:
        | UserPublic
        | {
            error: string;
          };
    }>("/api/users/:id", async (request, reply) => {
      const id = Number(request.params.id);

      if (Number.isNaN(id)) {
        return reply.status(400).send({ error: "Invalid ID" });
      }

      const user = await db<UserDb>("users").where({ id }).first();

      if (!user) {
        return reply.status(404).send({ error: "User not found" });
      }

      const dto = toUserPublic(user);
      return reply.send(dto);
    });
  };

  return usersRoutes;
};

// Default export with real dependencies
const usersRoutesDefault: FastifyPluginAsync = buildUsersRoutes({ db: realDb });

export default usersRoutesDefault;
