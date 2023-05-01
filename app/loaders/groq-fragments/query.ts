import groq from 'groq'

import { page } from './documents/page'
import { blogPost, blogPosts } from './documents/blog-post'
import { site } from './documents/site'
import { conditionNoDraft } from './utils/conditions'
import { filterSavedPages, filterById, filterBySlug } from './utils/filters'

export const siteQuery = groq`{ ${site} }`

export const pageQueryById = groq`
  *${filterSavedPages}${filterById}[__i18n_lang == $lang][0] {
    ${page}
  }
`

export const pageQueryBySlug = groq`
	*${filterSavedPages}${filterBySlug}[0] { ${page} }
`

export const blogPostQueryBySlug = groq`
	*[_type == 'blogPost' && ${conditionNoDraft}]${filterBySlug}[0] { ${blogPost} }
`

export const blogPostsQueryById = groq`
	*${filterSavedPages}${filterById}[__i18n_lang == $lang][0] {
		${blogPosts}
	}
`
