import { PortableText } from '@portabletext/react';

import { clsx } from 'app/utils/utils';
import { Image } from '~/components/core/image';

import type { ModuleProps } from '.';

const TextImage = ({ data }: ModuleProps<'text-image'>) => {
	
	return (
		<section className='max-w-6xl px-4 py-24 mx-auto max-sm:py-10 sm:px-6'>
			<div className='flex-row items-center gap-10 sm:flex'>
        <div className="relative self-stretch min-h-full basis-full sm:basis-1/2 max-sm:h-80">
          <Image image={data.photo} background className='rounded-2xl' width={550} />
        </div>
        <div className={clsx('w-full basis-full sm:basis-1/2 prose prose-lg lg:prose-xl prose-gray prose-p:text-gray-600 py-16', data.alignment === 'left' && 'sm:order-first')}>
          <PortableText value={data.body} />
        </div>
      </div>
		</section>
	)
}

export default TextImage