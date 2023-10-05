import Wall from './audio/wall.mp3'
import Clues from './audio/clues.mp3'
import Full from './audio/full.mp3'
import Solved from './audio/solved.wav'
import Correct from './audio/correct.wav'
import Incorrect from './audio/incorrect.wav'
import Tap from './audio/tap.wav'
import LifeReduced from './audio/life-reduced.wav'
import Fail from './audio/fail.wav'
import VowelClick from './audio/vowel-click.wav'

export const WallBGM = new Audio(Wall)
WallBGM.volume = 0.5

export const CluesBGM = new Audio(Clues)
CluesBGM.volume = 0.5

export const FullBGM = new Audio(Full)
FullBGM.volume = 0.5

export const SolvedSFX = new Audio(Solved)
export const CorrectSFX = new Audio(Correct)
CorrectSFX.volume = 0.5

export const IncorrectSFX = new Audio(Incorrect)
export const TapSFX = new Audio(Tap)
export const LifeReducedSFX = new Audio(LifeReduced)
export const FailSFX = new Audio(Fail)
FailSFX.volume = 0.3

export const VowelClickSFX = new Audio(VowelClick)
VowelClickSFX.volume = 5

export function playAudio(audio: HTMLAudioElement) {
  audio.play()
}

export function stopAudio(audio: HTMLAudioElement) {
  audio.pause()
  audio.currentTime = 0
}
