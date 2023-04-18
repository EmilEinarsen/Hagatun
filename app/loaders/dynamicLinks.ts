import { LinkDescriptor } from "@remix-run/node";
import { RouteData } from ".";

export const dynamicLinks = ({ data }: { data?: RouteData }): LinkDescriptor[] => {
	if(!data?.site) return []
	
	const siteFavicon = data.site.seo?.favicon?.src || '/favicon.svg'
  const siteFaviconLegacy = data.site.seo?.faviconLegacy?.src || '/favicon.ico'

  /* const heroImage = (() => {
    const module = data.page?.modules?.[0]
    if(module?._type !== 'hero') return
    return module.image
  })() */
  
	return <LinkDescriptor[]>[
		{ rel: 'icon', href: siteFaviconLegacy, size: 'any' },
		{ rel: 'icon', type: 'image/svg+xml', href: siteFavicon },
		{ rel: 'mask-icon', href: siteFavicon, color: '#000000' },
		...data.site.images.sitTouchIcon ? 
			[{ rel: 'apple-touch-icon', href: data.site.images.sitTouchIcon }] 
			: [],
		// https://developers.google.com/search/docs/specialty/international/localized-versions#html
		...data.page?.translations ? 
			[
				...data.page.translations.map(t =>
					({ rel: 'alternate', href: `https://${data.site.rootDomain}/${t.slug.replace(/^\//, '')}`, hrefLang: t.lang })
				),
				{ rel: 'alternate', href: `https://${data.site.rootDomain}`, hrefLang: 'x-default' }
			]
			: [],
    /* ...heroImage ? [{ 
      rel: 'prefetch', 
      as: 'image',
      imageSrcSet: buildSrcSet({
        ...getImageProps(heroImage),
        height: heroHeight
      }),
      imageSizes: '100vw'
    }] : [] */
	]
}