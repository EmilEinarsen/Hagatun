import groq from 'groq'

import { image, ImageSrc } from './image'
import { Card, card } from './card'
import { post } from './post'
import { Post } from '../documents/blog-post'
import { PortableTextBlock } from 'sanity'

type CTAModule = {
	_type: 'cta',
	_key: string
	title: string
	subtitle: string
	cards: Card[]
}

type HeroModule = {
	_type: 'hero'
	_key: string
	title: string
	text: string
	image: ImageSrc
	backgroundWidth: 'page' | 'container'
	contentPlacement: 'left' | 'center' | 'right'
}

type PartnersModule = {
	_type: 'partners'
	_key: string
	title: string
	text: string
	partnerLogos: {
		_key: string
		logo: ImageSrc
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

type TextImageModule = {
	_type: 'text-image'
	_key: string
	body: PortableTextBlock
	photo: ImageSrc
	alignment: 'left' | 'right'
}

type ContactFormModule = {
	_type: 'contact-form'
	_key: string
	title: string
	subtitle: string
}

export type Modules =
  | HeroModule
	| CTAModule
	| PartnersModule
	| BlogPostsModule
	| TextImageModule
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
    _type,
    _key,
		title,
		text,
    bgType,
    image {
      ${image}
    },
    video{
      id,
      title
    },
    backgroundWidth,
		theme,
		contentPlacement
	},
	_type == 'partners' => {
		_type,
		_key,
		title,
		text,
		partnerLogos[]{
			_key,
			logo{
				${image}
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
		_type,
		_key,
		body,
    photo {
			${image}
    },
		alignment
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