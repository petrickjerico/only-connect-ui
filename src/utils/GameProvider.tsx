import React, { createContext, useReducer } from "react";
import { Game } from "../types/QuizTypes";

export const enum GameActionKind {
  UPDATE_CONNECTION = 'UPDATE_CONNECTION',
  UPDATE_SEQUENCE = 'UPDATE_SEQUENCE',
  UPDATE_WALL = 'UPDATE_WALL',
  UPDATE_VOWEL = 'UPDATE_VOWEL'
}

interface GameAction {
  type: GameActionKind
  payload: Game
}

interface GameState {
  game: Game
}

const initialGameState: GameState = {
  game: {}
}

// Our reducer function that uses a switch statement to handle our actions
function gameReducer(state: GameState, action: GameAction) {
  const { type, payload } = action;
  switch (type) {
    case GameActionKind.UPDATE_CONNECTION:
      return {
        ...state,
        game: {
          ...state.game,
          connection: payload?.connection
        }
      }
    case GameActionKind.UPDATE_SEQUENCE:
      return {
        ...state,
        game: {
          ...state.game,
          sequence: payload?.sequence
        }
      }
    case GameActionKind.UPDATE_VOWEL:
      return {
        ...state,
        game: {
          ...state.game,
          vowel: payload?.vowel
        }
      }
    case GameActionKind.UPDATE_WALL:
      return {
        ...state,
        game: {
          ...state.game,
          wall: payload?.wall
        }
      }
    default:
      return state;
  }
}

export const AppContext = createContext<{
  state: GameState;
  dispatch: React.Dispatch<GameAction>;
}>({
  state: initialGameState,
  dispatch: () => null
})

export default function GameProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(gameReducer, initialGameState)

  return (
    <AppContext.Provider value={{ state, dispatch }}>
      {children}
    </AppContext.Provider>
  )
}