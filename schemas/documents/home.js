export default {
  title: 'Home',
  name: 'home',
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
        source: `/`,
      },
    },
    {
      title: 'Slides',
      name: 'slides',
      type: 'array',
      of: [
        {
          name: 'slide',
          type: 'object',
          fields: [
              {
                  name: 'slideText',
                  type: 'richText' 
              },
          ]
        },
      ]
    },
  ]
}