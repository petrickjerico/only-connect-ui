import { CluesBGM, WallBGM, VowelBGM, VowelLongBGM } from '../../assets/audios'

export const MUSIC_PREVIEW_LENGTH_MS = 7000
export const MUSIC_VOLUME_DEFAULT = 50

export function playAudio(audio: HTMLAudioElement, loop?: boolean) {
  audio.play()
  if (loop) {
    audio.addEventListener('ended', () => {
      audio.currentTime = 0;
      audio.play()
    }, false)
  }
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
