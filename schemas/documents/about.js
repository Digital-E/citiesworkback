export default {
  title: 'About',
  name: 'about',
  type: 'document',
  fields: [
    {
      title: 'Title',
      name: 'title',
      type: 'string',
    },
    {
      title: 'Content',
      name: 'content',
      type: 'string',
    },
    {
      title: 'Slug',
      name: 'slug',
      type: 'slug',
      options: {
        source: (doc) => `about`,
      },
    },
    {
      title: 'Text Column One',
      name: 'textcolumnone',
      type: 'richText'
    },
    {
      title: 'Text Column Two',
      name: 'textcolumntwo',
      type: 'richText'
    },
    {
      title: 'Text Column Three',
      name: 'textcolumnthree',
      type: 'richText'
    },
  ]
}