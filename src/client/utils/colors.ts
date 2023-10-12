import { Property } from 'csstype'

export function getGroupColor(colorid: string | Property.Color): Property.Color {
  switch (colorid) {
    case '1':
      return 'lavenderblush'
    case '2':
      return 'floralwhite'
    case '3':
      return 'honeydew'
    case '4':
      return 'azure'
    default:
      return colorid
  }
}
