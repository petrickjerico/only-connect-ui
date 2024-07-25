import ArrowForward from '@mui/icons-material/ArrowForward'
import { Box, Stack, Tooltip } from '@mui/joy'
import ShortInputBox from '../../components/InputShortBox'
import { GamePayload, GameActionKind, useGameDispatch, useGame } from '../../../../utils/context/GameProvider'
import { Dangerous } from '@mui/icons-material'

export default function EditVowelClues({
  group,
  descriptionPlaceholder,
}: {
  group: string
  descriptionPlaceholder: string
}) {
  const gameState = useGame()
  const dispatch = useGameDispatch()

  function isValidMatch(id: number) {
    const clue: string = gameState.game[`vowel_group${group}_clue${id}`]?.value ?? ''
    const solution: string = gameState.game[`vowel_group${group}_solution${id}`]?.value ?? ''

    if (!clue || !solution) return true

    return clue.replace(/[aeiou\s]/ig, '') === solution.replace(/[aeiou\s]/ig, '')
  }

  function isValidClue(id: number) {
    const clue: string = gameState.game[`vowel_group${group}_clue${id}`]?.value ?? ''

    if (!clue) return true

    return !clue.match(/[aeiou]/ig)
  }

  return (
    <Stack
      spacing={2}
      justifyContent='center'
      alignItems='center'
      direction='column'
      display='flex'
    >
      <ShortInputBox
        clueKey={`vowel_group${group}_description`}
        onChange={(event) => {
          const key: string = `vowel_group${group}_description`
          const payload: GamePayload = {
            key: key,
            value: {
              value: event.target.value,
              round: 'vowel',
              group: group,
              type: 'description',
            },
          }
          dispatch({ type: GameActionKind.UPDATE, payload: payload })
        }}
        placeholder={descriptionPlaceholder}
      />
      {[1, 2, 3, 4].map((clue) => {
        return (
          <Stack key={clue} spacing={2} justifyContent='space-between' direction='row' width='100%'>
            <ShortInputBox
              clueKey={`vowel_group${group}_clue${clue}`}
              placeholder={`Clue ${clue}`}
              upperCase
              onChange={(event) => {
                const key: string = `vowel_group${group}_clue${clue}`
                const payload: GamePayload = {
                  key: key,
                  value: {
                    value: event.target.value,
                    round: 'vowel',
                    group: group,
                    type: 'clue',
                    order: `${clue}`
                  },
                }
                dispatch({ type: GameActionKind.UPDATE, payload: payload })
              }}
            />
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center'
              }}
            >
              <Tooltip
                placement='top'
                size='sm'
                color={isValidClue(clue) && isValidMatch(clue) ? 'neutral' : 'danger'}
                title={isValidClue(clue) && isValidMatch(clue)
                  ? 'This clue-solution pair is valid.'
                  : `${!isValidClue(clue) ? 'No vowels in clues.' : ''} ${!isValidMatch(clue) ? 'Consonants should be in matching order.' : ''}`.trim()}>
                {isValidClue(clue) && isValidMatch(clue) ? <ArrowForward /> : <Dangerous htmlColor='firebrick' />}
              </Tooltip>
            </Box>
            <ShortInputBox
              clueKey={`vowel_group${group}_solution${clue}`}
              placeholder={`Solution ${clue}`}
              upperCase
              onChange={(event) => {
                const key: string = `vowel_group${group}_solution${clue}`
                const payload: GamePayload = {
                  key: key,
                  value: {
                    value: event.target.value,
                    round: 'vowel',
                    group: group,
                    type: 'solution',
                    order: `${clue}`
                  },
                }
                dispatch({ type: GameActionKind.UPDATE, payload: payload })
              }}
            />
          </Stack>
        )
      })}
    </Stack >
  )
}
