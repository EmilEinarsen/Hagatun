import React from 'react'
import { defineType } from 'sanity'
import { SignalIcon } from '@heroicons/react/24/outline'

export const section = defineType({
  title: 'Reusable Section',
  name: 'section',
  type: 'document',
  icon: SignalIcon,
  fields: [
    {
      title: 'Name',
      name: 'name',
      type: 'string',
      description:
        'Provide a name to reference this section. For internal use only.',
      validation: Rule => Rule.required()
    },
    {
      title: 'Content',
      name: 'content',
      type: 'array',
      of: [
				{ type: 'contact-form' },
				{ type: 'cta' },
      ],
      validation: Rule =>
        Rule.length(1).error('You can only have one piece of content')
    }
  ],
  preview: {
    select: {
      name: 'name',
      content: 'content'
    },
    prepare: v => ({
			title: v.name,
			subtitle: v.content[0]._type
    })
  }
})
