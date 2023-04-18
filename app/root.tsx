import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from "@remix-run/react";
import { LinksFunction, MetaFunction } from "@remix-run/node";
import { DynamicLinks } from 'remix-utils'
import { Analytics } from '@vercel/analytics/react';

import { useRouteData } from "./hooks/useRouteData";

export const links: LinksFunction = () => {
  return [
		{ rel: 'manifest', href: '/manifest.json' },
		{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
  ];
};

export const meta: MetaFunction = () => {
	return { 
		viewport: 'width=device-width, initial-scale=1',
		charset: "utf-8",
		'x-ua-compatible': 'ie=edge',
		'format-detection': 'telephone=no',
	}
}


export default function Component({ title }: {title?: string}) {
	const { lang } = useRouteData()
	
  return (
    <html lang={lang}>
      <head>
        {title && <title>{title}</title>}
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
