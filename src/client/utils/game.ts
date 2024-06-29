import { GameInput } from './types/attributes'
import { ClueGroup, GameDisplay, MediaAppendage } from './types/display'
import mock from '../../assets/mock/A.json'

export function transformInputsToDisplay(input: GameInput): GameDisplay {
  console.log(input)
  return mock
}

export function getMediaAppendage(data: ClueGroup): MediaAppendage | undefined {
  if (Object.getOwnPropertyNames(data).includes('type')) {
    const res: MediaAppendage = {
      url1: Object.getOwnPropertyDescriptor(data, 'url1')?.value as string,
      url2: Object.getOwnPropertyDescriptor(data, 'url2')?.value as string,
      url3: Object.getOwnPropertyDescriptor(data, 'url3')?.value as string,
      url4: Object.getOwnPropertyDescriptor(data, 'url4')?.value as string,
      type: Object.getOwnPropertyDescriptor(data, 'type')?.value as string,
    }
    return res
  } else {
    return undefined
  }
}

