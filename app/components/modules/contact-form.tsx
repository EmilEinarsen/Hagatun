import {EnvelopeIcon, MapPinIcon, PhoneIcon} from '@heroicons/react/24/solid'
import {Form, Link, useNavigation, useSearchParams, useSubmit} from '@remix-run/react'
import React, {useEffect, useRef} from 'react'
import ReCAPTCHA from 'react-google-recaptcha'
import type {Locale} from 'sanity/lib/i18n'
import {i18n} from 'sanity/lib/i18n'

import {useRouteData} from '~/hooks/useRouteData'
import type {Company} from '~/loaders/groq-fragments/documents/site'
import {getENV} from '~/loaders/groq-fragments/utils/getENV'
import {clsx} from 'clsx'
import type {ModuleProps} from '.'
import {Alert} from '../core/alert'

const T = {
  [i18n.LOCALE.se]: {
    title: 'Kontakta oss',
    subtitle: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
  },
  [i18n.LOCALE.en]: {
    title: 'Contact us',
    subtitle: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
  },
} as const satisfies {[K in Locale]: Record<string, string>}

const FORM_FEEDBACK = {
  success: {
    state: 'success',
    title: 'Tack för ditt meddelande!',
    text: 'Vi återkommer så snart vi kan',
  },
  error: {
    state: 'error',
    title: 'Något gick snett',
    text: 'Vi kunde inte skicka ditt meddelande. Försök igen eller kontakta oss på annat sätt',
    button: {
      text: 'Försök igen',
      link: '.',
    },
  },
} as const

const getContactInfo = (company: Company) =>
  [
    {
      icon: EnvelopeIcon,
      title: 'Skriv',
      info: [company.email, company.postalAddress],
    },
    company.offices && {
      icon: PhoneIcon,
      title: 'Ring',
      info: company.offices.map((office) => `${office.name}: ${office.phoneNumber}`),
    },
    company.offices && {
      icon: MapPinIcon,
      title: 'Besök',
      info: company.offices.map((office) => `${office.address}`),
    },
  ].filter((v): v is Exclude<typeof v, undefined> => !!v)

const ContactForm = (props: Partial<ModuleProps<'contact-form'>>) => {
  const {site, lang} = useRouteData()
  const {title = T[lang].title, subtitle = T[lang].subtitle} = props.data ?? {}

  const transition = useNavigation()
  const [search] = useSearchParams()
  const status = +(search.get('status') ?? NaN)

  const state =
    transition.state === 'submitting'
      ? 'submitting'
      : status === 200
      ? 'success'
      : status === 400
      ? 'error'
      : 'idle'

  const formRef = useRef<HTMLFormElement>(null)
  const successRef = useRef<HTMLHeadingElement>(null)

  useEffect(() => {
    if (state === 'success') {
      formRef.current?.reset()
      successRef.current?.focus()
    }
  }, [state])

  const feedback = state === 'success' || state === 'error' ? FORM_FEEDBACK[state] : undefined

  const submit = useSubmit()
  const captchaRef = useRef<any>(null)
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const formData = new FormData(event.currentTarget)

    const captchaToken = await captchaRef.current.executeAsync()
    captchaRef.current.reset()

    formData.set('g-recaptcha-response', captchaToken)

    submit(formData, {
      action: '/api/contact',
      method: 'POST',
      replace: true,
      preventScrollReset: true,
    })
  }

  return (
    <section>
      <div className="max-w-6xl px-4 py-24 mx-auto sm:px-6" id="contact-info">
        <div className="flex flex-wrap justify-around gap-10">
          {getContactInfo(site.company).map((info) => (
            <div key={info.title} className="text-center w-72">
              <div className="p-8 mx-auto rounded-full bg-blue-50 w-fit">
                <info.icon className="w-10 h-10" />
              </div>
              <h2 className="my-2 text-lg font-bold -tracking-tight">{info.title}</h2>
              {info.info.map((v) => (
                <p key={v}>{v}</p>
              ))}
            </div>
          ))}
        </div>
      </div>
      <div className="relative bg-blue-50">
        <span id="contact-form" className="absolute -top-20" />
        <div className="relative max-w-screen-sm px-4 py-24 mx-auto sm:py-16 sm:px-6">
          <h2 className="mb-4 text-4xl font-extrabold tracking-tight text-center text-gray-900">
            {title}
          </h2>
          <p className="mb-8 font-light text-center lg:mb-16 sm:text-xl">{subtitle}</p>
          <div>
            <Form
              ref={formRef}
              aria-hidden={state === 'success'}
              className={clsx('space-y-8 transition-all', feedback && 'blur-sm select-none')}
              onSubmit={handleSubmit}
            >
              <ReCAPTCHA
                sitekey={getENV().RECAPTCHA_SITE_KEY}
                ref={captchaRef}
                size="invisible"
                className="hidden"
              />
              <label className="block">
                <span className="text-gray-700">E-post*</span>
                <input
                  type="email"
                  name="email"
                  className="block w-full mt-1 border-gray-300 rounded-md shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                  required
                />
              </label>

              <label className="block">
                <span className="text-gray-700">Ämne</span>
                <input
                  type="text"
                  name="subject"
                  className="block w-full mt-1 border-gray-300 rounded-md shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                />
              </label>

              <label className="block">
                <span className="text-gray-700">Meddelande</span>
                <textarea
                  name="message"
                  className="block w-full mt-1 border-gray-300 rounded-md shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                  rows={6}
                  required
                />
              </label>

              <button
                type="submit"
                className="h-12 text-white bg-blue-700 rounded-lg btn max-sm:w-full sm:w-fit hover:bg-blue-800 focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                disabled={state === 'submitting'}
              >
                {state === 'submitting' ? (
                  <div role="status">
                    <svg
                      aria-hidden="true"
                      className="w-6 h-6 mr-2 text-gray-200 animate-spin fill-blue-600"
                      viewBox="0 0 100 101"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                        fill="currentColor"
                      />
                      <path
                        d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                        fill="currentFill"
                      />
                    </svg>
                    <span className="sr-only">Loading...</span>
                  </div>
                ) : (
                  'Skicka meddelande'
                )}
              </button>
            </Form>
            <div
              className={clsx(
                'absolute top-0 left-0 px-4 flex w-full h-full opacity-0 transition-opacity',
                feedback && 'opacity-100',
                !feedback && 'hidden'
              )}
              hidden={!feedback}
            >
              {feedback && (
                <Alert status={feedback.state}>
                  <h2 className="text-xl font-bold" tabIndex={-1}>
                    {feedback.title}
                  </h2>
                  <p className="text-md">{feedback.text}</p>
                  {feedback.state === 'error' && (
                    <Link
                      to={feedback.button.link}
                      className="mt-4 text-white bg-red-500 text-md btn-sm"
                      preventScrollReset
                    >
                      {feedback.button.text}
                    </Link>
                  )}
                </Alert>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default ContactForm
