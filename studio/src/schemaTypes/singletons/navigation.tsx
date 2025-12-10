import {defineType, defineField} from 'sanity'
import {MenuIcon} from '@sanity/icons'

export const navigationType = defineType({
  name: 'navigation',
  type: 'document',
  title: 'Main Menu',
  icon: MenuIcon,
  initialValue: {
    _id: 'navigation',
    _type: 'navigation',
  },
  fields: [
    defineField({
      name: 'logo',
      type: 'image',
      title: 'Logo',
      validation: (Rule) => Rule.required(),
      fields: [
        {
          name: 'alt',
          type: 'string',
          title: 'Alternative Text',
        },
      ],
    }),
    defineField({
      name: 'items',
      type: 'array',
      title: 'Menu Items',
      of: [
        {
          type: 'object',
          fields: [
            {
              name: 'text',
              type: 'string',
              title: 'Link Text',
              validation: (Rule) => Rule.required(),
            },
            {
              name: 'page',
              type: 'reference',
              title: 'Page',
              to: [{type: 'page'}],
              validation: (Rule) => Rule.required(),
            },
          ],
          preview: {
            select: {
              title: 'text',
              subtitle: 'page.title',
            },
          },
        },
      ],
    }),
  ],
  preview: {
    select: {
      items: 'items',
    },
    prepare({items}) {
      const count = items?.length || 0
      return {
        title: 'Navigation',
        subtitle: `${count} menu item${count !== 1 ? 's' : ''}`,
      }
    },
  },
})
