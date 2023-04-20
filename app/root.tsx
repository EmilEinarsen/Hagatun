import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from "@remix-run/react";
import { LinksFunction } from "@remix-run/node";
import { DynamicLinks } from 'remix-utils'
import { Analytics } from '@vercel/analytics/react';

import { useRouteData } from "./hooks/useRouteData";

export const links: LinksFunction = () => {
  return [
		{ rel: 'manifest', href: '/manifest.json' },
		{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
  ];
};

export default function Component() {
	const { lang } = useRouteData()
	
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
        <Scripts />
        <Analytics />
        {process.env.NODE_ENV === "development" && <LiveReload />}
        <div id="portals" className="portals" />
      </body>
    </html>
  );
}
