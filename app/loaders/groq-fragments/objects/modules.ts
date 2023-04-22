import groq from 'groq'
import { Hero, heroQuery, ImageObject, imageQuery, TextImage, textImageQuery } from 'sanity-page-builder'

import { Card, card } from './card'
import { post } from './post'
import { Post } from '../documents/blog-post'

type CTAModule = {
	_type: 'cta',
	_key: string
	title: string
	subtitle: string
	cards: Card[]
}

type PartnersModule = {
	_type: 'partners'
	_key: string
	title: string
	text: string
	partnerLogos: {
		_key: string
		logo: ImageObject
		href: string
    name: string
	}[]
}

type BlogPostsModule = {
	_key: string
	_type: 'blog-posts'
	orderBy: 'recent' | 'featured'
	posts: Post[]
}

type ContactFormModule = {
	_type: 'contact-form'
	_key: string
	title: string
	subtitle: string
}

export type Modules =
  | Hero
	| CTAModule
	| PartnersModule
	| BlogPostsModule
	| TextImage
  | ContactFormModule

const actualModules = groq`
	_type == 'cta' => {
		_type,
		_key,
		title,
		subtitle,
		cards[] {
			${card}
		}
	},
	_type == 'hero' => {
    ${heroQuery}
	},
	_type == 'partners' => {
		_type,
		_key,
		title,
		text,
		partnerLogos[]{
			_key,
			logo{
				${imageQuery}
			},
			href,
      name,
		},
	},
	_type == 'blog-posts' => {
		_type,
		_key,
		orderBy,
		orderBy == 'recent' => {
			"posts": *[_type == 'blog-post' && __i18n_lang == $lang] | order(publishedAt desc)[0..3] {
				${post}
			}
		},
		orderBy == 'featured' => {
			posts[] {
				${post}
			}
		}
	},
	_type == 'text-image' => {
		${textImageQuery}
	},
	_type == 'contact-form' => {
		_type,
		_key,
		title,
		subtitle,
	}
`

export const modules = groq`
  ${actualModules},
	_type == 'section-reference' => {
		...section->content[0] {
      ${actualModules}
    }
	}
`