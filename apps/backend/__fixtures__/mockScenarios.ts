export const mockScenarios = [
  {
    _id: "1",
    title: "Scenario 1",
    slug: { current: "scenario-1" },
    outcome: "success",
    durationMinutes: 60,
    playersCount: 4,
  },
  {
    _id: "2",
    title: "Scenario 2",
    slug: { current: "scenario-2" },
    outcome: "failed",
    durationMinutes: 90,
    playersCount: 3,
  },
];

export const scenariosForStats = [
  {
    outcome: "success",
    durationMinutes: 60,
    playersCount: 4,
  },
  {
    outcome: "failed",
    durationMinutes: 90,
    playersCount: 3,
  },
  {
    outcome: "success",
    durationMinutes: 30,
    playersCount: 2,
  },
];

export default mockScenarios;
