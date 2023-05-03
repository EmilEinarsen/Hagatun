import groq from 'groq'
import type {ImageObject} from 'sanity-page-builder'
import {imageQuery} from 'sanity-page-builder'

export type PartnersModule = {
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

export const partnersQuery = groq`
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
  }
`
