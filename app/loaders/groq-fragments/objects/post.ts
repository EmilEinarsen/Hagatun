import groq from "groq";
import { imageQuery } from 'sanity-page-builder'

import { referenceBlogPostWithSlug } from "./links";

export const post = groq`
	"_key": _rev,
	_type,
	"href": {
		${referenceBlogPostWithSlug}
	},
	title,
	publishedAt,
	body,
	excerpt,
	"authorName": author->name,
	"image": mainImage {
		${imageQuery}
	},
`