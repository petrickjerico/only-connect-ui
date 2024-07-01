import { Divider, IconButton, Input, Stack } from '@mui/joy'
import PlusIcon from '@mui/icons-material/AddRounded'
import MinusIcon from '@mui/icons-material/RemoveRounded'
import { useState } from 'react'
import { useHost } from '../utils/context/HostProvider'
import { RoundTypeEnum } from '../utils/types/attributes'

export default function PointCounter() {
  const { players, currentPlayer, currentPage, currentRound } = useHost()

  function isPlaying(player: number) {
    return currentPage === currentRound
      ? player === currentPlayer || currentRound === RoundTypeEnum.VOWEL
      : false
  }

  return (
    <Stack
      display={0 < currentPage && currentPage < 5 ? 'flex' : 'none'}
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
        readOnly
        disabled={!isPlaying(0)}
        variant='plain'
        size='lg'
        value={players[0]}
        sx={{
          height: 'fit-content',
          backgroundColor: 'transparent',
          '--Input-focusedThickness': 0,
          '& input': { textAlign: 'right' }
        }}
      />
      <Counter />
      <Divider orientation='vertical' />
      <Counter />
      <Input
        readOnly
        disabled={!isPlaying(1)}
        variant='plain'
        size='lg'
        value={players[1]}
        sx={{
          height: 'fit-content',
          backgroundColor: 'transparent',
          '--Input-focusedThickness': 0
        }}
      />
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