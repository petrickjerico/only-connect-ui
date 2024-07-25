import { ClueGroup, GameDisplay, MediaAppendage } from './types/display'
import games from '../../assets/bank'

export const GAMES_LIST = Object.entries(games) as [string, GameDisplay][]
export const DEFAULT_GAME = GAMES_LIST[0] as [string, GameDisplay]

export function sortDataSet(data: ClueGroup & Partial<MediaAppendage>) {
  const clues = Object.entries(data).filter(([key]) => key.includes('clue'))
  const description = data.description
  const urls = Object.entries(data).filter(([key]) => key.includes('url'))
  const type = data.type

  return { clues, description, urls, type }
}
