import { clsx } from "~/utils/utils";
import { Image } from '~/components/core/image'

import type { LinksFunction } from "@remix-run/node";
import type { ModuleProps } from '.';

function Hero({ data }: ModuleProps<'hero'>) {
	
	return (
		<section
			color-scheme={data.theme}
			className={clsx(
				'hero',
				`hero--placement-${data.contentPlacement}`
			)}
		>
			<Image image={data.image} />
			<div>
				<div className='hero__content'>
					<h2>{data.title}</h2>
					<p>{data.text}</p>
				</div>
			</div>
		</section>
	)
}

export default Hero