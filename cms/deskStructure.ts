import {DocumentIcon, FolderIcon, ImageIcon, ComposeIcon, CogIcon} from '@sanity/icons'

const deskStructure = (S) =>
  S.list()
    .title('Content')
    .items([
      // Frosthaven
      S.listItem()
        .title('Frosthaven')
        .icon(FolderIcon)
        .child(
          S.list()
            .title('Frosthaven')
            .items([
              S.listItem()
                .title('Scenarios')
                .icon(ComposeIcon)
                .schemaType('frosthavenScenario')
                .child(
                  S.documentTypeList('frosthavenScenario')
                    .title('Scenarios')
                    .defaultOrdering([{field: 'scenarioNumber', direction: 'asc'}]),
                ),
            ]),
        ),

      // 3D Printing
      S.listItem()
        .title('3D Printing')
        .icon(ImageIcon)
        .child(
          S.list()
            .title('3D Printing')
            .items([
              S.listItem()
                .title('Models')
                .icon(DocumentIcon)
                .schemaType('printingModel')
                .child(
                  S.documentTypeList('printingModel')
                    .title('Models')
                    .defaultOrdering([{field: 'title', direction: 'asc'}]),
                ),
            ]),
        ),

      // Settings
      S.divider(),
      S.listItem()
        .title('Settings')
        .icon(CogIcon)
        .child(
          S.list()
            .title('Settings')
            .items(
              S.documentTypeListItems().filter((item) =>
                ['siteSettings', 'globalConfig'].includes(item.getId()),
              ),
            ),
        ),

      // rest
      S.divider(),
      S.listItem()
        .title('Other documents')
        .icon(FolderIcon)
        .child(
          S.list()
            .title('Other documents')
            .items(
              S.documentTypeListItems().filter(
                (item) =>
                  !['frosthavenScenario', 'printingModel', 'siteSettings', 'globalConfig'].includes(
                    item.getId(),
                  ),
              ),
            ),
        ),
    ])

export default deskStructure
