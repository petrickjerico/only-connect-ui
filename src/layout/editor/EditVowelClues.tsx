import ArrowForward from '@mui/icons-material/ArrowForward'
import { Box, Stack } from '@mui/joy'
import ShortInputBox from '../../components/ShortInputBox'
import { GamePayload, GameActionKind, useGameDispatch } from '../../utils/context/GameProvider'

export default function EditVowelClues({
  group,
  descriptionPlaceholder,
}: {
  group: string
  descriptionPlaceholder: string
}) {
  const dispatch = useGameDispatch()

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
              clueKey={`vowel_group${group}_solution${clue}`}
              placeholder={`Clue ${clue}`}
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
              <ArrowForward />
            </Box>
            <ShortInputBox
              clueKey={`vowel_group${group}_solution${clue}`}
              placeholder={`Solution ${clue}`}
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
    </Stack>
  )
}
