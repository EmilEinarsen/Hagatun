import {Cog6ToothIcon} from '@heroicons/react/24/outline'
import {defineField, defineType} from 'sanity'
import {i18n} from 'sanity/lib/i18n'
import {BLOG_POST_PREFIX} from './blog-post'

export const GeneralSettingsIcon = Cog6ToothIcon

export const settingsGeneral = defineType({
  title: 'General Settings',
  name: 'generalSettings',
  type: 'document',
  groups: [
    {title: 'Site Details', name: 'details', default: true},
    {title: 'Company Details', name: 'company'},
    {title: 'Displays', name: 'displays'},
    {title: 'Advanced', name: 'advanced'},
  ],
  fields: [
    {
      title: 'Home Page',
      name: 'home',
      type: 'reference',
      to: [{type: 'page'}],
      description: 'This page will show at the root of your domain',
      group: 'displays',
    },
    {
      title: 'Blog Page',
      name: 'blog',
      type: 'reference',
      to: [{type: 'page'}],
      validation: (Rule) => [
        Rule.custom((value, context) =>
          context
            .getClient({apiVersion: '2021-06-07'})
            .fetch(`*[_type == 'page' && _id == '${(value as any)._ref}'][0]`)
            .then((page) => {
              const [, blog] = page.slug.current.split('/')

              if (i18n.base !== page.__i18n_lang)
                return `The page locale has to be the same as the base local. Was ${page.__i18n_lang}, requires ${i18n.base}`
              if (BLOG_POST_PREFIX[i18n.base] !== blog)
                return `The page slug is invalid. Needs to be "${i18n.base}/${
                  BLOG_POST_PREFIX[i18n.base]
                }"`

              return true
            })
        ),
      ],
      options: {
        filter: ({document}) => ({
          filter: `${i18n.fieldNames.lang} == "${i18n.base}"` as any,
        }),
      },
      description: `This page will show your blog-posts. The page's slug needs to be "${
        i18n.base
      }/${BLOG_POST_PREFIX[i18n.base]}"`,
      group: 'displays',
    },
    {
      title: 'Error Page (404)',
      name: 'error',
      type: 'reference',
      to: [{type: 'page'}],
      description: 'This page will show for any URL at your domain that does not exist yet',
      group: 'displays',
    },
    {
      name: 'siteTitle',
      title: 'Site Title',
      type: 'object',
      description: 'The name of the site',
      fields: [
        {
          title: 'Long',
          name: 'long',
          description: 'Long form title; Used where appropriate',
          type: 'string',
        },
        {
          title: 'Short',
          name: 'short',
          description: 'Short form title; Used where appropriate',
          type: 'string',
        },
      ],
      group: 'details',
    },
    {
      title: 'Live Site URL',
      description: 'The root domain or subdomain of your website',
      name: 'siteURL',
      type: 'url',
      validation: (Rule) => Rule.required(),
      group: 'details',
    },
    {
      title: 'Google Tag Manager (GTM)',
      description: 'To enable GTM enter your Container ID',
      name: 'gtmID',
      type: 'string',
      group: 'advanced',
    },
    {
      name: 'presets',
      title: 'Developer Presets',
      description: 'Can only be changed by a developer',
      type: 'object',
      fields: [
        {
          title: 'Default language',
          name: 'defaultLang',
          type: 'string',
          options: {
            list: i18n.languages.map((l) => ({...l, value: l.id})),
          },
          readOnly: true,
          initialValue: i18n.base,
        },
        {
          title: 'Strip default language',
          name: 'stripDefaultLang',
          description: 'Remove default language from url',
          type: 'boolean',
          initialValue: i18n.stripBase,
          readOnly: true,
        },
        {
          title: 'Show theme switch',
          name: 'themeSwitch',
          description: 'Show theme switch in production',
          type: 'boolean',
          initialValue: true,
        },
        {
          title: 'Show language select',
          name: 'languageSelect',
          description: 'Show language select in production',
          type: 'boolean',
          initialValue: true,
        },
      ],
      group: 'advanced',
      options: {collapsible: true},
    },
    {
      name: 'postalAddress',
      title: 'Postal Address',
      type: 'string',
      group: 'company',
    },
    {
      name: 'email',
      title: 'Email Address',
      type: 'string',
      group: 'company',
    },
    defineField({
      name: 'bio',
      title: 'Biography',
      type: 'object',
      fieldsets: [
        {
          title: 'Translations',
          name: 'translations',
          options: {collapsible: true},
        },
      ],
      fields: i18n.languages.map((lang) => ({
        title: lang.title,
        name: lang.id,
        type: 'text',
        fieldset: lang.id !== i18n.base ? 'translations' : undefined,
      })),
      group: 'company',
    }),
    {
      name: 'offices',
      title: 'Offices',
      type: 'array',
      of: [{type: 'office'}],
      group: 'company',
    },
  ],
  preview: {
    prepare() {
      return {
        title: 'General Settings',
      }
    },
  },
})
