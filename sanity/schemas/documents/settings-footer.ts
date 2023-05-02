import { PaperAirplaneIcon, Bars3Icon } from '@heroicons/react/24/outline'
import { defineType } from 'sanity'
import { FlippedQueueListIcon } from 'sanity/lib/custom-icons'
import { i18n } from 'sanity/lib/i18n'

export const FooterSettingsIcon = FlippedQueueListIcon

export const settingsFooter = defineType({
  type: 'document',
  name: 'footerSettings',
  title: 'Footer Settings',
	groups: [
    {
      title: 'Block 1',
      name: 'column1',
      icon: PaperAirplaneIcon,
      default: true
    },
    {
      title: 'Block 2',
      name: 'column2',
      icon: Bars3Icon
    },
    {
      title: 'Block 3',
      name: 'column3',
      icon: Bars3Icon
    }
  ],
  fields: [
    {
      title: 'Social Media Links',
      name: 'socialLinks',
      type: 'array',
			of: [
				{ type: 'socialLink' }
			],
      group: 'column1',
    },
		{
      title: 'Block Title',
      name: 'blockTitle2',
      type: 'string',
      group: 'column2'
    },
    {
      title: 'Block Menu',
      name: 'blockMenu2',
      type: 'reference',
      to: [{ type: 'menu' }],
      group: 'column2',
			options: {
				filter: `${i18n.fieldNames.baseReference} == ${i18n.base}`
			},
    },
    {
      title: 'Block Title',
      name: 'blockTitle3',
      type: 'string',
      group: 'column3'
    },
    {
      title: 'Block Menu',
      name: 'blockMenu3',
      type: 'reference',
      to: [{ type: 'menu' }],
      group: 'column3',
			options: {
				filter: `${i18n.fieldNames.baseReference} == ${i18n.base}`
			},
    }
  ],
  preview: {
    prepare() {
      return {
        title: 'Footer Settings'
      }
    }
  }
})
