import { styled, useColorScheme } from '@mui/joy/styles'
import { useEffect, useRef, useState } from 'react'
import ReactPlayer from 'react-player/youtube'
import Gramophone from '../../assets/img/music.png'
import { Sheet } from '@mui/joy'
import { MUSIC_PREVIEW_LENGTH_MS } from '../utils/audios'
import { useAudioTurn } from '../utils/context/AudioTurnProvider'
import VolumeUpRoundedIcon from '@mui/icons-material/VolumeUpRounded'

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
  const { isMediaPlaying, volume, setIsMediaPlaying } = useAudioTurn()
  const [mediaState, setMediaState] = useState<MediaState>(MediaState.PRELOADING)
  const playerRef = useRef<ReactPlayer>(null)
  const startSecond = +url.split('t=')[1]

  useEffect(() => {
    if (mediaState === MediaState.STANDBY && isTurnToPlay) {
      setTimeout(() => setMediaState(MediaState.PLAYING), 500)
    }
    if (mediaState === MediaState.PLAYING && !isTurnToPlay) {
      setMediaState(MediaState.DONE)
      playerRef.current?.seekTo(startSecond, 'seconds')
    }
  }, [isTurnToPlay])

  function playPreview() {
    if (isImageTransparent && !isMediaPlaying) {
      setMediaState(MediaState.PLAYING)
      setIsMediaPlaying(true)
      setTimeout(() => {
        setMediaState(MediaState.DONE)
        playerRef.current?.seekTo(startSecond, 'seconds')
        setIsMediaPlaying(false)
      }, MUSIC_PREVIEW_LENGTH_MS)
    }
  }

  return (
    <StyledSheet
      clickable={String(isImageTransparent && !isMediaPlaying)}
      onClick={playPreview}>
      <GramophoneImage
        hidden={isImageHidden}
        transparent={isImageTransparent}
      />
      <ReactPlayer
        ref={playerRef}
        url={url}
        volume={volume / 100}
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
            onFinishedPreloading && onFinishedPreloading()
          }
        }}
        onError={onErrorPreloading}
      />
      <VolumeUpRoundedIcon
        className='blink'
        sx={{
          display: mediaState === MediaState.PLAYING ? undefined : 'none',
          position: 'absolute',
          right: 8,
          bottom: 8
        }} />
    </StyledSheet>
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
    className={mode === 'dark' ? 'invert' : undefined}
  />
}

const StyledSheet = styled(Sheet)<{ clickable: string }>(({ clickable }) => ({
  height: '100%',
  width: '100%',
  alignContent: 'center',
  background: 'none',
  cursor: clickable === 'true' ? 'pointer' : 'default'
}))