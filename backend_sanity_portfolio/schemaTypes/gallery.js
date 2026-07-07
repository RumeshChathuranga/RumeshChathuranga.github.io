import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'gallery',
  title: 'Gallery',
  type: 'document',
  fields: [
    defineField({
      name: 'alt',
      title: 'Alt Text',
      type: 'string',
    }),
    defineField({
      name: 'imgUrl',
      title: 'ImageUrl',
      type: 'image',
      options: {
        hotspot: true,
      },
    }),
    defineField({
      name: 'mobileHidden',
      title: 'Hide on Mobile',
      type: 'boolean',
      initialValue: false,
    }),
  ],
})
