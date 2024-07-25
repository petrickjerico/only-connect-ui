import {
  IconButton,
  Modal,
  ModalDialog,
  Stack,
} from '@mui/joy'
import ChevronLeftRoundedIcon from '@mui/icons-material/ChevronLeftRounded'
import ChevronRightRoundedIcon from '@mui/icons-material/ChevronRightRounded'
import { useEffect, useState } from 'react'
import { Outlet, useNavigate } from 'react-router-dom'
import { stopAllBGM } from '../../utils/audios'
import { useHost, useHostDispatch } from '../../utils/context/HostProvider'
import LevelStepperSnackBar from './components/LevelStepperSnackBar'
import PointCounter from './components/PointCounter'
import QuickSettings from './layout/QuickSettings'
import ReloadSnackBar from './components/ReloadSnackBar'
import TeamsInfo from './components/TeamsInfo'

const screens = [
  'start',
  'connection',
  'sequence',
  'wall',
  'vowel',
  'end'
]

export default function DisplayGame() {
  const navigate = useNavigate()
  const dispatch = useHostDispatch()
  const { isNewGame } = useHost()
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
    if (isNewGame) {
      setScreenId(0)
      navigate('start')
      dispatch({ type: 'UPDATE_CURRENT_PAGE', payload: 0 })
      setOpenFirstTurnPicker({
        isOpen: false,
        hasBeenOpened: false
      })
    }
  }, [isNewGame])

  return (
    <Stack
      direction='row'
      height='100%'
      alignItems='center'
      justifyContent='center'
      position='fixed'
      width='100%'
      px={10}
    >
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
        onClose={() => {
          setOpenFirstTurnPicker({ isOpen: false, hasBeenOpened: true })
        }}
      >
        <ModalDialog size='md'>
          <TeamsInfo onSubmit={() => {
            setOpenFirstTurnPicker({ isOpen: false, hasBeenOpened: true })
            dispatch({ type: 'TOGGLE_NEW_GAME' })
            goTo('next')
          }}
          />
        </ModalDialog>
      </Modal>
      <ReloadSnackBar />
      <LevelStepperSnackBar currId={screenId} />
    </Stack >
  )
}
