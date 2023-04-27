import { LinkIcon } from '@heroicons/react/24/outline'
import { defineType } from 'sanity'

export const navLink = defineType({
	type: 'object',
  name: 'navLink',
  title: 'Link',
  icon: LinkIcon,
  fields: [
    {
      type: 'string',
      name: 'title',
      title: 'Title',
      description: 'Display Text'
    },
    {
      type: 'url',
      name: 'url',
      title: 'URL',
      description: 'enter an external URL',
      validation: Rule =>
        Rule.uri({
          scheme: ['http', 'https', 'mailto', 'tel']
        })
    }
  ],
  preview: {
    select: {
      title: 'title',
      url: 'url'
    },
    prepare({ title, url }) {
      return {
        title: title ?? url,
        subtitle: title && url
      }
    }
  }
})
