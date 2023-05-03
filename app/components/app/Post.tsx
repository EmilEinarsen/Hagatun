import {Link} from '@remix-run/react'
import {clsx} from 'clsx'
import {dateFormat} from '~/utils/utils'
import {Image} from '../core/image'

import type {Post} from '~/loaders/groq-fragments/documents/blog-post'

interface BlogPostProps
  extends React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement> {
  post: Post
  withoutImage?: boolean
}

export const BlogPost = ({post, withoutImage, ...props}: BlogPostProps) => {
  return (
    <article
      key={post.id}
      {...props}
      className={clsx('relative flex flex-col gap-8 isolate lg:flex-row', props.className)}
    >
      <div className="relative aspect-[16/9] sm:aspect-[2/1] lg:aspect-square lg:w-48 lg:shrink-0">
        <Image
          image={post.image!}
          alt=""
          background
          className="object-cover rounded-2xl bg-gray-50"
        />
        <div className="absolute inset-0 rounded-2xl ring-1 ring-inset ring-gray-900/10" />
      </div>
      <div>
        <div className="flex items-center text-xs gap-x-4">
          <time dateTime={post.publishedAt} className="text-gray-500">
            {dateFormat(post.publishedAt)}
          </time>
          <p
            /* href={post.category.href} */
            className="relative z-10 rounded-full bg-gray-50 px-3 py-1.5 font-medium text-gray-600" /* hover:bg-gray-100 */
          >
            {post.category.title}
          </p>
        </div>
        <div className="relative max-w-xl group">
          <h3 className="mt-3 text-lg font-semibold leading-6 text-gray-900 group-hover:text-gray-600">
            <Link to={post.href.slug}>
              <span className="absolute inset-0" />
              {post.title}
            </Link>
          </h3>
          <p className="mt-5 text-sm leading-6 text-gray-600">{post.description}</p>
        </div>
        <div className="flex pt-6 mt-6 border-t border-gray-900/5">
          <div className="relative flex items-center gap-x-4">
            <Image image={post.author.image} className="w-10 h-10 rounded-full bg-gray-50" />
            <div className="text-sm leading-6">
              <p className="font-semibold text-gray-900">
                <span /* href={post.author.slug} */>{post.author.name}</span>
              </p>
              <p className="text-gray-600">{post.author.role}</p>
            </div>
          </div>
        </div>
      </div>
    </article>
  )
}
