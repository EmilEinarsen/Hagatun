import { ModuleProps } from '.'

import { Link } from '~/components/core/link';
import { Image } from '~/components/core/image';

const Partners = ({ data }: ModuleProps<'partners'>) => {
	return (
		<section className='partners'>
			<h2>{data.title}</h2>
			<p>{data.text}</p>
			<div>
				{data.partnerLogos.map(partner =>
					<Link key={partner._key} to={partner.href}>
						<Image image={partner.logo} lqipEnabled={false} />
					</Link>
				)}
			</div>
		</section>
	)
}

export default Partners