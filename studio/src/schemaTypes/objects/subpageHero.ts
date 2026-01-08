import {defineField, defineType} from 'sanity'
import {DocumentIcon} from '@sanity/icons'

export const subpageHero = defineType({
  name: 'subpageHero',
  title: 'Subpage Hero',
  type: 'object',
  icon: DocumentIcon,
  fields: [
    defineField({
      name: 'heading',
      title: 'Heading',
      type: 'string',
    }),
    defineField({
      name: 'content',
      title: 'Content',
      type: 'blockContent',
    }),
  ],
  preview: {
    select: {
      title: 'heading',
    },
    prepare({title}) {
      return {
        title: title || 'Untitled Subpage Hero',
        subtitle: 'Subpage Hero',
      }
    },
  },
})