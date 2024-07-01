import React, { Dispatch, createContext, useContext, useReducer } from 'react'
import { RoundTypeEnum } from '../types/attributes'

export const enum HostActionKind {
  INITIALIZE = 'INITIALIZE',
  UPDATE_NAMES = 'UPDATE_NAMES',
  UPDATE_PLAYER = 'UPDATE_PLAYER',
  UPDATE_ROUND = 'UPDATE_ROUND',
  UPDATE_PAGE = 'UPDATE_PAGE',
  UPDATE_USAGE = 'UPDATE_USAGE'
}

interface HostAction {
  type: HostActionKind
  currentPage?: number
  initialPlayer?: number
  players?: [string, string]
}

interface HostState {
  players: [string, string]
  currentPlayer: number
  currentRound: RoundTypeEnum
  currentPage: number
  initialized: boolean
}

const initialHostState: HostState = {
  players: ['Team A', 'Team B'],
  currentPlayer: 0,
  currentRound: RoundTypeEnum.CONNECTION,
  currentPage: 0,
  initialized: false
}

// Our reducer function that uses a switch statement to handle our actions
function hostReducer(state: HostState, action: HostAction): HostState {
  const { type, currentPage, initialPlayer, players } = action

  switch (type) {
    case HostActionKind.INITIALIZE:
      return {
        ...state,
        currentPlayer: initialPlayer ?? state.currentPlayer,
        initialized: true
      }
    case HostActionKind.UPDATE_NAMES:
      return state.initialized
        ? {
          ...state,
          players: players ?? state.players
        }
        : state
    case HostActionKind.UPDATE_PLAYER:
      return state.initialized
        ? {
          ...state,
          currentPlayer: 1 - state.currentPlayer
        }
        : state
    case HostActionKind.UPDATE_ROUND:
      return state.initialized
        ? {
          ...state,
          currentRound: state.currentRound + 1
        }
        : state
    case HostActionKind.UPDATE_PAGE:
      return {
        ...state,
        currentPage: currentPage ?? state.currentPage
      }
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
