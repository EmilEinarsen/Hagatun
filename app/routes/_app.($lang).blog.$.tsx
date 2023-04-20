import { LoaderArgs, V2_MetaFunction } from "@remix-run/node";

import { merge } from "~/utils/utils";
import { getBlogPost, getSite } from "~/loaders";
import { metadata } from "~/loaders/metadata";
import { useRouteData } from "~/hooks/useRouteData";

export const meta: V2_MetaFunction = ({ data, matches }) => {
	return metadata(data, matches)
}

export const loader = async ({ params }: LoaderArgs) => {
	const data = 	await merge([
		getSite(params),
		getBlogPost(params)
	])

  if (data.notFound)
    throw new Response("Not Found", { status: 404 })

  return data
}

export default function Post() {
	const data = useRouteData()

  return (
		<>
		
		</>
	);
}