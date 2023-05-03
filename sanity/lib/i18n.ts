import {assert} from '~/utils/utils'
import {i18nConfig} from '~/../locale.config'

export const i18n = {
  ...i18nConfig,
  fieldNames: {
    lang: '__i18n_lang',
    references: '__i18n_refs',
    baseReference: '__i18n_base',
  },
}

export type Locale = keyof typeof i18n.LOCALE

export const parseLocale = <T extends boolean>(locale: unknown, strict?: T) => {
  locale = i18n.LOCALE[locale as never]
  assert(locale || !strict, `Cannot parse ${locale} as it's not a valid Locale`)
  return locale as T extends true ? Locale : Locale | undefined
}

export const getLocaleFromPathname = <T extends boolean = typeof i18nConfig.stripBase>(
  path: string | undefined | null,
  fallback?: T
) => {
  let locale: string | undefined = (path ?? '').replace(/^\//, '').split('/')[0]
  return (parseLocale(locale) ||
    (fallback ?? i18nConfig.stripBase ? i18nConfig.base : undefined)) as T extends true
    ? Locale
    : Locale | undefined
}
