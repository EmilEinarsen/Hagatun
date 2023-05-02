import { ListItemBuilder, StructureBuilder } from 'sanity/desk'
import { i18n } from 'sanity/lib/i18n'
import Iframe from 'sanity-plugin-iframe-pane'

import { PageIcon } from '../../schemas/documents/page'
import { DocumentDuplicateIcon } from '@heroicons/react/24/outline'

const createPageView = (S: StructureBuilder) => (id: string) => 
  S.document()
  .documentId(id)
  .schemaType('page')
  .views([
    S.view.form(),
    S.view
      .component(Iframe)
      .options({
        url: `http://localhost:3000/resource/preview`,
      })
      .title('Preview'),
  ])

export const pagesMenu = (S: StructureBuilder): ListItemBuilder =>
	S.listItem()
  .title('Pages')
  .id('pages')
  .child(
    S.list()
      .title('Pages')
      .items([
        S.listItem()
				.title('Static Pages')
				.schemaType('page')
        .icon(DocumentDuplicateIcon)
				.child(S.documentTypeList('page')
					.title('Static Pages')
					.filter(
						`_type == "page" && __i18n_lang == "${i18n.base}" && (_id in [
							*[_type == "generalSettings"][0].home._ref,
							*[_type == "generalSettings"][0].blog._ref,
							*[_type == "generalSettings"][0].error._ref,
						]) && !(_id in path("drafts.**"))`
					)
					.child(createPageView(S))
					.canHandleIntent(
						(intent, { type }) =>
							['create', 'edit'].includes(intent) && type === 'page'
					)
				),
        S.listItem()
          .title('Other Pages')
          .schemaType('page')
          .icon(DocumentDuplicateIcon)
          .child(S.documentTypeList('page')
						.title('Other Pages')
						.filter(
							`_type == "page" && __i18n_lang == "${i18n.base}" && !(_id in [
								*[_type == "generalSettings"][0].home._ref,
								*[_type == "generalSettings"][0].blog._ref,
								*[_type == "generalSettings"][0].error._ref,
							]) && !(_id in path("drafts.**"))`
						)
            .child(createPageView(S))
						.canHandleIntent(
							(intent, { type }) =>
								['create', 'edit'].includes(intent) && type === 'page'
						)
					),
				S.listItem()
          .title('All Pages')
          .schemaType('page')
          .icon(DocumentDuplicateIcon)
          .child(S.documentTypeList('page')
						.title('All Pages')
            .child(createPageView(S))
						.canHandleIntent(
							(intent, { type }) =>
								['create', 'edit'].includes(intent) && type === 'page'
						)
					),
        S.divider(),
        S.listItem()
          .title('Reusable Sections')
          .schemaType('section')
          .child(
            S.documentTypeList('section')
              .title('Reusable Sections')
              .child(documentId =>
                S.document()
                  .documentId(documentId)
                  .schemaType('section')
              )
              .canHandleIntent(
                (intent, { type }) =>
                  ['create', 'edit'].includes(intent) && type === 'section'
              )
          )
      ])
  )
  .icon(PageIcon)
