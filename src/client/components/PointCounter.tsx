import { Divider, IconButton, Input, Stack } from '@mui/joy'
import PlusIcon from '@mui/icons-material/AddRounded'
import MinusIcon from '@mui/icons-material/RemoveRounded'
import { useState } from 'react'

export default function PointCounter() {
  return (
    <Stack
      direction='row'
      gap={1}
      sx={{
        zIndex: 2,
        position: 'absolute',
        width: 'fit-content',
        top: '2%',
        justifyContent: 'center',
        alignItems: 'center'
      }}>
      <Input
        variant='plain'
        placeholder='Team A'
        size='lg'
        sx={(theme) => ({
          height: 'fit-content',
          backgroundColor: 'transparent',
          ':hover': { backgroundColor: `${theme.vars.palette.neutral.softHoverBg}` },
          ':focus-within': { backgroundColor: `${theme.vars.palette.neutral.softActiveBg}` },
          '--Input-focusedThickness': 0,
          '& input': { textAlign: 'right', fontWeight: '500' }
        })} />
      <Counter />
      <Divider orientation='vertical' />
      <Counter />
      <Input
        variant='plain'
        placeholder='Team B'
        size='lg'
        sx={(theme) => ({
          height: 'fit-content',
          backgroundColor: 'transparent',
          ':hover': { backgroundColor: `${theme.vars.palette.neutral.softHoverBg}` },
          ':focus-within': { backgroundColor: `${theme.vars.palette.neutral.softActiveBg}` },
          '--Input-focusedThickness': 0,
          '& input': { fontWeight: '500' }
        })} />
    </Stack>
  )
}

function Counter() {
  const [score, setScore] = useState<number>(0)

  return (
    <Stack
      direction='column'
      width='7%'>
      <IconButton
        onClick={() => setScore(score + 1)}
        size='sm'
        sx={{ ':focus-visible': { outline: 'none' } }}>
        <PlusIcon style={{ opacity: 0.2 }} />
      </IconButton>
      <Input
        readOnly
        variant='plain'
        color='primary'
        size='lg'
        value={score}
        sx={{
          backgroundColor: 'transparent',
          '& input': { textAlign: 'center', fontWeight: '700' },
          '--Input-focusedThickness': 0,
        }} />
      <IconButton
        onClick={() => setScore(score - 1)}
        size='sm'
        sx={{ ':focus-visible': { outline: 'none' } }}>
        <MinusIcon style={{ opacity: 0.2 }} />
      </IconButton>
    </Stack>
  )
}