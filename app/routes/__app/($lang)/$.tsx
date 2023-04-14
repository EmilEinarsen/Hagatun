import { Module } from "~/components/modules";
import { getPage, getSite } from "~/loaders";
import { metadata } from "~/loaders/metadata";
import { dynamicLinks } from "~/loaders/dynamicLinks";
import { useRouteData } from "~/hooks/useRouteData";
import { merge } from "~/utils/utils";

import type { ActionArgs, LoaderArgs, MetaFunction } from "@remix-run/node";

export const meta: MetaFunction = ({ data }) => {
	return {
		...metadata(data)
	}
}

export const handle = { 
	dynamicLinks
}

export const loader = async ({ params }: LoaderArgs) => {
	const data = await merge([
		getSite(params),
		getPage(params)
	])

  if (!data.page) 
    throw new Response("Not Found", { status: 404 })
    
  return data
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

export default function Page() {
	const data = useRouteData()
  
  return (
		<>
			{data?.page?.modules?.map((module, i) => (
        <Module key={i} index={i} data={module} />
      ))}
		</>
	);
}
