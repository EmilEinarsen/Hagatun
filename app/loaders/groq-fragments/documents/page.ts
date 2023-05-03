import groq from 'groq'

import type {Modules} from '../modules/modules'
import {modules} from '../modules/modules'
import type {Locale} from 'sanity/lib/i18n'
import {normalizeSlug} from '../utils/normalizers'
import {referenceWithSlug} from '../objects/links'
import {filterById} from '../utils'

export type Page = {
  id: string
  title: string
  lang: Locale
  modules: Modules[] | null
  seo: any
  translations?: {
    slug: string
    title: string
    lang: Locale
  }[]
  breadcrumbs: {name: string; href: string}[]
}

export const page = groq`
	"id": _id,
	title,
	"lang": __i18n_lang,
	modules[]{
		defined(_ref) => { ...@->content[0] {
			${modules}
		}},
		!defined(_ref) => {
			${modules},
		}
	},
  "breadcrumbs": [
    {
      "name": title,
      "href": ${normalizeSlug}
    }
  ],
  "translations": *[_type == 'page']${filterById.replace('$id', '^._id')} { 
    ${referenceWithSlug}
  }
`
