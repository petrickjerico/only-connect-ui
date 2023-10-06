export function playAudio(audio: HTMLAudioElement) {
  audio.play()
}

export function stopAudio(audio: HTMLAudioElement) {
  audio.pause()
  audio.currentTime = 0
}
