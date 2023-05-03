import {StopIcon} from '@heroicons/react/24/outline'
import {defineType} from 'sanity'

export const getIcon = (icon: string) => {
  switch (icon) {
    case 'Facebook':
      return {Icon: StopIcon, color: '#1877F2'}
    case 'Instagram':
      return {Icon: StopIcon, color: '#EC3397'}
    case 'Twitter':
      return {Icon: StopIcon, color: '#1DA1F2'}
    case 'Likedin':
      return {Icon: StopIcon, color: '#0A66C2'}
    default:
      return {Icon: null, color: ''}
  }
}

export const socialLink = defineType({
  type: 'object',
  name: 'socialLink',
  title: 'Social Link',
  options: {
    columns: 2,
    collapsible: false,
  },
  fields: [
    {
      type: 'string',
      name: 'icon',
      title: 'Icon',
      options: {
        list: [
          {title: 'Facebook', value: 'Facebook'},
          {title: 'Instagram', value: 'Instagram'},
          {title: 'Twitter', value: 'Twitter'},
          {title: 'Linkedin', value: 'Linkedin'},
        ],
      },
    },
    {
      type: 'url',
      name: 'url',
      title: 'URL',
    },
  ],
  preview: {
    select: {
      icon: 'icon',
      url: 'url',
    },
    prepare({icon, url}) {
      return {
        title: icon,
        subtitle: url ? url : '(url not set)',
      }
    },
  },
})
