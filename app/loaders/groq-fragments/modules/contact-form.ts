import groq from "groq";

export type ContactFormModule = {
	_type: 'contact-form'
	_key: string
	title: string
	subtitle: string
}

export const contactFormQuery = groq`
  _type,
  _key,
  title,
  subtitle
`
