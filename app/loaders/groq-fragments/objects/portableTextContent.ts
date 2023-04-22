import groq from 'groq'
import { imageQuery } from 'sanity-page-builder'

import { referenceWithSlug } from "./links";

export const portableTextContent = groq`
  ...,
  markDefs[]{
    ...,
    _type == "link" => {
      "url": @.url,
      "isButton": @.isButton,
      "styles": @.styles{style, isLarge, isBlock},
      "page":@.page->{
        ${referenceWithSlug}
      }
    }
  },
  _type == "photo" => {
    ${imageQuery}
  }
`