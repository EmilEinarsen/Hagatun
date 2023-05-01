import groq from 'groq'
import { i18nConfig } from '../../../../sanity/lib/i18n'

export const normalizeSlug = groq`
  {
    string::startsWith(slug.current, '${i18nConfig.base}/') => {
      "slug": '/'+coalesce(string::split(slug.current, "${i18nConfig.base}/")[1], slug.current)
    },
    !string::startsWith(slug.current, '${i18nConfig.base}/') => {
      "slug": coalesce(string::split(slug.current, "${i18nConfig.base}")[1], slug.current)
    }
  }.slug
`
