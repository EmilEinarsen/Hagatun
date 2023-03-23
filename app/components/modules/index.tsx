import React from 'react'

import StartPageHero from './start-page-hero'
import CTA from './cta'
import Partners from './partners'
import Hero from './hero'
import BlogPosts from './blog-posts'
import TextImage from './text-image'

import type { MetaFunction } from '@remix-run/node'
import type { Modules } from '~/loaders'

export interface ModuleProps<T extends Modules['_type'] = Modules['_type']> {
  index: number;
  data: Extract<Modules, { _type: T }>;
  activeVariant?: unknown;
  onVariantChange?: unknown;
}

const modules = {
  'start-page-hero': StartPageHero,
	cta: CTA,
	partners: Partners,
	hero: Hero,
	'text-image': TextImage
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
