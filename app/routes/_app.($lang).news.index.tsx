import type {LoaderArgs} from '@remix-run/node'

import {assert, merge} from '~/utils/utils'
import {BLOG_POST_LIMIT, getBlogPosts} from '~/loaders/getBlogPost'
import {getSite} from '~/loaders/getSite'
import ContactForm from '~/components/modules/contact-form'
import {useRouteData} from '~/hooks/useRouteData'
import {BlogPost} from '~/components/app/Post'
import {Pagination} from '~/components/app/Pagination'
import {useSearchParams} from '@remix-run/react'

export const loader = async (args: LoaderArgs) => {
  const data = await merge([getSite(args), getBlogPosts(args)])

  if (data.notFound) throw new Response('Not Found', {status: 404})

  return data
}

export default function Component() {
  const {blogPosts} = useRouteData()
  assert(blogPosts)

  const currentPage = +(useSearchParams()[0].get('page') ?? 1)

  return (
    <>
      <section>
        <div className="max-w-6xl py-16 mx-auto sm:py-24 sm:px-6">
          <div className="mx-auto mb-16 prose prose-xl text-center">
            <h2>{blogPosts.title}</h2>
          </div>
          <div className="mt-16 space-y-20 lg:mt-20 lg:space-y-20">
            {blogPosts.posts.map((post) => (
              <BlogPost key={post.id} post={post} />
            ))}
          </div>
          <Pagination
            className="mt-16"
            currentPage={currentPage}
            maxPage={Math.ceil(blogPosts.numberOfPosts / BLOG_POST_LIMIT)}
          />
        </div>
      </section>
      <ContactForm />
    </>
  )
}
