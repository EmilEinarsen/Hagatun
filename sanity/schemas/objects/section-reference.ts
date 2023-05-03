import {CubeIcon} from '@heroicons/react/24/outline'
import {defineType} from 'sanity'

export const sectionReference = defineType({
  type: 'object',
  name: 'section-reference',
  title: 'Section',
  icon: CubeIcon,
  fields: [
    {
      type: 'reference',
      name: 'section',
      title: 'Section',
      to: [{type: 'section'}],
    },
  ],
  preview: {
    select: {
      title: 'section.name',
      type: 'section._type',
    },
    prepare: ({title, type}) => ({
      title: title,
      subtitle: type,
    }),
  },
})
