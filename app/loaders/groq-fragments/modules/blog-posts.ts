import groq from "groq";
import { Post, post } from "../documents/blog-post";

export type BlogPostsModule = {
	_key: string
	_type: 'blog-posts'
  title: string
  subtitle?: string
	orderBy: 'recent' | 'featured'
	posts: Post[]
}

export const blogPostsQuery = groq`
  _type,
  _key,
  title,
  subtitle,
  orderBy,
  orderBy == 'recent' => {
    "posts": *[_type == 'blogPost' && __i18n_lang == $lang] | order(publishedAt desc)[0..3] {
      ${post}
    }
  },
  orderBy == 'featured' => {
    posts[] {
      ${post}
    }
  }
`