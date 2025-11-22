import groq from "groq";

export const frosthavenScenariosQuery = groq`
  *[_type == "frosthavenScenario"] | order(scenarioNumber asc) {
    _id,
    _createdAt,
    title,
    slug,
    mainImage,
    scenarioNumber,
    scenarioName,
    datePlayed,
    partyName,
    playersCount,
    difficulty,
    scenarioLevel,
    characters,
    outcome,
    durationMinutes,
    rewards,
    tags,
    isSoloScenario,
    comment
  }
`;

export const frosthavenScenarioBySlugQuery = groq`
  *[_type == "frosthavenScenario" && slug.current == $slug][0]{
    _id,
    _createdAt,
    title,
    slug,
    mainImage,
    scenarioNumber,
    scenarioName,
    datePlayed,
    partyName,
    playersCount,
    difficulty,
    scenarioLevel,
    characters,
    outcome,
    durationMinutes,
    rewards,
    tags,
    isSoloScenario,
    comment
  }
`;
