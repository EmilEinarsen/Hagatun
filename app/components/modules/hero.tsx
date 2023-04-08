import { MapPin, Phone } from 'phosphor-react'
import { useLocation } from '@remix-run/react';

import { useRouteData } from '~/hooks/useRouteData';
import { Image } from '~/components/core/image';
import { clsx } from '~/utils/utils';

import type { ModuleProps } from '.';

function StartPageHero({ data, index }: ModuleProps<'hero'>) {
  const isStartPageHero = useLocation().pathname === '/' && !index
	const { site } = useRouteData()

	return isStartPageHero ? (
		<section 
			className="start-page-hero" 
			color-scheme={data.theme}
		>
			<div>
				<Image image={data.image} loading='eager' isFullscreen />
				<div className="start-page-hero-content">
					<h1 className="start-page-hero-title">{data.title}</h1>
					<p className="start-page-hero-subtitle">{data.text}</p>
					<div className="start-page-hero-contact-list">
						<h2>Kontakta oss</h2>
						<div>
							<div>
								<h3>Plats</h3>
								<div>
									{site?.company.offices?.map(v => <p key={v._key}>{v.address} <MapPin /></p>)}
								</div>
							</div>
							<hr/>
							<div>
								<h3>Telefon</h3>
								<div>
									{site?.company.offices?.map(v => <p key={v._key}><a href={`tel:${v.phoneNumber}`}>{v.phoneNumber}</a> <Phone mirrored /></p>)}
								</div>
							</div>
							<hr/>
							<a href={`mailto:${site?.company.email}`}>
								<button className='primary'>{site?.company.email}</button>
							</a>
						</div>
					</div>
				</div>
			</div>
		</section>
	) : (
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

export default StartPageHero