import { GameInput } from './types/attributes'
import { ClueGroup, GameDisplay, MediaAppendage } from './types/display'
import mock from '../../assets/mock/Indo-B.json'

export function transformInputsToDisplay(input: GameInput): GameDisplay {
  console.log(input)
  return mock
}

export function sortDataSet(data: ClueGroup & Partial<MediaAppendage>) {
  const clues = Object.entries(data).filter(([key]) => key.includes('clue'))
  const description = data.description
  const urls = Object.entries(data).filter(([key]) => key.includes('url'))
  const type = data.type

  return { clues, description, urls, type }
}
