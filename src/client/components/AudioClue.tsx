import { useColorScheme } from '@mui/joy/styles'
import React, { useEffect, useRef, useState } from 'react'
import ReactPlayer from 'react-player/youtube'
import Gramophone from '../../assets/img/music.png'


const enum MediaState {
  PRELOADING,
  STANDBY,
  PLAYING,
  DONE
}

export default function AudioClue({
  url,
  isImageHidden,
  isImageTransparent,
  isTurnToPlay,
  onFinishedPreloading,
  onErrorPreloading
}: {
  url: string
  isImageHidden?: boolean
  isImageTransparent?: boolean
  isTurnToPlay?: boolean
  onFinishedPreloading?: () => void
  onErrorPreloading?: () => void
}) {

  const [mediaState, setMediaState] = useState<MediaState>(MediaState.PRELOADING)
  const playerRef = useRef<ReactPlayer>(null)
  const startSecond = +url.split('t=')[1]

  useEffect(() => {
    if (mediaState === MediaState.STANDBY && isTurnToPlay) {
      setTimeout(() => setMediaState(MediaState.PLAYING), 500)
    }
    if (mediaState === MediaState.PLAYING && !isTurnToPlay) {
      setMediaState(MediaState.DONE)
    }
  }, [isTurnToPlay])

  return (
    <React.Fragment>
      <GramophoneImage
        hidden={isImageHidden}
        transparent={isImageTransparent}
      />
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
            if (onFinishedPreloading) onFinishedPreloading()
          }
        }}
        onError={onErrorPreloading}
      />
    </React.Fragment>
  )
}

function GramophoneImage({ hidden, transparent }: { hidden?: boolean, transparent?: boolean }) {
  const { mode } = useColorScheme()

  return <img
    width='150px'
    height='auto'
    src={Gramophone}
    draggable={false}
    style={{ opacity: hidden ? 0 : transparent ? 0.1 : 0.75 }}
    title={mode === 'dark' ? 'invert' : undefined}
    className={mode === 'dark' ? 'invert' : undefined}
  />
}