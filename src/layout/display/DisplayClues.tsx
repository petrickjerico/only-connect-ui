import { Box, Button, ButtonGroup, Sheet, Stack, styled } from '@mui/joy'
import { ClueGroup } from '../../utils/types/display'
import DisplayClueBox from '../../components/DisplayClueBox'
import DisplayDescriptionBox from '../../components/DisplayDescriptionBox'
import { useState } from 'react'
import LinearTimer from '../../components/LinearTimer'
import DisplayGroupBox from '../../components/DisplayGroupBox'
import { CluesBGM, playAudio, stopAudio } from '../../assets/audios'

const enum RoundState {
  READY,
  PLAY,
  GUESS,
  THROW,
  END
}

export default function DisplayClues({
  groupKey,
  data,
  hideLast
}: {
  groupKey: string,
  data: ClueGroup,
  hideLast?: boolean
}) {

  const clues = Object.entries(data).filter(([key]) => key !== 'description')
  const description = data.description
  const [shown, setShown] = useState<number[]>([0])
  const [gameState, setGameState] = useState<RoundState>(RoundState.READY)


  function showUntil(index: number) {
    if (hideLast && index === 2) {
      setShown(Array.from(Array(index + 2).keys()))
    } else {
      setShown(Array.from(Array(index + 1).keys()))
    }
  }

  function getLastShown(): number {
    return shown[shown.length - 1]
  }

  function getScore(index: 0 | 1 | 2 | 3 | number): string {
    switch (index) {
      case 0:
        return '5 points'
      case 1:
        return '3 points'
      case 2:
        return '2 points'
      case 3:
        return '1 point'
      default:
        return ''
    }
  }

  function getTimerVisibility(index: number) {
    if (!hideLast || hideLast && index < 2) {
      return index === getLastShown()
    } else if (index === 2) {
      return getLastShown() === 3 && gameState < RoundState.THROW
    } else {
      return gameState === RoundState.THROW
    }
  }

  return (
    <Box display='flex' alignItems='center' justifyContent='center' px={4}>
      {gameState === RoundState.READY &&
        <DisplayGroupBox
          groupId={groupKey}
          onClick={() => {
            playAudio(CluesBGM)
            setGameState(RoundState.PLAY)
          }} />}
      {gameState > RoundState.READY &&
        <Stack gap={2} flexGrow={1}>
          <Stack direction='row' gap={2}>
            {clues.map(([key], index) => (
              <LinearTimer
                key={key}
                text={getScore(index)}
                duration={42}
                isVisible={getTimerVisibility(index)}
                isCounting={gameState === RoundState.PLAY}
                isEnd={gameState > RoundState.GUESS}
                onComplete={() => setGameState(RoundState.GUESS)}
              />
            ))}
          </Stack>
          <Stack direction='row' gap={2}>
            {clues.map(([key, value], index) => (
              <Sheet key={key} sx={{ width: '100%' }}>
                {!shown.includes(index) && <StyledButton variant='plain' onClick={() => showUntil(index)}>
                  show until here
                </StyledButton>}
                {shown.includes(index) && <DisplayClueBox clue={hideLast && index === 3 && gameState < RoundState.END ? '?' : value} />}
              </Sheet>
            ))}
          </Stack>
          <Sheet>
            {gameState < RoundState.END &&
              <StyledButtonGroup variant='plain'>
                <Button
                  fullWidth
                  disabled={gameState >= RoundState.GUESS}
                  onClick={() => {
                    setGameState(RoundState.GUESS)
                    stopAudio(CluesBGM)
                  }}>
                  Stop timer
                </Button>
                <Button
                  fullWidth
                  disabled={gameState !== RoundState.GUESS}
                  onClick={() => {
                    setGameState(RoundState.THROW)
                    showUntil(3)
                  }}>
                  Throw
                </Button>
                <Button
                  fullWidth
                  disabled={gameState <= RoundState.PLAY}
                  onClick={() => {
                    setGameState(RoundState.END)
                    showUntil(4)
                  }}>
                  Show answer
                </Button>
              </StyledButtonGroup>}
            <DisplayDescriptionBox description={description} />
          </Sheet>
        </Stack>}
    </Box>
  )
}

const StyledButton = styled(Button)(({ theme }) => ({
  height: '100%',
  width: '100%',
  textAlign: 'center',
  position: 'absolute',
  borderRadius: '12px',
  color: 'transparent',
  backgroundColor: theme.palette.neutral[100],
  zIndex: '1',
  [':hover']: {
    backgroundColor: theme.palette.neutral[100],
    color: theme.palette.primary[500]
  }
}))

const StyledButtonGroup = styled(ButtonGroup)(({ theme }) => ({
  height: '100%',
  width: '100%',
  justifyContent: 'space-between',
  textAlign: 'center',
  position: 'absolute',
  borderRadius: '12px',
  color: 'transparent',
  backgroundColor: theme.palette.neutral[100],
  zIndex: '1',
  [':hover']: {
    backgroundColor: theme.palette.neutral[100],
    color: theme.palette.primary[500]
  }
}))

