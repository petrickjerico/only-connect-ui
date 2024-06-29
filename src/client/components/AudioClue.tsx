import { useEffect, useRef, useState } from 'react'
import ReactPlayer from 'react-player/youtube'

const enum MediaState {
  PRELOADING = 'Preloading',
  STANDBY = 'Standby',
  PLAYING = 'Playing',
  DONE = 'Done'
}

export default function AudioClue({
  url,
  isTurnToPlay,
  onFinishedPreloading,
  onErrorPreloading
}: {
  url: string
  isTurnToPlay: boolean
  onFinishedPreloading: () => void
  onErrorPreloading: () => void
}) {

  const [mediaState, setMediaState] = useState<MediaState>(MediaState.PRELOADING)
  const playerRef = useRef<ReactPlayer>(null)
  const startSecond = +url.split('t=')[1]

  useEffect(() => {
    if (mediaState === MediaState.STANDBY && isTurnToPlay) {
      setTimeout(() => setMediaState(MediaState.PLAYING), 300)
    }
    if (mediaState === MediaState.PLAYING && !isTurnToPlay) {
      setMediaState(MediaState.DONE)
    }
  }, [isTurnToPlay])

  return (
    <ReactPlayer
      ref={playerRef}
      url={url}
      width='0'
      height='0'
      playing={mediaState === MediaState.PLAYING}
      muted={mediaState !== MediaState.PLAYING}
      config={{ playerVars: { autoplay: true } }}
      onProgress={(state) => {
        const loadedSeconds = state.loadedSeconds - startSecond
        if (mediaState === MediaState.PRELOADING && loadedSeconds > 15) {
          setMediaState(MediaState.STANDBY)
          playerRef.current?.seekTo(startSecond, 'seconds')
          onFinishedPreloading()
        }
      }}
      onError={onErrorPreloading}
    />
  )
}