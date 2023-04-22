import groq from 'groq'
import { ImageObject, imageQuery } from 'sanity-page-builder'

import { ReferenceWithSlug, referenceWithSlug } from './links'

export type Card = {
	_type: 'card'
	_key: string
	title: string
	subtitle: string
	text: string
	thumbnail: ImageObject
	href: ReferenceWithSlug | null;
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