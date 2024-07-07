import { CluesBGM, WallBGM, VowelBGM, VowelLongBGM } from '../../assets/audios'

export const MUSIC_PREVIEW_LENGTH_MS = 7000

export function playAudio(audio: HTMLAudioElement) {
  audio.play()
}

export function stopAudio(audio: HTMLAudioElement) {
  audio.pause()
  audio.currentTime = 0
}

export function stopAllBGM() {
  stopAudio(CluesBGM)
  stopAudio(WallBGM)
  stopAudio(VowelBGM)
  stopAudio(VowelLongBGM)
}
