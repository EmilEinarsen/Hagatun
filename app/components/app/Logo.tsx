import type {LinkProps} from '@remix-run/react'
import {Link} from '@remix-run/react'
import {useRouteData} from '~/hooks/useRouteData'
import {Image} from '../core/image'

interface LogoProps extends Omit<LinkProps, 'to'> {
  titleType?: 'short' | 'long' | 'none'
}

export const Logo = ({titleType = 'long', ...props}: LogoProps) => {
  const {site} = useRouteData()

  const title =
    titleType === 'long' ? site.title : titleType === 'short' ? site.shortTitle : undefined

  return (
    <Link {...props} to={site.home.slug} aria-label={site.title}>
      <div className="flex items-center justify-between">
        {site.seo.favicon && (
          <div className={titleType === 'none' ? 'w-16 h-16' : 'w-12 h-12'}>
            <Image
              image={site.seo.favicon}
              loading="eager"
              width={titleType === 'none' ? 64 : 48}
            />
          </div>
        )}
        {title && (
          <h1 className="ml-2 hidden text-md font-light tracking-[.2em] uppercase font-serif md:block">
            {title}
          </h1>
        )}
      </div>
    </Link>
  )
}
