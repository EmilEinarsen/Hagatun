import { PreviewSuspense } from '@sanity/preview-kit'
import { QueryParams } from 'sanity';
import { usePreview } from '~/utils/sanityClient';
import { ExitPreview } from './ExitPreview'
import { Page } from './Page'

interface PagePreviewProps {
  query: string;
  params: QueryParams;
}

export const PagePreview = ({ query, params }: PagePreviewProps) => {
  const page = usePreview(null, query, params)
  
  return (
    <>
      <ExitPreview />
      <Page page={page} />
    </>
  )
}