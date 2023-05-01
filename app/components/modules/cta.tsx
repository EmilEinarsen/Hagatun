import { Link } from '@remix-run/react'

import { Image } from '~/components/core/image'

import type { ModuleProps } from '.'

const CTA = ({ data }: ModuleProps<'cta'>) => {
	
	return (
		<section className='relative bg-blue-50'>
      <span id="cta" className='absolute -top-20' />
      <div className='max-w-6xl py-16 mx-auto sm:py-24 sm:px-6'>
        <div className='mx-auto mb-16 prose prose-xl text-center sm:mb-24 prose-gray'>
          <h2>{data.title}</h2>
          <p>{data.subtitle}</p>
        </div>
        <div className='grid grid-cols-1 max-sm:divide-y sm:gap-10 sm:grid-cols-2 lg:grid-cols-3 max-sm:border-y'>
          {data.cards.map(card =>
            <Link key={card._key} to={card.href?.slug??'#'}>
              <div className="h-full p-10 transition-shadow bg-white max-sm:px-4 sm:shadow-md sm:rounded-2xl sm:hover:shadow-lg">
                <Image image={card.thumbnail} className="!h-24 mt-0 bg-blue-100 rounded-lg w-min p-4" />
                <div className='mt-4 prose md:prose-lg'>
                  <h3>{card.title}</h3>
                  <p>{card.text}</p>
                </div>
              </div>
            </Link>
          )}
        </div>
      </div>
		</section>
	)
}

export default CTA