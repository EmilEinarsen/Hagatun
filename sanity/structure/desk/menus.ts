import type {ListItemBuilder, StructureBuilder} from 'sanity/desk'
import {i18n} from 'sanity/lib/i18n'
import {MenuIcon} from '../../schemas/documents/menu'

export const menusMenu = (S: StructureBuilder): ListItemBuilder =>
  S.listItem()
    .title('Menus')
    .schemaType('menu')
    .child((v) =>
      S.documentTypeList('menu')
        .title('Menus')
        .filter(`_type == "menu" && __i18n_lang == "${i18n.base}"`)
        .child(async (id) => {
          return S.document().documentId(id).schemaType('menu')
        })
        .canHandleIntent((intent, {type}) => ['create', 'edit'].includes(intent) && type === 'menu')
    )
    .icon(MenuIcon)
