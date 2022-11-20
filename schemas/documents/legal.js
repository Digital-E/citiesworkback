export default {
  title: 'Legal',
  name: 'legal',
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
        source: (doc) => `legal`,
      },
    },
    {
      title: 'Text',
      name: 'text',
      type: 'richText'
    },
  ]
}