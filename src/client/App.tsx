import {
  CssBaseline,
  CssVarsProvider,
  ThemeProvider,
  useTheme,
} from '@mui/joy'
import './App.css'
import GameProvider from './utils/context/GameProvider'
import CreateGame from './pages/CreateGame'
import DisplayGame from './pages/DisplayGame'
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from 'react-router-dom'
import DisplayConnectionRound from './pages/displays/DisplayConnectionRound'
import DisplaySequenceRound from './pages/displays/DisplaySequenceRound'
import DisplayWallRound from './pages/displays/DisplayWallRound'
import DisplayVowelRound from './pages/displays/DisplayVowelRound'
import DisplayStartScreen from './pages/displays/DisplayStartScreen'
import DisplayEndScreen from './pages/displays/DisplayEndScreen'
import HostProvider from './utils/context/HostProvider'

export default function App() {
  const theme = useTheme()

  return (
    <CssVarsProvider>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <GameProvider>
          <Router>
            <Routes>
              <Route path='/' element={<CreateGame />} />
              <Route path='display' element={<HostProvider><DisplayGame /></HostProvider>}>
                <Route index element={<Navigate to='start' />} />
                <Route path='start' element={<DisplayStartScreen />} />
                <Route path='connection' element={<DisplayConnectionRound />} />
                <Route path='sequence' element={<DisplaySequenceRound />} />
                <Route path='wall' element={<DisplayWallRound />} />
                <Route path='vowel' element={<DisplayVowelRound />} />
                <Route path='end' element={<DisplayEndScreen />} />
                <Route path='*' element={<Navigate to='start' />} />
              </Route>
            </Routes>
          </Router>
        </GameProvider>
      </ThemeProvider>
    </CssVarsProvider >

  )
}
