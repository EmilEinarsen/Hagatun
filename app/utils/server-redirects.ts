import {redirect} from '@remix-run/node'
import {getLocaleFromPathname, i18n, parseLocale} from 'sanity/lib/i18n'

export const getNormalizedURLPathname = (url: URL) =>
  url.pathname
    .toLowerCase()
    // make it UTF-8
    .replace(/* å */ 'c3a5', 'a')
    .replace(/* ä */ 'c3a4', 'a')
    .replace(/* ö */ 'c3b6', 'o')
    // Remove special characters
    .replace(/[&\\#,+()$~%.'":*?<>{}]/g, '')
    // dash instead of space
    .replace(/\s\s+/g, ' ')
    .replace(/\s+/g, '-')
    // remove trailing slash
    .replace(/\/$/g, '')

export const redirectMaliciousRequests = (url: URL) => {
  if (
    url.pathname.startsWith('/.env') ||
    url.pathname.startsWith('/php') ||
    url.pathname.startsWith('/java_script') ||
    url.pathname.startsWith('/_nuxt') ||
    url.pathname.startsWith('/uploads') ||
    url.pathname.startsWith('/sdk') ||
    url.pathname.startsWith('/evox') ||
    url.pathname.startsWith('/nmap') ||
    url.pathname.startsWith('/boaform') ||
    url.pathname.startsWith('/wp-admin')
  ) {
    return redirect('https://www.youtube.com/watch?v=dQw4w9WgXcQ', 307)
  }
}

export const getLocaleFromReqUrl = (request: Request, url: URL) => {
  const locale = getLocaleFromPathname(
    url.pathname,
    i18n.stripBase /*
		If strip base, then we can't assume that the locale might be in the url
		the following options would be cumbersome and lead to the system preferences always wining
	*/
  )
  // TODO: maybe build in cookies for locale?
  // cookie: validateLocale(cookies.NEXT_LOCALE),
  const clientCountry = parseLocale((request as any)?.geo?.country?.toLowerCase?.())
  const clientLanguage = parseLocale(
    request.headers.get('accept-language')?.split(',')?.[0].split('-')?.[0].toLowerCase()
  )

  return locale || clientLanguage || clientCountry || i18n.base
}

/**
	Strip base language
	result:
		"/se/bokforing" -> "/bokforing" 
		"/se" -> "" 
		"/en/accounting" -> "/en/accounting" 
		"/en" -> "/en" 
*/
export const stripBaseLocaleFromURL = (url: URL) =>
  (url.pathname = url.pathname.replace(new RegExp(`^/${i18n.base}$|^/${i18n.base}/`), '/'))

export const stripTrailingSlashFromURL = (url: URL) => {
  url.pathname = url.pathname.replace(/\/$/g, '')
}
