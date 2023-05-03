import type {LoaderArgs} from '@remix-run/node'

import {client} from '~/utils/sanityClient'
import {assert} from '~/utils/utils'
import {getPathnameParts} from './getPathnameParts'
import type {BlogPost, BlogPosts} from './groq-fragments/documents/blog-post'
import {blogPostQueryBySlug, blogPostsQueryById} from './groq-fragments/query'
import {queryBlogID} from './ids'

export type {BlogPost}

const buildBlogPostImages = (post: BlogPost) => ({
  shareGraphic: undefined,
})

export async function getBlogPost({params}: LoaderArgs) {
  let blogPost: BlogPost | undefined
  const {lang, slug} = getPathnameParts(params, {isBlog: true})

  try {
    blogPost = await client.fetch<BlogPost>(blogPostQueryBySlug, {slug, lang})
  } catch (error: unknown) {
    if (
      error &&
      typeof error === 'object' &&
      'code' in error &&
      (error as any).code === 'ECONNRESET'
    )
      throw Error('Connection request was abruptly closed by peer', {cause: 500})
  }

  blogPost &&
    assert(blogPost.lang === lang, `pathname language didn't match the page results language`)

  return {
    post:
      blogPost &&
      Object.assign(blogPost, {
        images: buildBlogPostImages(blogPost),
      }),
    lang,
    notFound: !blogPost,
  }
}

export const BLOG_POST_LIMIT = 5
export async function getBlogPosts({params, request}: LoaderArgs) {
  let blogPosts: BlogPosts | undefined
  const offset = (+(new URL(request.url).searchParams.get('page') ?? 1) - 1) * BLOG_POST_LIMIT
  const {lang} = getPathnameParts(params)

  try {
    blogPosts = await client.fetch<BlogPosts>(blogPostsQueryById.replace('$id', queryBlogID), {
      lang,
      start: offset,
      end: offset + BLOG_POST_LIMIT - 1,
    })
  } catch (error: unknown) {
    if (
      error &&
      typeof error === 'object' &&
      'code' in error &&
      (error as any).code === 'ECONNRESET'
    )
      throw Error('Connection request was abruptly closed by peer', {cause: 500})
  }

  blogPosts &&
    assert(blogPosts.lang === lang, `pathname language didn't match the page results language`)

  return {
    blogPosts: blogPosts,
    lang,
    notFound: !blogPosts,
  }
}
