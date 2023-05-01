import { FieldDefinition } from "sanity";
import { image } from "sanity-page-builder";

export const withThumbnail: FieldDefinition[] = [
  {
    type: 'string',
    name: 'title',
    title: 'Title',
    validation: Rule => Rule.required(),
    group: 'content',
  },
  {
    ...image,
    name: 'image',
    title: 'Image',
    validation: Rule => Rule.required(),
    group: 'content'
  },
  {
    name: "description",
    title: "Description",
    description:
      "The description is used in lists, search results and SEO",
    type: "text",
    rows: 3,
    validation: Rule => Rule.required().max(200),
    group: 'content'
  },
]