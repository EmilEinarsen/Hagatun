import { defineField, defineType } from "sanity";
import { image } from 'sanity-page-builder'
import { DocumentIcon } from "@heroicons/react/24/outline";

import { isUniqueAcrossAllDocuments } from "../../lib/isUniqueAcrossAllDocuments";
import { slugify } from "../../lib/slugify";
import { i18nConfig, parseLocale } from "sanity/lib/i18n";

export const PageIcon = DocumentIcon

export const page = defineType({
	type: 'document',
	name: 'page',
	title: 'Page',
  i18n: true,
	initialValue: {
    __i18n_lang: i18nConfig.base,
  },
	icon: PageIcon,
	groups: [
		{ title: 'Settings', name: 'settings' },
		{ title: 'Content', name: 'content', default: true },
		{ title: 'Thumbnail', name: 'thumbnail' }
	],
  fields: [
		{
			type: 'string',
			name: 'title',
			title: 'Title',
			validation: Rule => Rule.required(),
			group: ['content', 'thumbnail'],
		},
		defineField({
			type: 'slug',
			name: 'slug',
			title: 'URL Slug',
			description: '(unique)',
			options: {
				maxLength: 96,
        source: (doc) => `${parseLocale(doc.__i18n_lang, true)}/${doc.title}`,
				slugify,
				isUnique: isUniqueAcrossAllDocuments,
      },
      validation: Rule => [
				Rule.required(),
				Rule.custom((input, { document }) => {
          const locale = parseLocale(document?.__i18n_lang, true)
          const slug = input?.current??''
          const title = (document?.title+'').toLowerCase()
					if(
						document &&
						!new RegExp(`^${locale}$|^${locale}/`).test(slug)
					) return `Required to start with locale; Try "${locale}/${title}" instead`
					if(/\/$/.test(slug)) return `No trailing slash; Try "${slug.replace(/\/$/,'')}" instead`
					return true
				})
			],
			group: ['settings', 'content']
		}),
		{
      title: 'Page Content',
      name: 'modules',
      type: 'array',
      of: [
				{ type: 'hero' },
        { type: 'partners' },
        { type: 'blog-posts' },
				{ type: 'cta' },
				{ type: 'text-image' },
				{ type: 'contact-form' },
				{ type: 'section-reference' },
      ],
      group: 'content'
    },
		{
      ...image,
			name: 'thumbnail',
			title: 'Thumbnail',
      group: 'thumbnail'
		},
		{
			title: 'Overlay header with transparency?',
			name: 'hasTransparentHeader',
			type: 'boolean',
			description:
				'When activated the header will overlay the first content module with a transparent background and white text until scrolling is engaged.',
			initialValue: false,
			group: 'settings'
		},
		{
			type: 'seo',
			name: 'seo',
			title: 'SEO / Share Settings',
			group: 'settings',
		},
  ],

  
	preview: {
    select: {
      title: 'title',
      slug: 'slug',
      media: 'thumbnail'
    },
    prepare: v => ({
			...v,
			title: v.title ?? 'Untitled',
			subtitle: v.slug.current || '(missing slug)'
    })
  }
})
