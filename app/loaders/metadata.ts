
import { V2_ServerRuntimeMetaDescriptor, V2_ServerRuntimeMetaArgs } from "@remix-run/server-runtime"
import { replaceTemplateTags } from "sanity/lib/helpers"
import { RouteData } from "./types";

export function metadata(data: RouteData, matches: V2_ServerRuntimeMetaArgs['matches']) {
  const parentMeta = matches.flatMap(
    (match) => match.meta ?? []
  );

	if(!data?.site) return []

  /* const heroImage = (() => {
    const module = data.page?.modules?.[0]
    if(module?._type !== 'hero') return
    return module.image
  })() */
	
	const siteTitle = data.site.title

  const templateTags = [
    {
      tag: '{{page_title}}',
      value: data.page?.title,
    },
    {
      tag: '{{site_title}}',
      value: siteTitle,
    },
  ]

  const metaTitle = replaceTemplateTags(
    data.page?.seo?.metaTitle || data.site.seo?.metaTitle,
    templateTags
  )
  const metaDesc = data.page?.seo?.metaDesc || data.site.seo?.metaDesc

  const shareTitle = replaceTemplateTags(
    data.page?.seo?.shareTitle || data.site.seo?.shareTitle,
    templateTags
  )
	
  const shareDesc = data.page?.seo?.shareDesc || data.site.seo?.shareDesc

	const shareGraphic = data.page?.images.shareGraphic || data.site.images.shareGraphic

  const siteFavicon = data.site.seo?.favicon?.src || '/favicon.svg'
  const siteFaviconLegacy = data.site.seo?.faviconLegacy?.src || '/favicon.ico'
		
	return ([
    ...parentMeta,
    {
      title: metaTitle
    },
    {
      name: 'description',
      content: metaDesc
    },
    { 
      tagName: 'link', 
      rel: 'icon', 
      href: siteFaviconLegacy, 
      size: 'any' 
    },
    { 
      tagName: 'link', 
      rel: 'icon', 
      type: 'image/svg+xml', 
      href: siteFavicon 
    },
    { 
      tagName: 'link', 
      rel: 'mask-icon', 
      href: siteFavicon, 
      color: '#000000' 
    },
    data.site.images.sitTouchIcon && { 
      tagName: 'link', 
      rel: 'apple-touch-icon', 
      href: data.site.images.sitTouchIcon 
    },
    // https://developers.google.com/search/docs/specialty/international/localized-versions#html
    data.page?.translations && [
      ...data.page.translations.map(t =>
        ({ 
          tagName: 'link', 
          rel: 'alternate', 
          href: `https://${data.site.rootDomain}/${t.slug.replace(/^\//, '')}`, 
          hrefLang: t.lang 
        })
      ),
      { 
        tagName: 'link', 
        rel: 'alternate', 
        href: `https://${data.site.rootDomain}`, 
        hrefLang: 'x-default' 
      }
    ],
    /* !!heroImage && {
      tagName: 'link', 
      rel: 'prefetch', 
      as: 'image',
      imageSrcSet: buildSrcSet({
        ...getImageProps(heroImage),
        height: heroHeight
      }),
      imageSizes: '100vw'
    } */,
    !!shareTitle && [
      {
        property: "og:title",
        content: shareTitle,
      },
      {
        property: "twitter:title",
        content: shareTitle,
      }
    ],
    !!shareDesc && [
      {
        property: "og:description",
        content: shareDesc,
      },
      {
        property: "twitter:description",
        content: shareDesc,
      }
    ],
    !!shareGraphic && [
      {
        property: "og:image",
        content: shareGraphic,
      },
      {
        property: "twitter:image",
        content: shareGraphic,
      }
    ],
    {
      property: 'og:type',
      content: 'website'
    },
    {
      property: 'twitter:card',
      content: 'summary_large_image'
    },
    {
      property: 'og:site_name',
      content: siteTitle
    }
  ] as const).flat().filter((v): v is Exclude<typeof v, false | undefined | null | ''> => !!v) satisfies V2_ServerRuntimeMetaDescriptor[]
}