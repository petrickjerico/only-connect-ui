import ClueBox from '../components/ClueBox'
import React, { useContext, useState } from 'react'
import DescriptionBox from '../components/DescriptionBox'
import { Stack } from '@mui/joy'
import { Game, RoundType } from '../types/QuizTypes'
import { AppContext, GameActionKind } from '../utils/GameProvider'

export default function EditClues({
  group,
  round,
  wall,
  descriptionPlaceholder,
}: {
  group: number,
  round: RoundType
  wall?: string,
  descriptionPlaceholder: string
}) {
  const { state, dispatch } = useContext(AppContext)
  return (
    <Stack
      spacing={2}
      justifyContent="center"
      alignItems="center"
      direction="column"
      display="flex"
    >
      <Stack spacing={2} justifyContent='space-between' direction="row" width="100%">
        {[1, 2, 3, 4].map((clue) => {
          return (
            <ClueBox
              key={clue}
              placeholder="Clue 1"
              onChange={(event) => {
                const newGame: Game = wall ? {
                  [round]: {
                    [wall]: {
                      [group]: {
                        clues: {
                          [clue]: event.target.value
                        }
                      }
                    }
                  }
                } : {
                  [round]: {
                    [group]: {
                      clues: {
                        [clue]: event.target.value
                      }
                    }
                  }
                }
                console.log(state)
                dispatch({ type: GameActionKind.UPDATE_CONNECTION, payload: newGame })
              }}
            />
          )
        })}
      </Stack>
      <DescriptionBox
        onChange={(event) => {
          const newGame: Game = wall ? {
            [round]: {
              [wall]: {
                [group]: {
                  description: event.target.value
                }
              }
            }
          } : {
            [round]: {
              [group]: {
                description: event.target.value
              }
            }
          }
          dispatch({ type: GameActionKind.UPDATE_CONNECTION, payload: newGame })
        }}
        placeholder={descriptionPlaceholder}
      />
    </Stack>
  )
}
