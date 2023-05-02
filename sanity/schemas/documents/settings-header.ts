import { QueueListIcon } from '@heroicons/react/24/outline'
import { defineType } from 'sanity'
import { i18n } from 'sanity/lib/i18n'

export const HeaderSettingsIcon = QueueListIcon

export const settingsHeader = defineType({
  title: 'Header Settings',
  name: 'headerSettings',
  type: 'document',
  fields: [
    {
      title: 'Main Menu',
      name: 'menu',
      type: 'reference',
      to: [{ type: 'menu' }],
			options: {
				filter: `${i18n.fieldNames.lang} == "${i18n.base}"`
			}
    }
  ],
  preview: {
    prepare() {
      return {
        title: 'Header Settings'
      }
    }
  }
})
