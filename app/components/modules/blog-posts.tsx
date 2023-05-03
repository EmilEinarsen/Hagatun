import type {ModuleProps} from '.'
import {BlogPost} from '../app/Post'

const BlogPosts = (props: ModuleProps<'blog-posts'>) => {
  return (
    <section>
      <div className="max-w-6xl py-16 mx-auto sm:py-24 sm:px-6">
        <div className="mx-auto mb-16 prose prose-xl text-center sm:mb-24 prose-gray">
          <h2>{props.data.title}</h2>
          {props.data.subtitle && <p>{props.data.subtitle}</p>}
        </div>
        <div className="grid gap-10 sm:grid-cols-2">
          {props.data.posts.map((post) => (
            <BlogPost key={post.id} post={post} className="col-span-1" />
          ))}
        </div>
      </div>
    </section>
  )
}

export default BlogPosts
