const util = require('remix-flat-routes')
const {i18nConfig, localizeRoutes} = require('./locale.config')

/** @type {import('@remix-run/dev').AppConfig} */
module.exports = {
  watchPaths: ['sanity'],
  // appDirectory: "app",
  // assetsBuildDirectory: "public/build",
  // serverBuildPath: "build/index.js"
  future: {
    unstable_tailwind: true,
    v2_routeConvention: true,
    v2_meta: true,
    v2_errorBoundary: true,
    v2_normalizeFormMethod: true,
  },
  routes: async (defineRoutes) => {
    const routes = util.flatRoutes('routes', defineRoutes)

    return localizeRoutes(i18nConfig.LOCALE.en, routes, [
      {
        matchAll: `routes/_app.($lang).{{slug}}`,
        slugs: {
          [i18nConfig.LOCALE.en]: 'news',
          [i18nConfig.LOCALE.se]: 'nyheter',
        },
      },
    ])
  },
}
