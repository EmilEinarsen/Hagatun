import { LoaderArgs } from "@remix-run/node"

import { client } from "~/utils/sanityClient"
import { urlBuilder } from "~/utils/urlBuilder"
import { assert } from "~/utils/utils"
import { getPathnameParts } from "./getPathnameParts"
import { Site } from "./groq-fragments/documents/site"
import { siteQuery } from "./groq-fragments/query"

export type { Site }

const buildSiteImages = (site: Site) => ({
	shareGraphic: site?.seo?.shareGraphic && urlBuilder.image(site.seo.shareGraphic).width(1200).height(630).url(),
	sitTouchIcon: site?.seo?.touchIcon && urlBuilder.image(site.seo.touchIcon).width(192).height(192).url(),
})

export async function getSite({ params }: LoaderArgs) {
	const { lang } = getPathnameParts(params)

	const site = await client.fetch<Site>(siteQuery, { lang })
	assert(site, 'site was undefined')
	
	return { 
		site: Object.assign(site, {
			images: buildSiteImages(site)
		})
	}
}
