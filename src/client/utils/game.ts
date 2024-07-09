import { ClueGroup, MediaAppendage } from './types/display'

export function sortDataSet(data: ClueGroup & Partial<MediaAppendage>) {
  const clues = Object.entries(data).filter(([key]) => key.includes('clue'))
  const description = data.description
  const urls = Object.entries(data).filter(([key]) => key.includes('url'))
  const type = data.type

  return { clues, description, urls, type }
}
