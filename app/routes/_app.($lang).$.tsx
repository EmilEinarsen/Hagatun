import { useLoaderData } from "@remix-run/react";
import { PreviewSuspense } from "@sanity/preview-kit";

import { metadata } from "~/loaders/metadata";
import { useRouteData } from "~/hooks/useRouteData";
import { merge } from "~/utils/utils";
import { getSession } from "~/sessions";
import { PagePreview } from "~/components/app/PagePreview";

import type { ActionArgs, LoaderArgs, V2_MetaFunction } from "@remix-run/node";
import { Module } from "~/components/modules";
import { getPageQueryAndParams, getPage } from "~/loaders/getPage";
import { getSite } from "~/loaders/getSite";

export const meta: V2_MetaFunction = ({ data, matches }) => {
	return metadata(data, matches)
}

export const loader = async ({ request, params }: LoaderArgs) => {
  const isPreview = !!(await getSession(request.headers.get('Cookie'))).get('preview')

  if(isPreview) return { 
    ...await getSite(params), 
    isPreview, 
    ...getPageQueryAndParams(params) 
  }

	const data = await merge([
		getSite(params),
		getPage(params)
	])

  if (!data.page) 
    throw new Response("Not Found", { status: 404 })
    
  return { ...data, isPreview }
}

export const action = async ({ request }: ActionArgs) => {
  const formData = await request.formData();

  try {
    const res = await fetch(`https://formspree.io/f/${process.env.FORMSPREE_KEY}`, {
      method: "post",
      body: formData,
      headers: {
        "Accept": "application/json8",
      },
    });
    const result = await res.json()

    if (result.ok) {
      return { status: 'success' } as const
    } else throw Error()
  } catch (error) {
    return { status: 'error' } as const
  }
};

export type ActionData = Awaited<ReturnType<typeof action>> | undefined

export default function Component() {
	const data = useRouteData()
  const { isPreview, query, params } = useLoaderData()
  
  return (
		<>
      {isPreview ?
        <PreviewSuspense fallback="Loading...">
          <PagePreview query={query} params={params} />
        </PreviewSuspense>
        : data.page?.modules?.map((module, i) => (
          <Module key={i} index={i} data={module} />
        ))
      }
		</>
	);
}
