export default {
  title: 'Footer',
  name: 'footer',
  type: 'document',
  fields: [
      {
        title: 'Ticker',
        name: 'ticker',
        type: 'array',       
        of: [
          {
            title: 'Element',
            name: 'element',
            type: 'object',
            preview: {
              select: {
                title: 'subElement.0',
              }
            },
            fields: [
              {
                title: 'Sub Element',
                name: 'subElement',
                type: 'array',
                of: [
                  {
                    title: 'Element',
                    name: 'element',
                    type: 'string'
                  }
                ]
              }
            ]
          }                   
        ]
      }                                
  ]
}