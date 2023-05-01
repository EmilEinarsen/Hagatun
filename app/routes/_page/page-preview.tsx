import { QueryParams } from 'sanity';
import { Page } from '~/loaders/getPage';
import { usePreview } from '~/utils/sanityClient';
import { Module } from '../../components/modules';
import ContactForm from '../../components/modules/contact-form';
import { ExitPreview } from '../../components/app/ExitPreview'

interface PagePreviewProps {
  query: string;
  params: QueryParams;
}

export const PagePreview = ({ query, params }: PagePreviewProps) => {
  const page: Page = usePreview(null, query, params)
  
  return (
    <>
      <ExitPreview />
      {page?.modules?.map((module, i) => (
        <Module key={i} index={i} data={module} />
      ))}
      <ContactForm />
    </>
  )
}