import {defineType, defineField} from 'sanity'

const frosthavenScenario = defineType({
  name: 'frosthavenScenario',
  title: 'Frosthaven Scenario',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96,
      },
      validation: (rule) => rule.required(),
    }),

    defineField({
      name: 'scenarioNumber',
      title: 'Scenario number',
      type: 'number',
      validation: (rule) => rule.min(1),
    }),
    defineField({
      name: 'scenarioName',
      title: 'Scenario name (official)',
      type: 'string',
    }),

    defineField({
      name: 'datePlayed',
      title: 'Date played',
      type: 'date',
      options: {dateFormat: 'yyyy-MM-dd'},
    }),
    defineField({
      name: 'partyName',
      title: 'Party name',
      type: 'string',
    }),
    defineField({
      name: 'playersCount',
      title: 'Players count',
      type: 'number',
      validation: (rule) => rule.min(1).max(4),
    }),

    defineField({
      name: 'difficulty',
      title: 'Difficulty',
      type: 'string',
      options: {
        list: [
          {title: 'Easy', value: 'easy'},
          {title: 'Normal', value: 'normal'},
          {title: 'Hard', value: 'hard'},
          {title: 'Brutal', value: 'brutal'},
        ],
        layout: 'radio',
      },
    }),
    defineField({
      name: 'scenarioLevel',
      title: 'Scenario level',
      type: 'number',
    }),

    defineField({
      name: 'characters',
      title: 'Characters',
      type: 'array',
      of: [
        {
          type: 'object',
          name: 'character',
          fields: [
            {
              name: 'name',
              title: 'Name',
              type: 'string',
            },
            {
              name: 'className',
              title: 'Class',
              type: 'string',
            },
            {
              name: 'level',
              title: 'Level',
              type: 'number',
            },
          ],
        },
      ],
    }),

    defineField({
      name: 'outcome',
      title: 'Outcome',
      type: 'string',
      options: {
        list: [
          {title: 'Success', value: 'success'},
          {title: 'Failed', value: 'failed'},
          {title: 'In progress', value: 'in_progress'},
        ],
        layout: 'radio',
      },
    }),
    defineField({
      name: 'durationMinutes',
      title: 'Duration (minutes)',
      type: 'number',
    }),
    defineField({
      name: 'rewards',
      title: 'Rewards',
      type: 'object',
      fields: [
        {
          name: 'xp',
          title: 'XP per character (approx)',
          type: 'number',
        },
        {
          name: 'gold',
          title: 'Gold per character (approx)',
          type: 'number',
        },
        {
          name: 'lootSummary',
          title: 'Loot / Special rewards',
          type: 'text',
          rows: 3,
        },
      ],
    }),

    defineField({
      name: 'tags',
      title: 'Tags',
      type: 'array',
      of: [{type: 'string'}],
    }),
    defineField({
      name: 'isSoloScenario',
      title: 'Solo scenario',
      type: 'boolean',
      initialValue: false,
    }),
    defineField({
      name: 'comment',
      title: 'Notes / comment',
      type: 'text',
      rows: 6,
    }),

    defineField({
      name: 'mainImage',
      title: 'Main image',
      type: 'image',
      options: {hotspot: true},
    }),
  ],

  orderings: [
    {
      title: 'Scenario number (asc)',
      name: 'scenarioNumberAsc',
      by: [{field: 'scenarioNumber', direction: 'asc'}],
    },
    {
      title: 'Date played (desc)',
      name: 'datePlayedDesc',
      by: [{field: 'datePlayed', direction: 'desc'}],
    },
  ],

  preview: {
    select: {
      title: 'title',
      scenarioNumber: 'scenarioNumber',
      scenarioName: 'scenarioName',
      datePlayed: 'datePlayed',
      difficulty: 'difficulty',
      outcome: 'outcome',
      media: 'mainImage',
    },
    prepare(selection) {
      const {title, scenarioNumber, scenarioName, datePlayed, difficulty, outcome, media} =
        selection

      const nr = scenarioNumber ? `#${scenarioNumber} ` : ''
      const subtitleParts: string[] = []

      if (scenarioName) subtitleParts.push(scenarioName)
      if (datePlayed) subtitleParts.push(datePlayed)
      if (difficulty) subtitleParts.push(`Difficulty: ${difficulty}`)
      if (outcome) subtitleParts.push(`Outcome: ${outcome}`)

      return {
        title: `${nr}${title || 'Untitled scenario'}`,
        subtitle: subtitleParts.join(' • '),
        media,
      }
    },
  },
})

export default frosthavenScenario
