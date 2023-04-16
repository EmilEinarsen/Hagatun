import { createClient } from "@sanity/client";
import { definePreview } from "@sanity/preview-kit";
import { projectDetails } from "sanity/projectDetails";

import { IS_PROD } from "~/utils/constants";

const details = projectDetails()

const options = {
	...details,
	useCdn: IS_PROD,
}

export const client = createClient(options)
export const usePreview = definePreview(options);
