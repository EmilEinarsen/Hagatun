import {Link, useLocation} from '@remix-run/react'
import {ArrowLongRightIcon} from '@heroicons/react/24/solid'
import {Image} from '../core/image'
import {clsx} from 'clsx'
import {assert} from '~/utils/utils'

import type {ModuleProps} from '.'

export const heroHeight = 650

function Hero({data, index}: ModuleProps<'hero'>) {
  assert(data.bgType !== 'video', 'Unimplemented video background for hero module')
  const isStartPageHero = useLocation().pathname === '/' && !index

  const justifyContent =
    data.contentPlacement === 'right'
      ? 'sm:justify-end'
      : data.contentPlacement === 'center'
      ? 'sm:justify-center'
      : 'sm:justify-start'
  const prose =
    'prose prose-lg prose-gray prose-p:text-md prose-p:text-gray-500' +
    (isStartPageHero ? ' lg:prose-xl' : '')

  const image = data.image && (
    <Image
      image={data.image}
      loading={isStartPageHero ? 'eager' : 'lazy'}
      height={heroHeight}
      mode="cover"
      background
    />
  )

  const content = (
    <div className="relative w-full max-w-lg p-8 bg-white lg:p-12 h-min">
      <div className={prose}>
        <h2>{data.title}</h2>
        <p>{data.text}</p>
      </div>
      {isStartPageHero && (
        <div className="mt-12">
          <div className="flex flex-wrap gap-2">
            <Link to="#contact-form" className="text-white bg-blue-600 btn hover:bg-blue-700">
              Kontakta oss
            </Link>
            <Link to="#cta" className="btn">
              Våra tjänster <ArrowLongRightIcon className="inline w-4 h-4 ml-2" />
            </Link>
          </div>
        </div>
      )}
    </div>
  )

  return data.backgroundWidth === 'page' ? (
    <section className="relative">
      {image}
      <div className="max-w-6xl px-4 py-24 mx-auto max-sm:py-10 sm:px-6 h-[650px]">
        <div className={clsx('relative flex items-center h-full justify-center', justifyContent)}>
          {content}
        </div>
      </div>
    </section>
  ) : (
    <section className="max-w-6xl mx-auto sm:py-24 sm:px-6">
      <div
        className={clsx('relative flex items-center p-4 h-[650px] justify-center', justifyContent)}
      >
        {image}
        {content}
      </div>
    </section>
  )
}

export default Hero
