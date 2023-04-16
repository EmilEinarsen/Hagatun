import { useLoaderData } from "@remix-run/react";
import { PreviewSuspense } from "@sanity/preview-kit";

import { getPage, getPageQueryAndParams, getSite } from "~/loaders";
import { metadata } from "~/loaders/metadata";
import { dynamicLinks } from "~/loaders/dynamicLinks";
import { useRouteData } from "~/hooks/useRouteData";
import { merge } from "~/utils/utils";
import { getSession } from "~/sessions";
import { Page } from "~/components/app/Page";
import { PagePreview } from "~/components/app/PagePreview";

import type { ActionArgs, LoaderArgs, MetaFunction } from "@remix-run/node";

export const meta: MetaFunction = ({ data }) => {
	return {
		...metadata(data)
	}
}

export const handle = { 
	dynamicLinks
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
    const res = await fetch('https://formspree.io/f/mqkoglqp', {
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
        : <Page page={data.page} />
      }
		</>
	);
}
