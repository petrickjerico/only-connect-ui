import React, { Dispatch, createContext, useContext, useReducer } from 'react'
import { GameInput, GameAttribute } from '../types/attributes'

export const enum GameActionKind {
  UPDATE = 'UPDATE',
}

export interface GamePayload {
  key: string
  value: GameAttribute
}

interface GameAction {
  type: GameActionKind
  payload: GamePayload
}

interface GameState {
  game: GameInput
}

const initialGameState: GameState = {
  game: {},
}

// Our reducer function that uses a switch statement to handle our actions
function gameReducer(state: GameState, action: GameAction) {
  const { type, payload } = action

  switch (type) {
    case GameActionKind.UPDATE:
      return {
        ...state,
        game: {
          ...state.game,
          [payload.key]: payload.value,
        },
      }
    default:
      return state
  }
}

const GameContext = createContext<GameState>(initialGameState)
const GameDispatchContext = createContext<Dispatch<GameAction>>(() => { })

export function useGame() {
  return useContext(GameContext)
}

export function useGameDispatch() {
  return useContext(GameDispatchContext)
}

export default function GameProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(gameReducer, initialGameState)

  return (
    <GameContext.Provider value={state}>
      <GameDispatchContext.Provider value={dispatch}>{children}</GameDispatchContext.Provider>
    </GameContext.Provider>
  )
}
