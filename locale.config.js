const createI18nConfig = () => {

  const config = /** @type {const} */ ({
    locales: ['se', 'en'],
    localeLabel: {
      'se': 'Svenska',
      'en': 'English'
    },
    stripBase: true,
    base: 'se'
  })
  
  if(!config.locales.includes(config.base)) throw new Error(`Invalid base locale`)
  if(!config.locales.every(l => !!config.localeLabel[l])) throw new Error (`Invalid localeLabel`)

  /** @type {{ [K in typeof config.locales[number]]: K }} */
  const LOCALE = config.locales.reduce((p,c) => (p[c] = c,p), {})

  /** @type {{ id: typeof config.locales[number], title: typeof config.localeLabel[typeof config.locales[number]] }[]} */
  const languages = Object.entries(config.localeLabel).map(([k,v]) => ({ id: k, title: v }))

  return {
    ...config,
    languages,
    LOCALE 
  }
}

const i18nConfig = createI18nConfig()

const localizeRoutes = (routeNamingLocale, routesManifest, translations) => {
  const otherLocales = i18nConfig.locales.filter(l => l !== routeNamingLocale)

  const localizedRoutes = Object.fromEntries(Object.values(routesManifest).flatMap(v => {
    if(!v.path) return [[v.id, v]]

    return translations.flatMap(t => {
      if(v.file.startsWith(t.matchAll.replace('{{slug}}', t.slugs[routeNamingLocale]))) {
        return otherLocales.map(l => [v.id, {
          ...v,
          path: v.path.replace(t.slugs[routeNamingLocale], t.slugs[l]),
          id: v.id.replace(t.slugs[routeNamingLocale], t.slugs[l]),
        }])
      }
      return [[v.id, v]]
    })
  }))
  return localizedRoutes
}


module.exports = { i18nConfig, localizeRoutes }
