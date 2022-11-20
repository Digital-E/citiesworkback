export default {
  title: 'Menu',
  name: 'menu',
  type: 'document',
  fields: [
      {
        title: 'Menu Items',
        name: 'menuItems',
        type: 'array',
        of: [
          {
            name: 'menuItem',
            type: 'object',
            fields: [
                {
                    name: 'label',
                    type: 'string' 
                },
                {
                    name: 'url',
                    type: 'string' 
                }
            ]
          },
        ]
      },
      {
        title: 'Cookie Text',
        name: 'cookietext',
        type: 'richText'
      },
      {
        title: 'Cookie Accept',
        name: 'cookieaccept',
        type: 'string'
      },
      {
        title: 'Cookie Refuse',
        name: 'cookierefuse',
        type: 'string'
      }
  ]
}