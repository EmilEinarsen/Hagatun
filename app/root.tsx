import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useLoaderData,
} from "@remix-run/react";
import { json, LinksFunction } from "@remix-run/node";
import { DynamicLinks } from 'remix-utils'
import { Analytics } from '@vercel/analytics/react';

import { useRouteData } from "./hooks/useRouteData";

export const links: LinksFunction = () => {
  return [
		{ rel: 'manifest', href: '/manifest.json' },
		{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
  ];
};

export const loader = async () => {
  return json({
    env: {
      SANITY_PUBLIC_API_VERSION: process.env.SANITY_PUBLIC_API_VERSION,
      SANITY_PUBLIC_DATASET: process.env.SANITY_PUBLIC_DATASET,
      SANITY_PUBLIC_PROJECT_ID: process.env.SANITY_PUBLIC_PROJECT_ID,
      
      FORMSPREE_KEY: process.env.FORMSPREE_KEY,
      RECAPTCHA_SITE_KEY: process.env.RECAPTCHA_SITE_KEY,
    }
  })
}

export default function Component() {
	const { lang } = useRouteData()
  const data = useLoaderData<typeof loader>()
	
  return (
    <html lang={lang}>
      <head>
        <meta charSet="utf-8" />
        <meta
          name="viewport"
          content="width=device-width,initial-scale=1"
        />
        <meta httpEquiv="x-ua-compatible" content='ie=edge' />
        <meta name="format-detection" content='telephone=no' />
        <Meta />
        <Links />
        <DynamicLinks />
      </head>
      <body>
        <Outlet />
        <ScrollRestoration />
        <script
          dangerouslySetInnerHTML={{
            __html: `window.ENV = ${JSON.stringify(data.env)}`,
          }}
        />
        <Scripts />
        <Analytics />
        {process.env.NODE_ENV === "development" && <LiveReload />}
        <div id="portals" className="portals" />
      </body>
    </html>
  );
}
