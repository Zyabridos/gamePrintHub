import {defineConfig} from 'sanity'
import {structureTool} from 'sanity/structure'
import {visionTool} from '@sanity/vision'
import schemaTypes from './schemaTypes/index.js'
import deskStructure from './deskStructure'

export default defineConfig({
  name: 'default',
  title: 'Knowledge-base-CMS',

  projectId: 'dbdl3glr',
  dataset: 'production',

  plugins: [
    structureTool({
      structure: deskStructure,
    }),
    visionTool(),
  ],

  schema: {
    types: schemaTypes,
  },
})
