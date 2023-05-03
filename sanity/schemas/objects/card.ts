import {defineType} from 'sanity'
import {i18n} from 'sanity/lib/i18n'

export const card = defineType({
  type: 'object',
  name: 'card',
  title: 'Card',
  fields: [
    {
      type: 'string',
      name: 'title',
      title: 'Title',
    },
    {
      type: 'string',
      name: 'subtitle',
      title: 'Subtitle',
    },
    {
      type: 'image',
      name: 'thumbnail',
      title: 'Thumbnail',
    },
    {
      type: 'text',
      name: 'text',
      title: 'Text',
    },
    {
      type: 'reference',
      name: 'link',
      title: 'Link',
      to: [{type: 'page'}],
      options: {
        filter: `${i18n.fieldNames.lang} == "${i18n.base}"`,
      },
    },
  ],
})
