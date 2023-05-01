import groq from 'groq'
import { PortableTextBlock } from 'sanity'
import { ImageObject, imageQuery } from 'sanity-page-builder'

export type Author = {
  _type: 'author',
  id: string
  name: string
  role: string
  image: ImageObject
  bio: PortableTextBlock
  slug: string
}

export const author = groq`
  _type,
  "id": _id,
  name,
  role,
  image {
    ${imageQuery }
  },
  bio,
  "slug": slug.current
`
