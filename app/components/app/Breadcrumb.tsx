import { HomeIcon } from '@heroicons/react/24/solid'
import { Link } from '@remix-run/react'
import React from 'react'
import { useRouteData } from '~/hooks/useRouteData'
import { clsx } from '~/utils/utils'

interface BreadcrumbProps extends React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement> {}

export const Breadcrumb = (props: BreadcrumbProps) => {
  const { post } = useRouteData()
  
  return (
    <nav
      {...props}
      className={clsx(
        'w-min', 
        props.className
      )} 
      aria-label="Breadcrumb"
    >
      <ol role="list" className="flex items-center space-x-4">
        <li>
          <div>
            <Link to='/' className="text-gray-400 hover:text-gray-500 whitespace-nowrap">
              <HomeIcon className="flex-shrink-0 w-5 h-5" aria-hidden="true" />
              <span className="sr-only">Home</span>
            </Link>
          </div>
        </li>
        {post?.breadcrumbs.map((page, i, pages) => (
          <li key={page.name}>
            <div className="flex items-center">
              <svg
                className="flex-shrink-0 w-5 h-5 text-gray-300"
                fill="currentColor"
                viewBox="0 0 20 20"
                aria-hidden="true"
              >
                <path d="M5.555 17.776l8-16 .894.448-8 16-.894-.448z" />
              </svg>
              <Link
                to={page.href}
                className="ml-4 text-sm font-medium text-gray-500 hover:text-gray-700 whitespace-nowrap aria-[current='page']:"
                aria-current={i === pages.length-1 ? 'page' : undefined}
              >
                {page.name}
              </Link>
            </div>
          </li>
        ))}
      </ol>
    </nav>
  )
}
