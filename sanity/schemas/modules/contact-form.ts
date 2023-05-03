import {EnvelopeIcon} from '@heroicons/react/24/outline'
import {defineType} from 'sanity'

export const contactForm = defineType({
  type: 'object',
  name: 'contact-form',
  title: 'Contact Form',
  icon: EnvelopeIcon,
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
  ],
})
