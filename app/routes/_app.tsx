import { isRouteErrorResponse, Link, Outlet, useRouteError } from "@remix-run/react";
import { LoaderArgs, LinksFunction } from "@remix-run/node";

import Layout from "~/components/layout/layout";
import { getSite } from "~/loaders";
import { merge } from "~/utils/utils";
import { useRouteData } from "~/hooks/useRouteData";

import stylesheet from "~/css/index.css";

export const links: LinksFunction = () => {
  return [
    { rel: 'stylesheet', href: stylesheet },
  ];
};

export const loader = async ({ params }: LoaderArgs) => {
  const data = await merge([
		getSite(params)
	])

  return data
}

export default function App() {
  // throw new Error("💣💥 Booooom");

  return (
    <Layout>
			<Outlet />
		</Layout>
  );
}

export function ErrorBoundary() {
  const { site } = useRouteData()
  const error = useRouteError();

  const errorInfo: any = error

  return (
    <Layout>
      <div className='max-w-6xl py-16 mx-auto prose prose-xl text-center prose-h1:text-9xl prose-h1:mb-4 sm:py-24 sm:px-6'>
        {isRouteErrorResponse(error) ? (
          <div className='grid justify-center'>
            <h1>404</h1>
            <h2>Page Not Found</h2>
            <p>
              The page you are looking for doesn't exist or an other error occured. Go to <Link to={site.home.slug}>Home Page</Link>.
            </p>
          </div>
        ) : (
          <>
            <pre>
              {!!(errorInfo.cause || errorInfo.name)&&`${errorInfo.cause || errorInfo.name}: `}{errorInfo.message}
              {!!Object.keys(errorInfo).length && JSON.stringify(errorInfo, null, 2)}
            </pre>
          </>
        )}
      </div>
    </Layout>
  );
}
