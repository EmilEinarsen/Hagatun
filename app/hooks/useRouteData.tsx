import { useMatches } from '@remix-run/react'
import { RouteData } from '~/loaders/types'

import { mergeSync } from '~/utils/utils'

export const useRouteData = () => mergeSync<RouteData>(useMatches().flatMap(m => m.data)) ?? {}
