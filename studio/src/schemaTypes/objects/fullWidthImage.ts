import {defineField, defineType} from 'sanity'
import {ImageIcon} from '@sanity/icons'

export const fullWidthImage = defineType({
  name: 'fullWidthImage',
  title: 'Full Width Image',
  type: 'object',
  icon: ImageIcon,
  fields: [
    defineField({
      name: 'image',
      title: 'Image',
      type: 'image',
      options: {
        hotspot: true,
      },
    }),
    defineField({
      name: 'alt',
      title: 'Alt',
      type: 'string',
    }),
  ],
})
