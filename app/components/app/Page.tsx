import React from 'react'
import { RouteData } from '~/loaders'
import { Module } from '../modules'

interface PageProps {
  page: RouteData['page']
}

export const Page = ({ page }: PageProps) => {
  
  return (
    <>
      {page?.modules?.map((module, i) => (
        <Module key={i} index={i} data={module} />
      ))}
    </>
  )
}
