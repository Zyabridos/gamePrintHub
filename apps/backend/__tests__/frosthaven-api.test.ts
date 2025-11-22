import { describe, it, expect, vi, beforeEach } from "vitest";
import Fastify from "fastify";

import frosthavenScenariosRoute from "../src/routes/frosthaven/scenarios.js";
import frosthavenStatsRoute from "../src/routes/frosthaven/stats.js";
import { mockScenarios } from "../__fixtures__/mockScenarios.js";
import { sanity } from "../src/plugins/sanityClient.js";

// mock sanity client
vi.mock("../src/plugins/sanityClient.js", () => {
  return {
    sanity: {
      fetch: vi.fn(),
    },
  };
});

// fetch mock for easier access
const fetchMock = sanity.fetch as unknown as ReturnType<typeof vi.fn>;

const buildTestServer = () => {
  const app = Fastify();

  app.get("/health", async () => ({ status: "ok" }));

  app.register(frosthavenScenariosRoute, { prefix: "/api/frosthaven" });
  app.register(frosthavenStatsRoute, { prefix: "/api/frosthaven" });

  return app;
};

describe("Frosthaven API routes", () => {
  beforeEach(() => {
    fetchMock.mockReset();
  });

  it("GET /health returns ok", async () => {
    const app = buildTestServer();

    const response = await app.inject({
      method: "GET",
      url: "/health",
    });

    expect(response.statusCode).toBe(200);
    expect(response.json()).toEqual({ status: "ok" });
  });

  it("GET /api/frosthaven/scenarios returns scenarios list", async () => {
    const app = buildTestServer();

    fetchMock.mockResolvedValueOnce(mockScenarios);

    const response = await app.inject({
      method: "GET",
      url: "/api/frosthaven/scenarios",
    });

    expect(response.statusCode).toBe(200);
    const body = response.json();

    expect(body).toEqual(mockScenarios);
    expect(fetchMock).toHaveBeenCalledTimes(1);
  });

  it("GET /api/frosthaven/scenarios/:slug returns one scenario", async () => {
    const app = buildTestServer();

    fetchMock.mockResolvedValueOnce(mockScenarios[0]);

    const response = await app.inject({
      method: "GET",
      url: "/api/frosthaven/scenarios/scenario-1",
    });

    expect(response.statusCode).toBe(200);
    const body = response.json();

    expect(body).toEqual(mockScenarios[0]);
    expect(fetchMock).toHaveBeenCalledTimes(1);
  });

  it("GET /api/frosthaven/stats returns statistics", async () => {
    const app = buildTestServer();

    fetchMock.mockResolvedValueOnce(mockScenarios);

    const response = await app.inject({
      method: "GET",
      url: "/api/frosthaven/stats",
    });

    expect(response.statusCode).toBe(200);
    const body = response.json();

    expect(body).toMatchObject({
      total: 2,
      successes: 1,
      failed: 1,
      totalDuration: 150,
    });

    expect(body.successRate).toBeDefined();
    expect(body.avgPlayers).toBeDefined();
  });
});
