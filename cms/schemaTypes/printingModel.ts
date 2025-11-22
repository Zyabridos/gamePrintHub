import {defineType, defineField} from 'sanity'

const printingModel = defineType({
  name: 'printingModel',
  title: '3D Printing Model / Storage Item',
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
      name: 'modelType',
      title: 'Model type',
      type: 'string',
      options: {
        list: [
          {title: 'Box', value: 'box'},
          {title: 'Organizer', value: 'organizer'},
          {title: 'Token holder', value: 'token-holder'},
        ],
        layout: 'radio',
      },
    }),

    defineField({
      name: 'sourceUrl',
      title: 'Source URL (STL / Printables / Thingiverse)',
      type: 'url',
    }),

    defineField({
      name: 'printSettings',
      title: 'Print settings',
      type: 'object',
      fields: [
        {
          name: 'material',
          title: 'Material',
          type: 'string',
          options: {
            list: [
              {title: 'PLA', value: 'PLA'},
              {title: 'PETG', value: 'PETG'},
              {title: 'ABS', value: 'ABS'},
              {title: 'Resin', value: 'Resin'},
            ],
          },
        },
        {
          name: 'layerHeight',
          title: 'Layer height (mm)',
          type: 'string', // 0.16, 0.2 draft, etc.
        },
        {
          name: 'infill',
          title: 'Infill',
          type: 'string', // 15% grid, 20% gyroid, etc.
        },
        {
          name: 'supports',
          title: 'Supports',
          type: 'string', // "none", "tree supports only under arches" etc.
        },
        {
          name: 'printer',
          title: 'Printer',
          type: 'string', // Bambu Lab A1
        },
      ],
    }),

    defineField({
      name: 'status',
      title: 'Status',
      type: 'string',
      options: {
        list: [
          {title: 'Planned', value: 'planned'},
          {title: 'Printed', value: 'printed'},
          {title: 'Failed', value: 'failed'},
        ],
        layout: 'radio',
      },
      initialValue: 'planned',
    }),

    // array of images
    defineField({
      name: 'resultPhotos',
      title: 'Result photos',
      type: 'array',
      of: [
        {
          type: 'image',
          options: {hotspot: true},
        },
      ],
    }),
  ],

  orderings: [
    {
      title: 'Title (A–Z)',
      name: 'titleAsc',
      by: [{field: 'title', direction: 'asc'}],
    },
    {
      title: 'Status (Printed first)',
      name: 'statusPrintedFirst',
      by: [{field: 'status', direction: 'asc'}], // printed/planned/failed
    },
  ],

  preview: {
    select: {
      title: 'title',
      modelType: 'modelType',
      status: 'status',
      media: 'resultPhotos.0',
    },
    prepare(selection) {
      const {title, modelType, status, media} = selection

      const typeLabel =
        modelType === 'box'
          ? 'Box'
          : modelType === 'organizer'
            ? 'Organizer'
            : modelType === 'token-holder'
              ? 'Token holder'
              : 'Model'

      const statusLabel =
        status === 'printed'
          ? 'Printed'
          : status === 'planned'
            ? 'Planned'
            : status === 'failed'
              ? 'Failed'
              : ''

      const subtitle = [typeLabel, statusLabel].filter(Boolean).join(' • ')

      return {
        title: title || 'Untitled model',
        subtitle,
        media,
      }
    },
  },
})

export default printingModel
