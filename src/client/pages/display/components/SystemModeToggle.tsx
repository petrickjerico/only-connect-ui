import { IconButton, useColorScheme } from '@mui/joy'
import LightModeIcon from '@mui/icons-material/LightMode'
import DarkModeIcon from '@mui/icons-material/DarkMode'

export default function SystemModeToggle() {
  const { mode, setMode } = useColorScheme()

  return (
    <IconButton
      variant='soft'
      onClick={() => setMode(mode === 'dark' ? 'light' : 'dark')}>
      {mode === 'dark' ? <DarkModeIcon /> : <LightModeIcon />}
    </IconButton>
  )
}