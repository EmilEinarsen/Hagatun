import groq from 'groq'
import {i18n} from '../../../../sanity/lib/i18n'

export const normalizeSlug = groq`
  {
    string::startsWith(slug.current, '${i18n.base}/') => {
      "slug": '/'+coalesce(string::split(slug.current, "${i18n.base}/")[1], slug.current)
    },
    !string::startsWith(slug.current, '${i18n.base}/') => {
      "slug": coalesce(string::split(slug.current, "${i18n.base}")[1], slug.current)
    }
  }.slug
`
