
import React, { useEffect, useMemo, useState } from 'react';
import { CaretDown, List, X } from '@phosphor-icons/react';
import * as Drawer from '@accessible/drawer'

import { Logo } from '~/components/app/Logo';
import { useRouteData } from '~/hooks/useRouteData';
import { clsx } from '~/utils/utils';
import { Link, useLocation } from '@remix-run/react';

export const Header = () => {

  const [top, setTop] = useState(true);

  // detect whether user has scrolled the page down by 10px 
  useEffect(() => {
    const scrollHandler = () => {
      window.pageYOffset > 10 ? setTop(false) : setTop(true)
    };
    window.addEventListener('scroll', scrollHandler);
    return () => window.removeEventListener('scroll', scrollHandler);
  }, [top]);  

	const { site } = useRouteData()

  const pathname = useLocation().pathname

  const [isOpen, setIsOpen] = useState(false)
  const open = () => setIsOpen(true)
  const close = () => setIsOpen(false)

  useEffect(() => {
    close()
  }, [pathname])

  const linkStyle = 'font-medium text-gray-600 hover:text-gray-900 px-5 py-2'

  const links = useMemo(() =>
    site?.header.menu?.items?.map(item => 
      item._type === 'menu' ?
        <details key={item._key+pathname} className="relative cursor-pointer group" open={isOpen}>
          <summary 
            aria-haspopup 
            className={clsx(
              'flex items-center',
              linkStyle,
              'sm:group-open:before:fixed sm:group-open:before:top-0 sm:group-open:before:bottom-0 sm:group-open:before:left-0 sm:group-open:before:right-0 sm:group-open:before:content-[""]'
            )}
          >
            {item.title} <CaretDown className='ml-3 group-open:rotate-180' />
          </summary>
          <ul className='right-0 py-2 max-sm:px-2 sm:bg-white sm:absolute'>
            {item.items?.map(subItem => 
              subItem.title !== 'menu' ? 
                <li 
                  key={subItem._key} 
                  className={clsx('flex items-center')}
                >
                  <Link 
                    to={subItem._type === 'navPage' ? subItem.slug : subItem.url}
                    className={clsx('w-full', linkStyle)}
                  >
                    {subItem.title}
                  </Link>
                </li>
              : null
            )}
          </ul>
        </details>
      : <Link 
          key={item._key} 
          to={item._type === 'navPage' ? item.slug : item.url}
          className={clsx('flex items-center', linkStyle)}
        >
          {item.title}
        </Link>
    )
  , [pathname, isOpen])

  return (
    <header className={clsx(
      'fixed w-full z-30 transition duration-300 ease-in-out bg-white',
      !top && 'shadow-lg'
    )}>
      <div className="max-w-6xl px-5 mx-auto sm:px-6">
        <div className="flex items-center justify-between h-16 md:h-20">

          {/* Site branding */}
          <div className="flex-shrink-0 mr-4">
					  <Logo />
          </div>

          {/* Desktop navigation */}
          <nav className="hidden sm:flex">{links}</nav>

          {/* Mobile navigation */}
          <nav className='sm:hidden'>
            <span hidden id="menu-label">Main menu</span>
            <Drawer.Drawer open={isOpen} onChange={setIsOpen}>

              {/* Open Button */}
              <button 
                aria-label="Open menu"
                className='menu-button'
                onClick={open}
              >
                <List className='w-8 h-8' />
              </button>
              
              {/* Backdrop */}
              <Drawer.Target
                portal
                preventScroll
                closeOnEscape
                closedClass='opacity-0'
                openClass='opacity-50'
              >
                <div className='z-40 w-full h-full transition-opacity duration-300 bg-black' onClick={close} />
              </Drawer.Target>

              {/* Navigation drawer */}
              <Drawer.Target
                placement='right'
                portal
                preventScroll
                closeOnEscape
              >
                <div className='z-50 flex flex-col transition-transform duration-300 bg-white w-60'>
                  <div className='flex justify-end h-16 px-5 py-3 md:h-20'>

                    {/* Close Button */}
                    <button 
                      aria-label="Close menu"
                      className='menu-button'
                      onClick={close}
                    >
                      <X className='w-8 h-8' />
                    </button>
                  </div>

                  {links}
                </div>
              </Drawer.Target>
              
            </Drawer.Drawer>
          </nav>

        </div>
      </div>
    </header>
  );
}
