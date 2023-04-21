/** @type {import('@remix-run/dev').AppConfig} */
module.exports = {
	watchPaths: ['sanity'],
  // appDirectory: "app",
  // assetsBuildDirectory: "public/build",
  // serverBuildPath: "build/index.js"
  future: {
    unstable_dev: true,
    unstable_tailwind: true,
    v2_routeConvention: true,
    v2_meta: true,
    v2_errorBoundary: true,
    v2_normalizeFormMethod: true
  },

  // serverBuildTarget vercel
  // https://remix.run/docs/en/1.15.0/pages/v2#serverbuildtarget
  publicPath: "/build/",
  serverBuildPath: "api/index.js",
  serverMainFields: ['main', 'module'],
  serverModuleFormat: "cjs",
  serverPlatform: "node",
  serverMinify: false,
};
