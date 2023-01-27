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
      title: 'Filters',
      name: 'filters',
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
      title: 'Islands',
      name: 'islands',
      type: 'array',
      of: [
        {
          name: 'Island',
          type: 'object',
          fields: [
              {
                  title: 'Title',
                  name: 'title',
                  type: 'string' 
              }, 
              {
                  title: 'Data Depth',
                  name: 'dataDepth',
                  type: 'string' 
              },                
              {
                  title: 'Title Position X',
                  name: 'titlePositionX',
                  type: 'string' 
              },              
              {
                title: 'Title Position Y',
                name: 'titlePositionY',
                type: 'string' 
              },             
              {
                  title: 'SVG Code',
                  name: 'svg',
                  type: 'text' 
              }, 
              {
                  title: 'Color',
                  name: 'color',
                  type: 'colorPicker' 
              },
              {
                  title: 'Island Position X',
                  name: 'islandPositionX',
                  type: 'string' 
              },              
              {
                title: 'Island Position Y',
                name: 'islandPositionY',
                type: 'string' 
              },                             
              {
                title: 'Projects',
                name: 'projects',
                type: 'array',
                of: [
                  {
                    name: 'Project',
                    type: 'object',
                    fields: [
                      {
                        title: 'Title',
                        name: 'title',
                        type: 'string'
                      },
                      {
                          title: 'Title Position X',
                          name: 'titlePositionX',
                          type: 'string' 
                      },              
                      {
                        title: 'Title Position Y',
                        name: 'titlePositionY',
                        type: 'string' 
                      },
                      {
                        title: 'Project',
                        name: 'project',
                        type: 'reference',
                        weak: true,
                        to: [{type: 'project'}],
                      }
                    ]
                  }                   
                ]
              }
          ]
        },
      ]
    },
  ]
}