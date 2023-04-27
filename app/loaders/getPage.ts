import { Params } from "@remix-run/react"
import { getLangAndSlugFromParams } from "sanity/lib/i18n"

import { client } from "~/utils/sanityClient"
import { urlBuilder } from "~/utils/urlBuilder"
import { assert } from "~/utils/utils"
import { Page } from "./groq-fragments/documents/page"
import { pageQueryById, queryHomeID, pageQueryBySlug } from "./groq-fragments/query"

export type { Page }

export const getPageQueryAndParams = (params: Params) => {
	const { lang, slug } = getLangAndSlugFromParams(params)
  const query = slug === lang ? pageQueryById.replace('$id', queryHomeID) : pageQueryBySlug

  return { query, params: { slug, lang } }
}

const buildPageImages = (page: Page) => ({
	shareGraphic: page?.seo?.shareGraphic && urlBuilder.image(page.seo.shareGraphic).width(1200).height(630).url()
})

export async function getPage(params: Params) {
	let page: Page | undefined
  const args = getPageQueryAndParams(params)
	
	try {
		page = await client.fetch<Page>(args.query, args.params)
	} catch (error: unknown) {
		if(
			error &&
			typeof error === 'object' && 
			'code' in error && 
			(error as any).code === 'ECONNRESET'
		) throw Error('Connection request was abruptly closed by peer', { cause: 500 })
	}
	
	page && assert(
		page.lang === args.params.lang, 
		`pathname language didn't match the page results language`
	)
	
	return { 
		page: page ? Object.assign(page, {
			images: buildPageImages(page)
		}) : undefined,
		lang: args.params.lang,
		notFound: !page
	}
}
