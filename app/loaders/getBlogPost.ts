import { Params } from "@remix-run/react"

import { getLangAndSlugFromParams } from "sanity/lib/i18n"
import { client } from "~/utils/sanityClient"
import { assert } from "~/utils/utils"
import { BlogPost } from "./groq-fragments/documents/blog-post"
import { blogPostQueryBySlug } from "./groq-fragments/query"

export type { BlogPost }

const buildBlogPostImages = (post: BlogPost) => ({
	shareGraphic: undefined
})

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