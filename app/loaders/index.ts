
import { client } from '~/utils/sanityClient'
import { urlBuilder } from '~/utils/urlBuilder'
import { assert } from '~/utils/utils'
import { blogPostQueryBySlug, pageQueryBySlug, pageQueryById, siteQuery, queryHomeID } from './groq-fragments/query'
import { getLangAndSlugFromParams } from '../../sanity/lib/i18n'

import type { SanityImageSource } from '@sanity/image-url/lib/types/types'
import type { BlogPost } from './groq-fragments/documents/blog-post'
import type { Page } from './groq-fragments/documents/page'
import type { Site } from './groq-fragments/documents/site'
import type { Modules } from './groq-fragments/objects/modules'
import type { Params } from '@remix-run/react'

export type { Page, Site, BlogPost, Modules }

export const getPageQueryAndParams = (params: Params) => {
	const { lang, slug } = getLangAndSlugFromParams(params)
  const query = slug === lang ? pageQueryById.replace('$id', queryHomeID) : pageQueryBySlug

  return { query, params: { slug, lang } }
}

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

  console.log(JSON.stringify(page, null, 2))
	
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

export async function getSite(params: Params) {
	const { lang } = getLangAndSlugFromParams(params)

	const site: Site = await client.fetch(siteQuery, { lang })
	assert(site, 'site was undefined')
	
	return { 
		site: Object.assign(site, {
			images: buildSiteImages(site)
		})
	}
}

export async function getBlogPost(params: Params) {
	let blogPost: BlogPost | undefined
	const { lang, slug } = getLangAndSlugFromParams(params)
	
	try {
		blogPost = await client.fetch<BlogPost>(blogPostQueryBySlug, { slug, lang })
	} catch (error: unknown) {
		if(
			error &&
			typeof error === 'object' && 
			'code' in error && 
			(error as any).code === 'ECONNRESET'
		) throw Error('Connection request was abruptly closed by peer', { cause: 500 })
	}
	
	blogPost && assert(
		blogPost.lang === lang, 
		`pathname language didn't match the page results language`
	)
	
	return { 
		post: blogPost ? Object.assign(blogPost, {
			images: buildBlogPostImages(blogPost)
		}) : undefined,
		lang,
		notFound: !blogPost
	}
}

export interface RouteData extends 
	Awaited<ReturnType<typeof getPage>>, 
	Awaited<ReturnType<typeof getBlogPost>>, 
	Awaited<ReturnType<typeof getSite>> {}

const getShareGraphic = (src: SanityImageSource) => urlBuilder.image(src).width(1200).height(630).url()

const buildPageImages = (page: Page) => ({
	shareGraphic: page?.seo?.shareGraphic && getShareGraphic(page?.seo?.shareGraphic)
})

const buildBlogPostImages = (post: BlogPost) => ({
	shareGraphic: undefined
})

const buildSiteImages = (site: Site) => ({
	shareGraphic: site?.seo?.shareGraphic && getShareGraphic(site.seo.shareGraphic),
	sitTouchIcon: site?.seo?.touchIcon && urlBuilder.image(site.seo.touchIcon).width(192).height(192).url()
})
