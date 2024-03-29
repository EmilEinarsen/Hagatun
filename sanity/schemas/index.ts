import {StarIcon, DocumentTextIcon} from '@heroicons/react/24/outline'
import {hero, textImage} from 'sanity-page-builder'

import {blogPost} from './documents/blog-post'
import {menu} from './documents/menu'
import {page} from './documents/page'
import {section} from './documents/section'
import {settingsFooter} from './documents/settings-footer'
import {settingsGeneral} from './documents/settings-general'
import {settingsHeader} from './documents/settings-header'
import {settingsSeo} from './documents/settings-seo'
import {blogPosts} from './modules/blog-posts'
import {contactForm} from './modules/contact-form'
import {cta} from './modules/cta'
import {partners} from './modules/partners'
import {author} from './documents/author'
import {blockContent} from './objects/blockContent'
import {card} from './objects/card'
import {category} from './documents/category'
import {navLink} from './objects/navLink'
import {navPage} from './objects/navPage'
import {office} from './objects/office'
import {sectionReference} from './objects/section-reference'
import {seo} from './objects/seo'
import {socialLink} from './objects/socialLink'

export const schemaTypes = [
  /* Document types */
  blogPost,
  menu,
  page,
  section,
  settingsFooter,
  settingsGeneral,
  settingsHeader,
  settingsSeo,

  /* Module types */
  blogPosts,
  cta,
  {...hero, icon: StarIcon},
  partners,
  {...textImage, icon: DocumentTextIcon},
  contactForm,

  /* Object types */
  author,
  blockContent,
  card,
  category,
  navLink,
  navPage,
  office,
  seo,
  socialLink,
  sectionReference,
]
