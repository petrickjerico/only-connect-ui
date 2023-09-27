import ClueBox from '../../components/ClueBox'
import DescriptionBox from '../../components/DescriptionBox'
import { Stack } from '@mui/joy'
import { RoundType } from '../../utils/types/QuizTypes'
import { GameActionKind, GamePayload, useGameDispatch } from '../../utils/context/GameProvider'

export default function EditClues({
  group,
  round,
  wall,
  descriptionPlaceholder,
}: {
  group: string
  round: RoundType
  wall?: string
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
      <Stack spacing={2} justifyContent='space-between' direction='row' width='100%'>
        {[1, 2, 3, 4].map((clue) => {
          return (
            <ClueBox
              key={clue}
              placeholder='Clue 1'
              onChange={(event) => {
                const key: string = wall
                  ? `${round}_wall${wall}_group${group}_clue${clue}`
                  : `${round}_group${group}_clue${clue}`
                const payload: GamePayload = {
                  key: key,
                  value: {
                    value: event.target.value,
                    round: round,
                    wall: wall ?? undefined,
                    group: group,
                    type: 'clue',
                    order: wall ? undefined : `${clue}`
                  },
                }
                dispatch({ type: GameActionKind.UPDATE, payload: payload })
              }}
            />
          )
        })}
      </Stack>
      <DescriptionBox
        onChange={(event) => {
          const key: string = wall
            ? `${round}_wall${wall}_group${group}_description`
            : `${round}_group${group}_description`
          const payload: GamePayload = {
            key: key,
            value: {
              value: event.target.value,
              round: round,
              wall: wall ?? undefined,
              group: group,
              type: 'description',
            },
          }
          dispatch({ type: GameActionKind.UPDATE, payload: payload })
        }}
        placeholder={descriptionPlaceholder}
      />
    </Stack>
  )
}
