import groq from 'groq'
import type {Hero, TextImage} from 'sanity-page-builder'
import {heroQuery, textImageQuery} from 'sanity-page-builder'

import type {CTAModule} from './cta'
import {ctaQuery} from './cta'
import type {PartnersModule} from './partners'
import {partnersQuery} from './partners'
import type {BlogPostsModule} from './blog-posts'
import {blogPostsQuery} from './blog-posts'
import type {ContactFormModule} from './contact-form'
import {contactFormQuery} from './contact-form'

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
