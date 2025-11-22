export function calculateStats(scenarios: any[]) {
  const total = scenarios.length;

  const successes = scenarios.filter((s) => s.outcome === "success").length;
  const failed = scenarios.filter((s) => s.outcome === "failed").length;

  const totalDuration = scenarios.reduce(
    (sum, s) => sum + (s.durationMinutes || 0),
    0,
  );

  const avgPlayers =
    scenarios.reduce((sum, s) => sum + (s.playersCount || 0), 0) / (total || 1);

  return {
    total,
    successes,
    failed,
    successRate: total ? (successes / total).toFixed(2) : 0,
    totalDuration,
    avgPlayers: Number(avgPlayers.toFixed(1)),
  };
}
