/*
 * https://github.com/ShafSpecs/remix-pwa/blob/main/templates/ts/app/routes/resources/manifest%5B.%5Djson.ts
 * https://dev.to/chrisbenjamin/tutorial-add-sitemapxml-and-robotstxt-to-remix-site-4n23
 */
import type {LoaderFunction} from '@remix-run/node'
import {getSite} from '~/loaders/getSite'
import {assert} from '~/utils/utils'

export const loader: LoaderFunction = async (args) => {
  const {site} = await getSite(args)

  assert(site)

  const robotText = `
		User-agent: Googlebot
		Disallow: /nogooglebot/

		User-agent: *
		Allow: /

		Sitemap: http://${site.rootDomain}/sitemap.xml
	`

  return new Response(robotText, {
    status: 200,
    headers: {
      'Content-Type': 'text/plain',
    },
  })
}
