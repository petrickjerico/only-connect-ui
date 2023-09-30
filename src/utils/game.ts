import { GameInput } from './types/attributes'
import { GameDisplay } from './types/display';
import mock from '../mock.json'

export function transformInputsToDisplay(input: GameInput): GameDisplay {
  console.log(transformInputsToDisplay, input)
  return mock
}