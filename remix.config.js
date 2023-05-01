const util = process.env.NODE_ENV === 'development' ? require('remix-flat-routes') : undefined

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
    v2_normalizeFormMethod: true
  },
  routes: util && (async defineRoutes => {
    console.log(Object.values(util.flatRoutes('routes', defineRoutes)).map(v => v.path))
    return util.flatRoutes('routes', defineRoutes)
  }),
};
