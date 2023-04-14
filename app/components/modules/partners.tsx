import { Link } from '@remix-run/react';

import { Image } from '~/components/core/image';

import type { ModuleProps } from '.'

const Partners = ({ data }: ModuleProps<'partners'>) => {
	return (
		<section className='bg-blue-900'>
      <div className='max-w-6xl px-4 py-24 mx-auto md:px-6'>
        <div className='items-center gap-2 md:flex'>
          <div className='prose prose-lg prose-invert prose-h2:max-w-sm max-md:mx-auto max-md:text-center max-md:mb-12'>
            <h2>{data.title}</h2>
            <p>{data.text}</p>
          </div>
          <div className='flex flex-wrap justify-center gap-8'>
            {data.partnerLogos.map(partner =>
              <Link key={partner._key} to={partner.href}>
                <Image image={partner.logo} height={64} className='!h-16' alt={partner.name} />
                <span className='sr-only'>{partner.name}</span>
              </Link>
            )}
          </div>
        </div>
      </div>
		</section>
	)
}

export default Partners