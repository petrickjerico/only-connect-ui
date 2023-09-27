import {
  Divider,
  Stack,
  ThemeProvider,
  useTheme,
} from '@mui/joy'
import './App.css'
import GameProvider from './utils/context/GameProvider'
import Editor from './layout/Editor'
import Finalizer from './layout/Finalizer'
import Sidebar from './layout/Sidebar'

function App() {
  const theme = useTheme()

  return (
    <ThemeProvider theme={theme}>
      <GameProvider>
        <Stack direction='row' height='100vh' divider={<Divider orientation='vertical' />}>
          <Sidebar />
          <Editor />
          <Finalizer />
        </Stack>
      </GameProvider>
    </ThemeProvider>
  )
}

export default App
