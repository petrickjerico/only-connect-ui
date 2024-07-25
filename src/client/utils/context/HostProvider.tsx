import React, { Dispatch, createContext, useContext, useReducer } from 'react'
import { RoundTypeEnum } from '../types/attributes'
import { GameDisplay } from '../types/display'
import { DEFAULT_GAME } from '../game'

export type HostAction =
  | { type: 'UPDATE_GAME', payload: GameDisplay }
  | { type: 'UPDATE_TEAM_NAME_0', payload: string }
  | { type: 'UPDATE_TEAM_NAME_1', payload: string }
  | { type: 'INCREMENT_TEAM_SCORE_0' }
  | { type: 'DECREMENT_TEAM_SCORE_0' }
  | { type: 'INCREMENT_TEAM_SCORE_1' }
  | { type: 'DECREMENT_TEAM_SCORE_1' }
  | { type: 'INITIALIZE_CURRENT_TEAM', payload: number }
  | { type: 'UPDATE_CURRENT_TEAM' }
  | { type: 'UPDATE_CURRENT_PAGE', payload: number }
  | { type: 'UPDATE_CURRENT_ROUND' }
  | { type: 'TOGGLE_INCREMENT' }
  | { type: 'RESET_GAME' }
  | { type: 'TOGGLE_NEW_GAME' }


interface HostState {
  isNewGame: boolean
  game: GameDisplay
  teamName0: string
  teamName1: string
  teamScore0: number
  teamScore1: number
  currentTeam: number
  currentPage: number
  currentRound: RoundTypeEnum
  applyScoreIncrements: boolean
}

const DEFAULT_INITIAL_HOST_STATE: HostState = {
  isNewGame: true,
  game: DEFAULT_GAME[1],
  teamName0: 'Team A',
  teamName1: 'Team B',
  teamScore0: 0,
  teamScore1: 0,
  currentTeam: 0,
  currentPage: 0,
  currentRound: RoundTypeEnum.CONNECTION,
  applyScoreIncrements: false
}

const initialHostState: HostState = {
  isNewGame: true,
  game: DEFAULT_GAME[1],
  teamName0: 'Team A',
  teamName1: 'Team B',
  teamScore0: 0,
  teamScore1: 0,
  currentTeam: 0,
  currentPage: 0,
  currentRound: RoundTypeEnum.CONNECTION,
  applyScoreIncrements: false
}

// Our reducer function that uses a switch statement to handle our actions
function hostReducer(state: HostState, action: HostAction): HostState {
  switch (action.type) {
    case 'UPDATE_GAME':
      return {
        ...state,
        game: action.payload
      }
    case 'UPDATE_TEAM_NAME_0':
      return {
        ...state,
        teamName0: action.payload
      }
    case 'UPDATE_TEAM_NAME_1':
      return {
        ...state,
        teamName1: action.payload
      }
    case 'INCREMENT_TEAM_SCORE_0':
      return {
        ...state,
        teamScore0: state.teamScore0 + 1
      }
    case 'DECREMENT_TEAM_SCORE_0':
      return {
        ...state,
        teamScore0: state.teamScore0 - 1
      }
    case 'INCREMENT_TEAM_SCORE_1':
      return {
        ...state,
        teamScore1: state.teamScore1 + 1
      }
    case 'DECREMENT_TEAM_SCORE_1':
      return {
        ...state,
        teamScore1: state.teamScore1 - 1
      }
    case 'INITIALIZE_CURRENT_TEAM':
      return {
        ...state,
        currentTeam: action.payload
      }
    case 'UPDATE_CURRENT_TEAM':
      return {
        ...state,
        currentTeam: 1 - state.currentTeam
      }
    case 'UPDATE_CURRENT_PAGE':
      return {
        ...state,
        currentPage: action.payload
      }
    case 'UPDATE_CURRENT_ROUND':
      return {
        ...state,
        currentRound: state.currentRound + 1
      }
    case 'TOGGLE_INCREMENT':
      return {
        ...state,
        applyScoreIncrements: !state.applyScoreIncrements
      }
    case 'TOGGLE_NEW_GAME':
      return {
        ...state,
        isNewGame: !state.isNewGame
      }
    case 'RESET_GAME':
      return DEFAULT_INITIAL_HOST_STATE
    default:
      return state
  }
}

const HostContext = createContext<HostState>(initialHostState)
const HostDispatchContext = createContext<Dispatch<HostAction>>(() => { })

export function useHost() {
  return useContext(HostContext)
}

export function useHostDispatch() {
  return useContext(HostDispatchContext)
}

export default function HostProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(hostReducer, initialHostState)

  return (
    <HostContext.Provider value={state}>
      <HostDispatchContext.Provider value={dispatch}>{children}</HostDispatchContext.Provider>
    </HostContext.Provider>
  )
}
