import { defineType } from 'sanity';
import { LinkIcon } from '@heroicons/react/24/outline'
import { i18nConfig } from 'sanity/lib/i18n';

export const navPage = defineType({
  type: 'object',
  name: 'navPage',
  title: 'Page',
  icon: LinkIcon,
  fields: [
    {
      type: 'reference',
      name: 'page',
      title: 'Page',
      to: [{ type: 'page' }],
			options: {
				filter: ({ document }) => ({
					filter: `${i18nConfig.fieldNames.lang} == "${document.__i18n_lang}"` as any
				})
			},
    }
  ],
  preview: {
    select: {
      title: 'page.title',
      pageType: 'page._type',
      pageSlug: 'page.slug.current'
    },
    prepare({ title, pageSlug }) {
      return {
        title: title,
        subtitle: `/${pageSlug}`
      }
    }
  }
})
