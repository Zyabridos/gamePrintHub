import { describe, it, expect } from "vitest";
import { calculateStats } from "../src/utils/ stats";
import { scenariosForStats } from "../__fixtures__/mockScenarios";

describe("calculateStats", () => {
  it("calculates statistics for non-empty array", () => {
    const result = calculateStats(scenariosForStats);

    expect(result.total).toBe(3);
    expect(result.successes).toBe(2);
    expect(result.failed).toBe(1);
    expect(result.successRate).toBe("0.67");
    expect(result.totalDuration).toBe(60 + 90 + 30);
    expect(result.avgPlayers).toBe(3.0);
  });

  it("returns zeros for empty array", () => {
    const result = calculateStats([]);

    expect(result.total).toBe(0);
    expect(result.successes).toBe(0);
    expect(result.failed).toBe(0);
    expect(result.successRate).toBe(0);
    expect(result.totalDuration).toBe(0);
    expect(result.avgPlayers).toBe(0);
  });

  it("handles scenarios with missing fields", () => {
    const scenarios = [
      {},
      { outcome: "success" }, // but without duration / playersCount
      { durationMinutes: 45 },
    ];

    const result = calculateStats(scenarios);

    expect(result.total).toBe(3);
    expect(result.successes).toBe(1);
    expect(result.totalDuration).toBe(45);
    expect(result.avgPlayers).toBe(0);
  });
});
