import CoordinatePicker from '../../components/CoordinatePicker'

export default {
  name: 'coordinatePicker',
  type: 'object',
  title: 'Title Position',
  inputComponent: CoordinatePicker,
  fields: [
    { name: 'x', type: 'string', title: 'X' },
    { name: 'y', type: 'string', title: 'Y' },
  ],
}
