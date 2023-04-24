import { Link } from '@remix-run/react'
import React from 'react'

import { Logo } from '~/components/app/Logo'
import { useRouteData } from '~/hooks/useRouteData'

const T = {
	'contact information': {
		en: 'contact information',
		se: 'kontakt information'
	},
	'offices': {
		en: 'offices',
		se: 'kontor'
	},
	'postal address': {
		en: 'postal address',
		se: 'post address'
	}
} as const

export const Footer = () => {
	const { site, lang } = useRouteData()
  return (
    <footer>
      <div className="max-w-6xl px-4 mx-auto sm:px-6">

        {/* Top area: Blocks */}
        <div className="grid grid-cols-12 gap-8 py-8 border-t border-gray-200 md:py-12">

          {site?.footer.blocks?.map(block => 
            block._type === 'bio' ? (
              <div key={block._key} className="col-span-12 sm:col-span-3">
                <Logo titleType='none' />
                {/* <p className='mt-4 text-sm max-w-prose'>{block.bio}</p> */}
              </div>
            )

            : block._type === 'menu' ? (
              <div key={block._key} className="col-span-6 sm:col-span-3">
                <h3 className="mb-2 font-medium text-gray-800">{block.title}</h3>
                <ul className="mt-4">
                  {block.items?.map(subItem => 
                    <li key={subItem._key} className="mb-2">
                      <Link
                        to={subItem._type === 'navPage' ? subItem.slug : subItem.url}
                        className="transition duration-150 ease-in-out hover:text-gray-900"
                      >
                        {subItem.title}
                      </Link>
                    </li>
                  )}                        
                </ul>
              </div>
            )

            : block._type === 'information' ?
              <div key={block._key} className="col-span-12 sm:col-span-3">
                <h3 className="mb-2 font-medium text-gray-800">{T['contact information'][lang]?.toCapitalize()}</h3>
                {block.offices?.map(office =>
                  <React.Fragment key={office._key}>
                    <h4 className="mt-4 mb-1 text-sm font-medium text-gray-800">{office.name?.toCapitalize()+':'}</h4>
                    <p className="text-sm">{office.address}</p>
                    {office._type === 'office' && <a href={`tel:${office.phoneNumber}`} className="text-sm">{office.phoneNumber}</a>}
                  </React.Fragment>
                )}
                <p className="mt-6 text-sm">{block.postalAddress}</p>
                <a href={`mailto:${block.email}`} className="text-sm">{block.email}</a>
              </div>

            : null
          )}
        </div>

        {/* Bottom area */}
        <div className="py-4 border-t border-gray-200 md:flex md:items-center md:justify-between md:py-8">

          {/* Social links */}
          {/* {block.socialLinks?.map(item =>
            <Link key={item.icon} to={item.url} className={item.icon.toLowerCase()}>{ICON[item.icon as never]}</Link>
          )} */}
          <ul className="flex mb-4 md:order-1 md:ml-4 md:mb-0">
            <li>
              <Link to="#" className="flex items-center justify-center transition duration-150 ease-in-out bg-white rounded-full shadow hover:text-gray-900 hover:bg-white-100" aria-label="Twitter">
                <svg className="w-8 h-8 fill-current" viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg">
                  <path d="M24 11.5c-.6.3-1.2.4-1.9.5.7-.4 1.2-1 1.4-1.8-.6.4-1.3.6-2.1.8-.6-.6-1.5-1-2.4-1-1.7 0-3.2 1.5-3.2 3.3 0 .3 0 .5.1.7-2.7-.1-5.2-1.4-6.8-3.4-.3.5-.4 1-.4 1.7 0 1.1.6 2.1 1.5 2.7-.5 0-1-.2-1.5-.4 0 1.6 1.1 2.9 2.6 3.2-.3.1-.6.1-.9.1-.2 0-.4 0-.6-.1.4 1.3 1.6 2.3 3.1 2.3-1.1.9-2.5 1.4-4.1 1.4H8c1.5.9 3.2 1.5 5 1.5 6 0 9.3-5 9.3-9.3v-.4c.7-.5 1.3-1.1 1.7-1.8z" />
                </svg>
              </Link>
            </li>
            <li className="ml-4">
              <Link to="#" className="flex items-center justify-center transition duration-150 ease-in-out bg-white rounded-full shadow hover:text-gray-900 hover:bg-white-100" aria-label="Facebook">
                <svg className="w-8 h-8 fill-current" viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg">
                  <path d="M14.023 24L14 17h-3v-3h3v-2c0-2.7 1.672-4 4.08-4 1.153 0 2.144.086 2.433.124v2.821h-1.67c-1.31 0-1.563.623-1.563 1.536V14H21l-1 3h-2.72v7h-3.257z" />
                </svg>
              </Link>
            </li>
          </ul>

          {/* Copyrights note */}
          <div className="mr-4 ">Made by <a className="text-blue-600 hover:underline" href="#">Hagatun IT</a>. All rights reserved.</div>

        </div>

      </div>
    </footer>
  );
}
