import React, { lazy } from 'react'

import type { Modules } from '~/loaders'

export interface ModuleProps<T extends Modules['_type'] = Modules['_type']> {
  index: number;
  data: Extract<Modules, { _type: T }>;
  activeVariant?: unknown;
  onVariantChange?: unknown;
}

export const modules = {
  'start-page-hero': lazy(() => import('./start-page-hero')),
	cta: lazy(() => import('./cta')),
	partners: lazy(() => import('./partners')),
	hero: lazy(() => import('./hero')),
	'text-image': lazy(() => import('./text-image')),
} as { [K in Modules['_type']]: React.LazyExoticComponent<React.FunctionComponent<ModuleProps>> };

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
