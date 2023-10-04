import {
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
} from 'react-router-dom'

export default function App() {
  const theme = useTheme()

  return (
    <ThemeProvider theme={theme}>
      <GameProvider>
        <Router>
          <Routes>
            <Route path='/' element={<CreateGame />} />
            <Route path='display' element={<DisplayGame useMock />} />\
          </Routes>
        </Router>
      </GameProvider>
    </ThemeProvider>
  )
}
