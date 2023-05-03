import {useLoaderData} from '@remix-run/react'
import {PreviewSuspense} from '@sanity/preview-kit'

import {useRouteData} from '~/hooks/useRouteData'
import {merge} from '~/utils/utils'
import {getSession} from '~/sessions'
import {PagePreview} from '~/routes/_page/page-preview'
import {Module} from '~/components/modules'
import {getPageQueryAndParams, getPage} from '~/loaders/getPage'
import {getSite} from '~/loaders/getSite'
import ContactForm from '~/components/modules/contact-form'

import type {LoaderArgs} from '@remix-run/node'

export const loader = async (args: LoaderArgs) => {
  const isPreview = !!(await getSession(args.request.headers.get('Cookie'))).get('preview')

  if (isPreview)
    return {
      ...(await getSite(args)),
      isPreview,
      ...getPageQueryAndParams(args.params),
    }

  const data = await merge([getSite(args), getPage(args)])

  if (!data.page) throw new Response('Not Found', {status: 404})

  return {...data, isPreview}
}

export default function Component() {
  const {page} = useRouteData()
  const {isPreview, query, params} = useLoaderData()

  if (isPreview)
    return (
      <PreviewSuspense fallback="Loading...">
        <PagePreview query={query} params={params} />
      </PreviewSuspense>
    )

  return (
    <>
      {page?.modules?.map((module, i) => (
        <Module key={i} index={i} data={module} />
      ))}
      <ContactForm />
    </>
  )
}
