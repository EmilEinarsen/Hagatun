import React from 'react'

import Hero from './hero'
import CTA from './cta'
import Partners from './partners'
import TextImage from './text-image'
import ContactForm from './contact-form'
import BlogPosts from './blog-posts'

import type { Modules } from '~/loaders/groq-fragments/modules/modules'

export interface ModuleProps<T extends Modules['_type'] = Modules['_type']> {
  index: number;
  data: Extract<Modules, { _type: T }>;
  activeVariant?: unknown;
  onVariantChange?: unknown;
}

const modules = {
	hero: Hero,
	cta: CTA,
	partners: Partners,
	'text-image': TextImage,
  'contact-form': ContactForm,
  'blog-posts': BlogPosts
} as { [k in Modules['_type']]: React.FunctionComponent<ModuleProps> };

export const Module = ({
  index,
  data,
  activeVariant,
  onVariantChange,
}: ModuleProps) => {
	const ModuleType = modules[data._type]

  return ModuleType ? (
    <ModuleType
      index={index}
      data={data}
      activeVariant={activeVariant}
      onVariantChange={onVariantChange}
    />
  ) : null;
}
