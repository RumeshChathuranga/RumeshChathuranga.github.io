import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'resume',
  title: 'Resume',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      description: 'Internal label, e.g. "Software Engineering Intern CV"',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'file',
      title: 'PDF File',
      type: 'file',
      options: {
        accept: 'application/pdf',
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'pages',
      title: 'Page Previews',
      type: 'array',
      description: 'Rendered page images, in order. The number of images is shown as the page count.',
      of: [
        {
          type: 'image',
          options: {
            hotspot: false,
          },
        },
      ],
    }),
    defineField({
      name: 'updatedOn',
      title: 'Last Revised',
      type: 'date',
      description: 'The date shown on the site. Set this when the CV content actually changes.',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'isCurrent',
      title: 'Current Version',
      type: 'boolean',
      description: 'Only the current version is shown on the site. Turn this off to archive an old CV.',
      initialValue: true,
    }),
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'updatedOn',
    },
  },
})
