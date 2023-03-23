import { PortableText } from '@portabletext/react';

import { clsx } from 'app/utils/utils';
import { Image } from '~/components/core/image';

import type { ModuleProps } from '.';

const TextImage = ({ data }: ModuleProps<'text-image'>) => {
	
	return (
		<section className={clsx(
			'text-image',
			`text-image--alignment-${data.alignment}`
		)}>
			<div className='text-image__text'>
				<PortableText value={data.body} />
			</div>
			<div className='text-image__image'>
				<Image image={data.photo} />
			</div>
		</section>
	)
}

export default TextImage