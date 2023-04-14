import { LinkSimpleHorizontal } from '@phosphor-icons/react'
import { defineType } from 'sanity';

export const sectionReference = defineType({
  type: 'object',
  name: 'section-reference',
  title: 'Section',
  icon: LinkSimpleHorizontal,
  fields: [
    {
      type: 'reference',
      name: 'section',
      title: 'Section',
      to: [{ type: 'section' }]
    }
  ],
  preview: {
    select: {
      title: 'section.name',
      type: 'section._type'
    },
    prepare: ({ title, type }) => ({
      title: title,
      subtitle: type
    })
  }
})
