import Fastify from "fastify";
import { afterEach, beforeEach, describe, expect, it } from "vitest";
import { buildUsersRoutes } from "../src/routes/users.js";

type UserDb = {
  id: number;
  username: string;
  email: string;
  password_hash: string;
  created_at: string;
  updated_at: string;
};

let usersStore: UserDb[] = [];

// псевдо-knex для таблицы "users"
const dbMock = (<T extends UserDb>(tableName: string) => {
  if (tableName !== "users") {
    throw new Error(`Unexpected table: ${tableName}`);
  }

  return {
    where(where: Partial<UserDb>) {
      const [key, value] = Object.entries(where)[0] as [keyof UserDb, any];
      const filtered = usersStore.filter((u) => u[key] === value);

      return {
        async first(): Promise<T | undefined> {
          return filtered[0] as T | undefined;
        },
      };
    },

    insert(data: Partial<UserDb>) {
      const now = new Date().toISOString();
      const newUser: UserDb = {
        id: usersStore.length + 1,
        username: data.username as string,
        email: data.email as string,
        password_hash: data.password_hash as string,
        created_at: now,
        updated_at: now,
      };

      usersStore.push(newUser);

      return {
        async returning(): Promise<T[]> {
          return [newUser as T];
        },
      };
    },
  };
}) as any;

describe("users routes", () => {
  let app: ReturnType<typeof Fastify>;

  beforeEach(async () => {
    usersStore = [];

    app = Fastify();
    await app.register(buildUsersRoutes({ db: dbMock }));
    await app.ready();
  });

  afterEach(async () => {
    await app.close();
  });

  it("returns 400 if required fields are missing", async () => {
    const response = await app.inject({
      method: "POST",
      url: "/api/users",
      payload: {
        username: "test-user",
        password: "password123",
      },
    });

    expect(response.statusCode).toBe(400);

    const body = response.json() as { error: string };
    expect(body.error).toBe("Missing required fields");
  });

  it("returns 422 if a user with the same email already exists", async () => {
    usersStore.push({
      id: 1,
      username: "existing",
      email: "existing@example.com",
      password_hash: "hashed",
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    });

    const response = await app.inject({
      method: "POST",
      url: "/api/users",
      payload: {
        username: "new-user",
        email: "existing@example.com",
        password: "password123",
      },
    });

    expect(response.statusCode).toBe(422);

    const body = response.json() as { error: string; message?: string };
    expect(body.error).toBe("Email already exists");
    expect(body.message).toBe("Email already exists");
  });

  it("creates a user, hashes the password, and returns a DTO without password_hash", async () => {
    const response = await app.inject({
      method: "POST",
      url: "/api/users",
      payload: {
        username: "new-user",
        email: "user@example.com",
        password: "password123",
      },
    });

    expect(response.statusCode).toBe(201);

    const body = response.json() as {
      id: number;
      username: string;
      email: string;
      created_at: string;
      updated_at: string;
    };

    expect(body.id).toBe(1);
    expect(body.username).toBe("new-user");
    expect(body.email).toBe("user@example.com");
    expect(body).not.toHaveProperty("password_hash");

    const storedUser = usersStore[0];
    expect(storedUser.password_hash).not.toBe("password123");
    expect(storedUser.password_hash.length).toBeGreaterThan(10);
  });

  it("returns 400 if the id is invalid", async () => {
    const response = await app.inject({
      method: "GET",
      url: "/api/users/not-a-number",
    });

    expect(response.statusCode).toBe(400);

    const body = response.json() as { error: string };
    expect(body.error).toBe("Invalid ID");
  });

  it("returns 404 if the user is not found", async () => {
    const response = await app.inject({
      method: "GET",
      url: "/api/users/999",
    });

    expect(response.statusCode).toBe(404);

    const body = response.json() as { error: string };
    expect(body.error).toBe("User not found");
  });

  it("returns a user in UserPublic format if they exist", async () => {
    const now = new Date().toISOString();
    usersStore.push({
      id: 42,
      username: "existing-user",
      email: "existing@example.com",
      password_hash: "some-hash",
      created_at: now,
      updated_at: now,
    });

    const response = await app.inject({
      method: "GET",
      url: "/api/users/42",
    });

    expect(response.statusCode).toBe(200);

    const body = response.json() as {
      id: number;
      username: string;
      email: string;
      created_at: string;
      updated_at: string;
    };

    expect(body.id).toBe(42);
    expect(body.username).toBe("existing-user");
    expect(body.email).toBe("existing@example.com");
    expect(body.created_at).toBe(now);
    expect(body.updated_at).toBe(now);
    expect(body).not.toHaveProperty("password_hash");
  });
});
