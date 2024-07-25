import { Divider, IconButton, Input, Stack, styled } from '@mui/joy'
import PlusIcon from '@mui/icons-material/AddRounded'
import MinusIcon from '@mui/icons-material/RemoveRounded'
import { useHost, useHostDispatch } from '../../../utils/context/HostProvider'
import { RoundTypeEnum } from '../../../utils/types/attributes'
import { useEffect, useState } from 'react'

export default function PointCounter() {
  const {
    teamName0,
    teamScore0,
    teamName1,
    teamScore1,
    currentTeam,
    currentPage,
    currentRound
  } = useHost()
  const dispatch = useHostDispatch()

  function isPlaying(team: number) {
    return currentPage === currentRound
      ? team === currentTeam || currentRound === RoundTypeEnum.VOWEL
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
      <StyledInput
        readOnly
        disabled={!isPlaying(0)}
        variant='outlined'
        size='lg'
        value={teamName0}
        sx={(theme) => ({
          height: 'fit-content',
          backgroundColor: `${isPlaying(0)
            ? theme.vars.palette.primary.softBg
            : 'undefined'}`,
          '--Input-focusedThickness': 0,
          '.Mui-disabled': {
            borderColor: 'transparent'
          },
          '& input': {
            textAlign: 'center',
            color: isPlaying(0)
              ? theme.vars.palette.primary.plainColor
              : undefined
          }
        })}
      />
      <Counter
        count={teamScore0}
        delayScoreAction={currentPage === RoundTypeEnum.VOWEL}
        onIncrement={() => dispatch({ type: 'INCREMENT_TEAM_SCORE_0' })}
        onDecrement={() => dispatch({ type: 'DECREMENT_TEAM_SCORE_0' })}
      />
      <Divider orientation='vertical' />
      <Counter
        count={teamScore1}
        delayScoreAction={currentPage === RoundTypeEnum.VOWEL}
        onIncrement={() => dispatch({ type: 'INCREMENT_TEAM_SCORE_1' })}
        onDecrement={() => dispatch({ type: 'DECREMENT_TEAM_SCORE_1' })}
      />
      <StyledInput
        readOnly
        disabled={!isPlaying(1)}
        variant='outlined'
        size='lg'
        value={teamName1}
        sx={(theme) => ({
          height: 'fit-content',
          backgroundColor: `${isPlaying(1)
            ? theme.vars.palette.primary.softBg
            : 'undefined'}`,
          '--Input-focusedThickness': 0,
          '& input': {
            textAlign: 'center',
            color: isPlaying(1) ? theme.vars.palette.primary.plainColor : undefined
          }
        })}
      />
    </Stack>
  )
}

function Counter({
  count,
  delayScoreAction,
  onIncrement,
  onDecrement
}: {
  count: number,
  delayScoreAction: boolean
  onIncrement: () => void,
  onDecrement: () => void
}) {
  const [delayedScoreAction, setDelayedScoreAction] = useState<(() => void) | null>()
  const [differential, setDifferential] = useState<'-1' | '+1' | ''>('')
  const { applyScoreIncrements } = useHost()
  const dispatch = useHostDispatch()

  useEffect(() => {
    dispatch({ type: 'TOGGLE_INCREMENT' })
    delayedScoreAction && delayedScoreAction()
    setDelayedScoreAction(null)
    setDifferential('')
  }, [applyScoreIncrements])

  return (
    <Stack
      direction='column'
      width='7%'>
      <IconButton
        onClick={() => {
          if (delayScoreAction) {
            setDelayedScoreAction(onIncrement)
            setDifferential('+1')
          } else {
            onIncrement()
          }
        }}
        size='sm'
        sx={{ ':focus-visible': { outline: 'none' } }}>
        <PlusIcon style={{ opacity: 0.2 }} />
      </IconButton>
      <Input
        readOnly
        variant='plain'
        color='primary'
        size='lg'
        value={delayScoreAction ? differential : count}
        sx={{
          backgroundColor: 'transparent',
          '& input': { textAlign: 'center', fontWeight: '700' },
          '--Input-focusedThickness': 0,
        }} />
      <IconButton
        onClick={() => {
          if (delayScoreAction) {
            setDelayedScoreAction(onDecrement)
            setDifferential('-1')
          } else {
            onDecrement()
          }
        }}
        size='sm'
        sx={{ ':focus-visible': { outline: 'none' } }}>
        <MinusIcon style={{ opacity: 0.2 }} />
      </IconButton>
    </Stack>
  )
}

const StyledInput = styled(Input)(({ theme }) => ({
  borderColor: theme.vars.palette.primary.plainColor
}))