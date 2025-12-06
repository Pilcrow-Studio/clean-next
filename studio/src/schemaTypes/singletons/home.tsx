import {defineField, defineType} from 'sanity'
import {HomeIcon} from '@sanity/icons'

export const home = defineType({
  name: 'home',
  title: 'Home',
  type: 'document',
  icon: HomeIcon,
  initialValue: {
    _id: 'home',
    _type: 'home',
    title: 'Home',
    slug: {
      _type: 'slug',
      current: '/',
    },
  },
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
    }),
    defineField({
        name: 'slug',
        title: 'Slug',
        type: 'slug',
        description: 'Not used for home page, but kept for consistency',
        hidden: true,
        options: {
          source: 'title',
          maxLength: 96,
        },
    }),
    defineField({
        name: 'pageBuilder',
        title: 'Page builder',
        type: 'array',
        of: [{type: 'callToAction'}, {type: 'infoSection'}, {type: 'fullWidthImage'}],
        options: {
          insertMenu: {
            // Configure the "Add Item" menu to display a thumbnail preview of the content type. https://www.sanity.io/docs/array-type#efb1fe03459d
            views: [
              {
                name: 'grid',
                previewImageUrl: (schemaTypeName) =>
                  `/static/page-builder-thumbnails/${schemaTypeName}.webp`,
              },
            ],
          },
        },
      }),
  ],
})
