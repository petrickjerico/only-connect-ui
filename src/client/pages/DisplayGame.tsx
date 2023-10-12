import {
  Box,
  Button,
} from '@mui/joy'
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
    <Box height='100%' display='flex'>
      <Button disabled={screenId === 0} variant='plain' onClick={() => goTo('previous')} />
      <Box
        flexGrow='1'
        display='flex'
        justifyContent='center'
        alignItems='center'>
        <Outlet />
      </ Box>
      <Button disabled={screenId === 5} variant='plain' onClick={() => goTo('next')} />
    </Box >
  )
}