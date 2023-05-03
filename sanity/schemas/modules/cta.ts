import {Squares2X2Icon} from '@heroicons/react/24/outline'
import {defineType} from 'sanity'

export const cta = defineType({
  type: 'object',
  name: 'cta',
  title: 'Call to action',
  icon: Squares2X2Icon,
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
      type: 'array',
      name: 'cards',
      title: 'Cards',
      of: [{type: 'card'}],
    },
  ],
})
