import type { LoaderArgs } from "@remix-run/node";
import { PortableText } from "@portabletext/react";

import { getBlogPost } from "~/loaders/getBlogPost";
import { getSite } from "~/loaders/getSite";
import { assert, merge } from "~/utils/utils";
import ContactForm from "~/components/modules/contact-form";
import { useRouteData } from "~/hooks/useRouteData";
import { Image } from '~/components/core/image'
import { Breadcrumb } from "~/components/app/Breadcrumb";

export const loader = async (args: LoaderArgs) => {
	const data = 	await merge([
		getSite(args),
		getBlogPost(args)
	])

  if (data.notFound)
    throw new Response("Not Found", { status: 404 })

  return data
}

export default function Component() {
  const { post } = useRouteData()
  
  assert(post)

  return (
    <>
      <section>
        <div className="max-w-6xl px-4 pt-4 pb-24 mx-auto border-b sm:pt-10 sm:px-6">
          <div className="mx-auto text-lg max-w-prose">
            <Breadcrumb className="py-8" />
          </div>
          <div className="relative aspect-[16/9] sm:aspect-[2/1] lg:shrink-0 mb-6 sm:mb-12">
            <Image
              image={post.image!}
              background
              className="object-cover rounded-2xl bg-gray-50"
            />
            <div className="absolute inset-0 rounded-2xl ring-1 ring-inset ring-gray-900/10" />
          </div>
          <div className="mx-auto prose prose-slate lg:prose-lg">
            <h1>{post?.title}</h1>
            <PortableText value={post!.body} />
          </div>
        </div>
      </section>
      <ContactForm />
    </>
	);
}
