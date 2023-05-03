import type {getBlogPost, getBlogPosts} from './getBlogPost'
import type {getPage} from './getPage'
import type {getSite} from './getSite'

export interface RouteData
  extends Awaited<ReturnType<typeof getPage>>,
    Awaited<ReturnType<typeof getBlogPost>>,
    Awaited<ReturnType<typeof getBlogPosts>>,
    Awaited<ReturnType<typeof getSite>> {}
