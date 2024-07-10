import {
  Box,
  IconButton,
  Modal,
  ModalDialog,
  Stack,
  styled,
} from '@mui/joy'
import ChevronLeftRoundedIcon from '@mui/icons-material/ChevronLeftRounded'
import ChevronRightRoundedIcon from '@mui/icons-material/ChevronRightRounded'
import { useEffect, useState } from 'react'
import { Outlet, useMatch, useNavigate } from 'react-router-dom'
import LanguageSelection from '../components/LanguageSelection'
import PointCounter from '../components/PointCounter'
import { stopAllBGM } from '../utils/audios'
import SystemModeToggle from '../components/SystemModeToggle'
import TeamsInfo from '../components/TeamsInfo'
import { useHostDispatch } from '../utils/context/HostProvider'
import GamePicker from '../components/GamePicker'

const screens = [
  'start',
  'connection',
  'sequence',
  'wall',
  'vowel',
  'end'
]

export default function DisplayGame() {
  const match = useMatch('/display/:curr')
  const navigate = useNavigate()
  const dispatch = useHostDispatch()
  const [screenId, setScreenId] = useState<number>(0)
  const [showButton, setShowButton] = useState<boolean>(false)
  const [openFirstTurnPicker, setOpenFirstTurnPicker] = useState<{
    isOpen: boolean,
    hasBeenOpened: boolean
  }>({
    isOpen: false,
    hasBeenOpened: false
  })


  function goTo(where: 'next' | 'previous') {
    let currId = screenId

    switch (where) {
      case 'next':
        currId += 1
        break
      case 'previous':
        currId -= 1
        break
      default:
        break
    }

    setScreenId(currId)
    navigate(screens[currId])
    dispatch({ type: 'UPDATE_CURRENT_PAGE', payload: currId })
    stopAllBGM()
  }

  useEffect(() => {
    const index = screens.indexOf(match?.params.curr as string)
    if (0 <= index && index <= 5) {
      setScreenId(index)
      dispatch({ type: 'UPDATE_CURRENT_PAGE', payload: index })
    }
  }, [])

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
      <Stack alignItems='center' direction='column' width='95%' >
        <PointCounter />
        <Outlet />
        <QuickSettings />
      </Stack>
      <IconButton
        onMouseEnter={() => setShowButton(true)}
        onMouseOut={() => setShowButton(false)}
        disabled={screenId === 5}
        variant='plain'
        onClick={() => {
          if (screenId === 0 && !openFirstTurnPicker.hasBeenOpened) {
            setOpenFirstTurnPicker({ isOpen: true, hasBeenOpened: false })
          } else {
            goTo('next')
          }
        }}
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
      <Modal
        open={openFirstTurnPicker.isOpen}
        onClose={() => setOpenFirstTurnPicker({ isOpen: false, hasBeenOpened: true })}>
        <ModalDialog size='md'>
          <TeamsInfo onSubmit={() => {
            setOpenFirstTurnPicker({ isOpen: false, hasBeenOpened: true })
            goTo('next')
          }} />
        </ModalDialog>
      </Modal>
    </Stack >
  )
}

function QuickSettings() {
  const [hoverState, setHoverState] = useState<'in' | 'transition-in' | 'out' | 'transition-out'>('out')

  return (
    <Stack
      position='absolute'
      zIndex='2'
      bottom={['in', 'transition-in'].includes(hoverState) ? 0 : '-5vh'}
      onMouseEnter={() => {
        setHoverState('transition-in')
        setTimeout(() => {
          setHoverState('in')
        }, 300)
      }}
      onMouseLeave={() => {
        setHoverState('transition-out')
        setTimeout(() => {
          setHoverState('out')
        }, 300)
      }}
      sx={(theme) => ({
        transition: 'bottom 0.3s',
        ':hover': {
          '.hover-up-bar': {
            backgroundColor: theme.vars.palette.neutral.softHoverBg,
            width: '100%',
            transition: 'all 0.3s',
          }
        },
        ':not(:hover)': {
          '.hover-up-bar': {
            backgroundColor: theme.vars.palette.neutral.softBg,
            width: '10vw',
            transition: 'all 0.3s',
          }
        }
      })}
    >
      <Box
        height={['out', 'transition-in'].includes(hoverState) ? '5vh' : 'fit-content'}
        sx={{
          display: 'flex',
          paddingBottom: 1,
          alignItems: 'end',
          justifyContent: 'center',
        }}
      >
        <HoverUpBar className='hover-up-bar' />
      </Box>
      <Stack
        direction='row'
        gap={1}
        paddingBottom={1}
        height='5vh'
      >
        <SystemModeToggle />
        <LanguageSelection />
        <GamePicker />
      </Stack>
    </Stack >
  )
}

const HoverUpBar = styled(Box)(() => ({
  height: 6,
  borderRadius: 4,
  transition: 'all 0.3s',
}))