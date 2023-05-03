import {json, redirect} from '@remix-run/node'

import type {LoaderArgs} from '@remix-run/node'

import type {ActionArgs} from '@remix-run/node'
import {redirectBack} from 'remix-utils'

export const action = async ({request}: ActionArgs) => {
  if (request.method !== 'POST') {
    return json({message: 'Method not allowed'}, 405)
  }
  const formData = await request.formData()

  const url = new URL(request.headers.get('Referer') ?? '/')

  try {
    const res = await fetch(`https://formspree.io/f/${process.env.FORMSPREE_KEY}`, {
      method: 'post',
      body: formData,
      headers: {
        Accept: 'application/json8',
      },
    })
    const result = await res.json()

    if (result.ok) {
      url.searchParams.append('status', '200')
      return redirect(url.href)
    } else throw result.error
  } catch (error) {
    console.error(error)
  }

  url.searchParams.append('status', '400')
  return redirect(url.href)
}

export const loader = async ({request}: LoaderArgs) => {
  return redirectBack(request, {fallback: '/'})
}

export type ContactFormActionData = Awaited<ReturnType<typeof action>> | undefined
