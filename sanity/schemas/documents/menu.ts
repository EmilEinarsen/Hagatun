import {Bars3Icon} from '@heroicons/react/24/outline'
import {defineType} from 'sanity'
import {i18n} from 'sanity/lib/i18n'

export const MenuIcon = Bars3Icon

export const menu = defineType({
  type: 'document',
  name: 'menu',
  title: 'Menu',
  i18n: true,
  initialValue: {
    __i18n_lang: i18n.base,
  },
  icon: MenuIcon,
  fields: [
    {
      type: 'string',
      name: 'title',
      title: 'Menu Title',
    },
    {
      type: 'array',
      name: 'items',
      title: 'Items',
      of: [
        {type: 'navPage'},
        {type: 'navLink'},
        {
          type: 'reference',
          title: 'Menu reference',
          to: [{type: 'menu'}],
          options: {
            filter: ({document}) => ({
              filter: `${i18n.fieldNames.lang} == "${document.__i18n_lang}"` as any,
            }),
          },
        },
      ],
    },
  ],
  preview: {
    select: {
      title: 'title',
      items: 'items',
    },
    prepare: (v) => ({
      title: v.title || 'Untitled',
      subtitle: v.items?.length ? `${v.items.length} link(s)` : 'empty',
      media: MenuIcon,
    }),
  },
})
