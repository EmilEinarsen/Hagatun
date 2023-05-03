import {ArrowLongLeftIcon, ArrowLongRightIcon} from '@heroicons/react/24/solid'
import {Link, useLocation} from '@remix-run/react'
import {useMemo} from 'react'
import {clsx} from 'clsx'

interface PaginationProps
  extends React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement> {
  currentPage: number
  maxPage: number
}

export const Pagination = ({currentPage, maxPage, ...props}: PaginationProps) => {
  const {pathname} = useLocation()

  const pagination = useMemo(() => {
    const previousPage = Math.max(currentPage - 1, 1)
    const nextPage = Math.min(currentPage + 1, maxPage)

    return {
      previous: {
        disabled: previousPage <= 1,
        link: `${pathname}?page=${previousPage}`,
      },
      pages: [...Array(maxPage + 1).keys()]
        .slice(1)
        .map((i) => ({label: i, value: i, href: `${pathname}?page=${i}`})),
      next: {
        disabled: currentPage === maxPage, // or some empty state indicator
        link: `${pathname}?page=${nextPage}`,
      },
    }
  }, [currentPage, maxPage, pathname])

  return (
    <nav
      className={clsx(
        'flex items-center justify-between px-4 border-t border-gray-200 sm:px-0',
        props.className
      )}
    >
      <div className="flex flex-1 w-0 -mt-px">
        <Link
          to={pagination.previous.link}
          className="inline-flex items-center pt-4 pr-1 text-sm font-medium text-gray-500 border-transparent hover:border-gray-300 hover:text-gray-700"
          aria-disabled={pagination.previous.disabled}
        >
          <ArrowLongLeftIcon className="w-5 h-5 mr-3 text-gray-400" aria-hidden="true" />
          Previous
        </Link>
      </div>
      <div className="hidden md:-mt-px md:flex">
        {pagination.pages.map((page) => (
          <Link
            key={page.href}
            to={page.href}
            className={clsx(
              'inline-flex items-center border-t-2 px-4 pt-4 text-sm font-medium',
              currentPage === page.value && 'border-indigo-500 text-indigo-600',
              currentPage !== page.value &&
                'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            )}
          >
            {page.label}
          </Link>
        ))}
      </div>
      <div className="flex justify-end flex-1 w-0 -mt-px">
        <Link
          to={pagination.next.link}
          className="inline-flex items-center pt-4 pr-1 text-sm font-medium text-gray-500 border-t-2 border-transparent hover:border-gray-300 hover:text-gray-700"
          aria-disabled={pagination.next.disabled}
        >
          Next
          <ArrowLongRightIcon className="w-5 h-5 ml-3 text-gray-400" aria-hidden="true" />
        </Link>
      </div>
    </nav>
  )
}
