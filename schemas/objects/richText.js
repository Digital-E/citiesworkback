export default {
  title: 'Rich text',
  name: 'richText',
  type: 'array',
  of: [
    {
      type: 'block'
    },
    {
      type: 'file',
      fields: [
        {
          type: 'string',
          name: 'label',
          title: 'Label',
          options: {
            isHighlighted: true
          }
        }
      ],
      options: {
        accept: ".pdf",
      }
    }     
  ]
}