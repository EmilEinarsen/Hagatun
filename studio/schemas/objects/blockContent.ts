import { defineType } from "sanity"
import { i18nConfig } from "sanity.config"

export const blockContent = defineType({
	type: 'array',
  title: 'Block Content',
  name: 'blockContent',
  of: [
    {
			type: 'block',
      title: 'Block',
      styles: [
        {title: 'Normal', value: 'normal'},
        {title: 'H1', value: 'h3'},
        {title: 'H2', value: 'h4'},
        {title: 'H3', value: 'h5'},
        {title: 'H4', value: 'h6'},
        {title: 'Quote', value: 'blockquote'}
      ],
      lists: [{title: 'Bullet', value: 'bullet'}],
      marks: {
        decorators: [
					{ title: 'Strong', value: 'strong' }, 
					{ title: 'Emphasis', value: 'em' }
				],
        annotations: [
					{
            type: 'object',
            title: 'Link',
            name: 'link',
            fields: [
              {
                type: 'string',
                title: 'Link Type',
                name: 'linkType',
                options: {
                  list: [
                    { title: 'Internal Page', value: 'internal' },
                    { title: 'External URL', value: 'external' },
                    { title: 'Social Link', value: 'social' },
                  ],
                  layout: 'radio',
                  direction: 'horizontal'
                },
                initialValue: 'internal',
                validation: Rule => Rule.required()
              },
              {
                type: 'reference',
                title: 'Internal Page',
                name: 'page',
                to: [{ type: 'page' }],
								options: {
									filter: `${i18nConfig.fieldNames.lang} == "${i18nConfig.base}"`
								},
                hidden: ({ parent }) => parent.linkType !== 'internal'
              },
              {
                type: 'url',
                title: 'External URL',
                name: 'url',
                validation: Rule =>
                  Rule.uri({
                    scheme: ['http', 'https', 'mailto', 'tel']
                  }),
                hidden: ({ parent }) => parent.linkType !== 'external'
              }
            ]
          },
        ]
      }
    },
    {
      type: 'image',
      options: {hotspot: true}
    }
  ]
})