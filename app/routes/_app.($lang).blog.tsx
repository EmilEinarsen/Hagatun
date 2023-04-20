import { metadata } from "~/loaders/metadata";
import { useRouteData } from "~/hooks/useRouteData";

import type { V2_MetaFunction } from "@remix-run/node";

export const meta: V2_MetaFunction = ({ data, matches }) => {
	return metadata(data, matches)
}

export default function Post() {
	const data = useRouteData()

  return (
		<>
		
		</>
	);
}
