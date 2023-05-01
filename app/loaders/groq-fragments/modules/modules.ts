import groq from 'groq'
import { Hero, heroQuery, TextImage, textImageQuery } from 'sanity-page-builder'

import { ctaQuery, CTAModule } from './cta'
import { PartnersModule, partnersQuery } from './partners'
import { BlogPostsModule, blogPostsQuery } from './blog-posts'
import { ContactFormModule, contactFormQuery } from './contact-form'

export type Modules =
  | Hero
	| CTAModule
	| PartnersModule
	| BlogPostsModule
	| TextImage
  | ContactFormModule

const actualModules = groq`
	_type == 'cta' => {
		${ctaQuery}
	},
	_type == 'hero' => {
    ${heroQuery}
	},
	_type == 'partners' => {
		${partnersQuery}
	},
	_type == 'blog-posts' => {
		${blogPostsQuery}
	},
	_type == 'text-image' => {
		${textImageQuery}
	},
	_type == 'contact-form' => {
    ${contactFormQuery}
	}
`

export const modules = groq`
  ${actualModules},
	_type == 'section-reference' => {
		...section->content[0] {
      ${actualModules}
    }
	}
`