import React from 'react'

import Card from '~/components/core/card'
import { Link } from '~/components/core/link'
import { Image } from '~/components/core/image'

import type { ModuleProps } from '.'

const CTA = ({ data }: ModuleProps<'cta'>) => {
	
	return (
		<section className='cta'>
			<h2>{data.title}</h2>
			<div>
				{data.cards.map(card => {
					const item = (
						<Card orientation='vertical'>
							<Card.Thumbnail>
								<Image image={card.thumbnail} />
							</Card.Thumbnail>
							<Card.Body>
								<h3>{card.title}</h3>
							</Card.Body>
						</Card>
					);
					return (
						<div key={card._key}>
							{card.href 
								? <Link to={card.href.slug}>{item}</Link> 
								: item
							}
						</div>
					)
				})}
			</div>
		</section>
	)
}

export default CTA