
export default {
  title: 'Project',
  name: 'project',
  type: 'document',
  preview: {
    select: {
      title: 'title',
      name: 'name'
    },
    prepare(selection) {
      const {title, name} = selection
      return {
        title: `${name} - ${title}`
      }
    }
  },
  fields: [
    {
      title: 'Name',
      name: 'name',
      type: 'string',
    },
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
        source: (doc) => `projects__${doc.title}`,
      },
    },
    {
      title: 'Tags',
      name: 'tags',
      type: 'array',
      of: [
        {
          title: 'Tag',
          name: 'tag',
          type: 'string' 
        }
      ]
    },
    {
      title: 'Slices',
      name: 'slices',
      type: 'array',
      of: [
        {
          name: 'image',
          type: 'captionImage'
        },
        {
            title: 'Text',
            name: 'Text',
            type: 'object',
            initialValue: {
              label: "Text"
            },
            fields: [
                {
                    name: 'label',
                    type: 'string',
                    readOnly: true
                },           
                {
                  title: 'Text',
                  name: 'text',
                  type: 'richText'
                }
            ]
        },
        {
          name: 'video',
          type: 'object',
          fields: [
            {
            name: 'title',
            type: 'string',
            readOnly: true,
            initialValue: 'Video'
            },            
            {
            name: 'videoId',
            description: 'Add Vimeo or Youtube Video ID',
            type: 'string'
            },
            {
              name: 'caption',
              type: 'string',
              title: 'Caption',
              options: {
                isHighlighted: true
              }
            },
          ]
        },
        {
          name: 'audio',
          type: 'object',
          fields: [
            {
            name: 'title',
            type: 'string',
            readOnly: true,
            initialValue: 'Audio'
            },            
            {
            name: 'file',
            title: 'File',
            type: 'file',
            options: {accept: 'audio/*'}
            },
            {
              name: 'caption',
              type: 'string',
              title: 'Caption',
              options: {
                isHighlighted: true
              }
            },
          ]
        },             
      ]
    }    
  ]
}