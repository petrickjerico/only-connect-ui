import {
  IconButton,
  Stack,
} from '@mui/joy'
import ChevronLeftRoundedIcon from '@mui/icons-material/ChevronLeftRounded'
import ChevronRightRoundedIcon from '@mui/icons-material/ChevronRightRounded'
import { useEffect, useState } from 'react'
import { Outlet, useMatch, useNavigate } from 'react-router-dom'

const screens = [
  'start',
  'connections',
  'sequences',
  'walls',
  'vowels',
  'end'
]

export default function DisplayGame() {
  const match = useMatch('/display/:curr')
  const [screenId, setScreenId] = useState<number>(0)
  const [showButton, setShowButton] = useState<boolean>(false)
  const navigate = useNavigate()

  useEffect(() => {
    const index = screens.indexOf(match?.params.curr as string)
    if (index > 0) {
      setScreenId(index)
    }
  }, [])

  function goTo(where: 'next' | 'previous') {
    if (where === 'previous' && screenId > 0) {
      const currId = screenId - 1
      setScreenId(currId)
      navigate(screens[currId])
    }
    if (where === 'next' && screenId < 5) {
      const currId = screenId + 1
      setScreenId(currId)
      navigate(screens[currId])
    }
  }

  return (
    <Stack
      direction='row'
      height='100%'
      alignItems='center'
      justifyContent='center'
      px={10}>
      <IconButton
        onMouseEnter={() => setShowButton(true)}
        onMouseOut={() => setShowButton(false)}
        disabled={screenId === 0}
        variant='plain'
        onClick={() => goTo('previous')}
        sx={{
          height: '100%',
          width: '5%',
          zIndex: 1,
          position: 'absolute',
          left: 0,
          opacity: showButton ? 1 : 0.25,
          borderRadius: 0
        }}>
        <ChevronLeftRoundedIcon />
      </IconButton>
      <Outlet />
      <IconButton
        onMouseEnter={() => setShowButton(true)}
        onMouseOut={() => setShowButton(false)}
        disabled={screenId === 5}
        variant='plain'
        onClick={() => goTo('next')}
        sx={{
          height: '100%',
          width: '5%',
          zIndex: 1,
          position: 'absolute',
          right: 0,
          opacity: showButton ? 1 : 0.25,
          borderRadius: 0
        }}>
        <ChevronRightRoundedIcon />
      </IconButton>
    </Stack >
  )
}