import groq from 'groq'
import type {ImageObject} from 'sanity-page-builder'
import {imageQuery} from 'sanity-page-builder'

import {referenceBlogPostWithSlug, referenceWithSlug} from '../objects/links'
import {filterById, filterSavedPages} from '../utils'
import type {PortableTextBlock} from 'sanity'
import type {Locale} from 'sanity/lib/i18n'
import type {Author} from '../objects/author'
import {author} from '../objects/author'
import {queryBlogID} from '~/loaders/ids'
import {normalizeSlug} from '../utils/normalizers'

export const post = groq`
	"id": _id,
	_type,
	"href": {
		${referenceBlogPostWithSlug}
	},
	title,
	image {
		${imageQuery}
	},
	description,
	body,
	publishedAt,
	"author": author->{
    ${author}
  },
  "category": category->{
    title,
    description
  },
  "breadcrumbs": [
    *${filterSavedPages}${filterById.replace('$id', queryBlogID)}[__i18n_lang == $lang][0] {
      "name": title,
      "href": ${normalizeSlug}
    },
    {
      "name": title,
      "href": ${normalizeSlug}
    },
  ]
`

export type Post = {
  id: string
  _type: 'blog-post'
  href: {
    slug: string
    title: string
    lang: string
  }
  title: string
  image: ImageObject
  description?: string
  body: PortableTextBlock
  publishedAt: string
  author: Author
  category: {
    title: string
    description: string
  }
  breadcrumbs: {name: string; href: string}[]
}

export const blogPost = groq`
  ${post},
	"lang": __i18n_lang,
  "translations": *[_type == 'blogPost']${filterById.replace('$id', '^._id')} { 
    ${referenceWithSlug}
  }
`

export type BlogPost = Post & {
  id: string
  lang: Locale
  translations?: {
    slug: string
    title: string
    lang: Locale
  }[]
}

export const blogPosts = groq`
	"id": _id,
	title,
	"lang": __i18n_lang,
	"posts": *[_type == 'blogPost' && __i18n_lang == $lang] | order(publishedAt desc)[$start..$end] {
    ${post}
  },
	"translations": *[_type == 'page']${filterById.replace('$id', '^._id')} { 
		${referenceWithSlug}
	},
  "numberOfPosts": count(*[_type == 'blogPost'])
`
export type BlogPosts = {
  id: string
  title: string
  lang: Locale
  posts: Post[]
  translations?: {
    slug: string
    title: string
    lang: Locale
  }[]
  numberOfPosts: number
}
