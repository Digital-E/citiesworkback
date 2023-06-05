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
      }
  ]
}