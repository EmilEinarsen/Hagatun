import type {Params} from '@remix-run/react'

import type {Locale} from 'sanity/lib/i18n'
import {i18n, parseLocale} from 'sanity/lib/i18n'
import {BLOG_POST_PREFIX} from 'sanity/schemas/documents/blog-post'

export const getPathnameParts = (params: Params, options?: {isBlog?: boolean}) => {
  const lang = (parseLocale(params.lang) ??
    (i18n.stripBase ? i18n.base : undefined)) as typeof i18n.stripBase extends true
    ? Locale
    : Locale | undefined
  let prefix = !parseLocale(params.lang) ? params.lang : undefined

  if (options?.isBlog) prefix = BLOG_POST_PREFIX[lang]

  const slugWithoutLang = [prefix, params['*']].filter(Boolean).join('/')
  const isBlog = slugWithoutLang.startsWith(BLOG_POST_PREFIX[lang])
  const slug = [lang, slugWithoutLang].filter(Boolean).join('/')
  return {lang, slugWithoutLang, slug, isBlog}
}
