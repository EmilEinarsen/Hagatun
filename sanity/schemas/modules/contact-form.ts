import { Envelope } from '@phosphor-icons/react'
import { defineType } from 'sanity'

export const contactForm =  defineType({
	type: 'object',
	name: 'contact-form',
	title: 'Contact Form',
  icon: Envelope,
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
		}
  ]
})
