import { Box, Stack, styled } from '@mui/joy'
import { useState } from 'react'
import GamePicker from '../components/GamePicker'
import LanguageSelection from '../components/LanguageSelection'
import ResetGame from '../components/ResetGame'
import SystemModeToggle from '../components/SystemModeToggle'

export default function QuickSettings() {
  const [hoverState, setHoverState] = useState<'in' | 'transition-in' | 'out' | 'transition-out'>('out')

  function hoverTransition(state: 'in' | 'out') {
    setHoverState(`transition-${state}`)
    setTimeout(() => {
      setHoverState(state)
    }, 300)
  }

  return (
    <HoverUpStack
      hide={String(['in', 'transition-in'].includes(hoverState))}
      onMouseEnter={() => hoverTransition('in')}
      onMouseLeave={() => hoverTransition('out')}
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
        <ResetGame />
      </Stack>
    </HoverUpStack >
  )
}

const HoverUpBar = styled(Box)(() => ({
  height: 6,
  borderRadius: 4,
  transition: 'all 0.3s',
}))

const HoverUpStack = styled(Stack)<{ hide?: string }>(({ hide, theme }) => ({
  transition: 'bottom 0.3s',
  position: 'fixed',
  bottom: hide === 'true' ? 0 : '-5vh',
  zIndex: '2',
  ':hover': {
    '.hover-up-bar': {
      backgroundColor: theme.vars.palette.neutral.softHoverBg,
      width: '100%',
    }
  },
  ':not(:hover)': {
    '.hover-up-bar': {
      backgroundColor: theme.vars.palette.neutral.softBg,
      width: '10vw',
    }
  }
}))