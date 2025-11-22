export const frosthavenScenariosQuery = `*[_type == "frosthavenScenario"]{
  _id,
  title,
  slug,
  scenarioNumber,
  scenarioName,
  outcome,
  difficulty,
  playersCount,
  durationMinutes,
  mainImage,
  tags,
  _createdAt,
} | order(scenarioNumber asc)
`;

export const frosthavenScenarioBySlugQuery = `*[_type == "frosthavenScenario" && slug.current == $slug][0]{
  _id,
  title,
  slug,
  scenarioNumber,
  scenarioName,
  datePlayed,
  characters,
  outcome,
  difficulty,
  scenarioLevel,
  durationMinutes,
  rewards,
  tags,
  isSoloScenario,
  comment,
  mainImage,
  partyName,
  playersCount,
  _createdAt
}`;
