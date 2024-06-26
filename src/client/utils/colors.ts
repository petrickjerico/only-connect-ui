import { useTheme } from '@mui/joy/styles'
import { Property } from 'csstype'

export function getGroupColor(colorid: string | Property.Color): Property.Color {
  const theme = useTheme()

  switch (colorid) {
    case '1':
      return theme.vars.palette.danger.softBg
    case '2':
      return theme.vars.palette.warning.softBg
    case '3':
      return theme.vars.palette.success.softBg
    case '4':
      return theme.vars.palette.primary.softBg
    default:
      return colorid
  }
}
