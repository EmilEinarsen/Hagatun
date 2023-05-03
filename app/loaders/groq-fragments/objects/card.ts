import groq from 'groq'
import type {ImageObject} from 'sanity-page-builder'
import {imageQuery} from 'sanity-page-builder'

import type {ReferenceWithSlug} from './links'
import {referenceWithSlug} from './links'

export type Card = {
  _type: 'card'
  _key: string
  title: string
  subtitle: string
  text: string
  thumbnail: ImageObject
  href: ReferenceWithSlug | null
}

export const card = groq`
	_type,
	_key,
	title,
	subtitle,
	thumbnail{
		${imageQuery}
	},
	text,
	"href": link->{
		${referenceWithSlug}
	}
`
