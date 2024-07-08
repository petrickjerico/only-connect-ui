import { Box, Button, ButtonGroup, Divider, Sheet, Stack, Typography, styled } from '@mui/joy'
import { ClueGroup } from '../../utils/types/display'
import DisplayClueBox from '../../components/DisplayClueBox'
import DisplayDescriptionBox from '../../components/DisplayDescriptionBox'
import { useEffect, useState } from 'react'
import LinearTimer from '../../components/LinearTimer'
import DisplayGroupBox from '../../components/DisplayGroupBox'
import { BuzzerSFX, ClickSFX, CluesBGM, FailSFX, GroupSelectedSFX, NextClueSFX } from '../../../assets/audios'
import { playAudio, stopAudio, MUSIC_PREVIEW_LENGTH_MS } from '../../utils/audios'
import { sortDataSet } from '../../utils/game'
import HourglassTopRoundedIcon from '@mui/icons-material/HourglassTopRounded'
import MusicNoteRoundedIcon from '@mui/icons-material/MusicNoteRounded'
import ImageRoundedIcon from '@mui/icons-material/ImageRounded'
import NotesRoundedIcon from '@mui/icons-material/NotesRounded'
import { useTranslation } from 'react-i18next'
import { useKeyboardShortcut } from '../../utils/shortcuts'
import PreloadStatus, { MediaPreload } from '../../components/PreloadStatus'
import AudioTurnProvider from '../../utils/context/AudioTurnProvider'
import VolumeSlider from '../../components/VolumeSlider'

const enum RoundState {
  READY,
  PLAY,
  GUESS,
  THROW,
  THROW_END_MUSIC,
  SEQUECNE_SHOW_END_PICTURE,
  END
}

export default function DisplayClues({
  groupKey,
  data,
  hideLast,
}: {
  groupKey: string,
  data: ClueGroup,
  hideLast?: boolean
}) {
  const { t } = useTranslation()
  const { clues, description, urls, type } = sortDataSet(data)
  const [shown, setShown] = useState<number[]>([0])
  const [roundState, setRoundState] = useState<RoundState>(RoundState.READY)
  const [mediaPreloaded, setMediaPreloaded] = useState<MediaPreload>({
    count: 0,
    mediaSuccess: [],
    mediaError: []
  })

  function showUntil(index: number) {
    setShown(Array.from(Array(index + 1).keys()))
  }

  function getScore(index: 0 | 1 | 2 | 3 | number): string {
    switch (index) {
      case 0:
        return `5 ${t('points')}`
      case 1:
        return `3 ${t('points')}`
      case 2:
        return `2 ${t('points')}`
      case 3:
        return `1 ${t('point')}`
      default:
        return ''
    }
  }

  function getTimerVisibility(index: number) {
    if (type === 'audio' && RoundState.THROW <= roundState && roundState < RoundState.END) {
      return index === 3
    } else if (!hideLast || hideLast && index < 3) {
      return index === shown.at(-1)
    } else if (index === 2) {
      return shown.at(-1) === 3 && roundState < RoundState.THROW
    } else {
      return roundState === RoundState.THROW
    }
  }

  function startQuestion() {
    playAudio(ClickSFX)
    if (!type || type !== 'audio') {
      playAudio(CluesBGM)
    }
    setRoundState(RoundState.PLAY)
  }

  function stopTimer() {
    setRoundState(RoundState.GUESS)
    stopAudio(CluesBGM)
    playAudio(BuzzerSFX)
  }

  function throwQuestion() {
    setRoundState(RoundState.THROW)
    if (type === 'audio') {
      const start = shown.length
      const end = hideLast ? 2 : 3
      for (let i = start; i <= end; i++) {
        setTimeout(() => {
          playAudio(NextClueSFX)
          showUntil(i)
        }, (i - start) * MUSIC_PREVIEW_LENGTH_MS)
      }
      setTimeout(() => {
        setRoundState(RoundState.THROW_END_MUSIC)
      }, (end - start + 1) * MUSIC_PREVIEW_LENGTH_MS)
    } else {
      playAudio(NextClueSFX)
      showUntil(3)
    }
  }

  function showAnswer() {
    if (
      hideLast
      && type === 'image'
      && roundState < RoundState.SEQUECNE_SHOW_END_PICTURE
    ) {
      setRoundState(RoundState.SEQUECNE_SHOW_END_PICTURE)
    } else {
      setRoundState(RoundState.END)
    }
    playAudio(ClickSFX)
    showUntil(4)
  }

  const handleFinishedPreloading = (index: number) => {
    setMediaPreloaded(mediaPreloaded => ({
      ...mediaPreloaded,
      mediaSuccess: [...mediaPreloaded.mediaSuccess, index],
      count: mediaPreloaded.count + 1
    }))
  }

  const handleErrorPreloading = (index: number) => {
    setMediaPreloaded(mediaPreloaded => ({
      ...mediaPreloaded,
      mediaError: [...mediaPreloaded.mediaError, index],
      count: mediaPreloaded.count + 1
    }))
  }

  useEffect(() => {
    playAudio(GroupSelectedSFX)
  }, [])

  useKeyboardShortcut({
    key: 'z',
    onKeyPressed: stopTimer
  })

  useKeyboardShortcut({
    key: 'x',
    onKeyPressed: throwQuestion
  })

  useKeyboardShortcut({
    key: 'c',
    onKeyPressed: showAnswer
  })

  useKeyboardShortcut({
    key: ' ',
    onKeyPressed: startQuestion
  })

  return (
    <BackgroundBox>
      <ReadyBox display={roundState === RoundState.READY ? 'flex' : 'none'}>
        <Stack alignItems='center' spacing={4} >
          <DisplayGroupBox
            groupId={groupKey}
            onClick={startQuestion}
            isDisabled={(!!type && mediaPreloaded.mediaSuccess.length < 4) ?? undefined}
          />
          <Stack direction='row' spacing={2} divider={<Divider orientation='vertical' />}>
            {type === 'audio' &&
              <Typography startDecorator={<MusicNoteRoundedIcon />} level='body-lg'>
                {t('music_clues')}
              </Typography>}
            {type === 'image' &&
              <Typography startDecorator={<ImageRoundedIcon />} level='body-lg'>
                {t('image_clues')}
              </Typography>}
            {!type &&
              <Typography startDecorator={<NotesRoundedIcon />} level='body-lg'>
                {t('text_clues')}
              </Typography>}
            <Typography startDecorator={<HourglassTopRoundedIcon />} level='body-lg'>
              {t('40_seconds')}
            </Typography>
          </Stack>
          {type && (
            <PreloadStatus mediaPreload={mediaPreloaded} />
          )}
        </Stack>
      </ReadyBox>
      <AudioTurnProvider>
        <Stack gap={2} flexGrow={1}>
          <Stack direction='row' gap={2}>
            {clues.map(([key], index) => (
              <LinearTimer
                key={key}
                text={getScore(index)}
                duration={42}
                isVisible={getTimerVisibility(index)}
                isCounting={roundState === RoundState.PLAY}
                isEnd={roundState > RoundState.GUESS}
                onComplete={() => {
                  playAudio(FailSFX)
                  setRoundState(RoundState.GUESS)
                }}
              />
            ))}
          </Stack>
          <Stack direction='row' gap={2}>
            {clues.map(([key, value], index) => (
              <Sheet key={key} sx={{ width: '100%' }}>
                {hideLast && (shown.at(-1) === 2 || shown.at(-1) === 3) && index === 3 && (
                  <DisplayClueBox isQuestionMark />
                )}
                {!shown.includes(index) && (
                  <StyledButton
                    variant='plain'
                    disabled={roundState === RoundState.THROW}
                    onClick={() => {
                      playAudio(NextClueSFX)
                      showUntil(index)
                    }}>
                    {roundState !== RoundState.THROW && t('show_until_here')}
                  </StyledButton>
                )}
                {type && (
                  <DisplayClueBox
                    url={urls[index][1]}
                    clueType={type}
                    isContentPlaying={(roundState === RoundState.PLAY || roundState === RoundState.THROW) && shown.at(-1) === index}
                    isContentTransparent={roundState === RoundState.END}
                    isContentHidden={hideLast && index === 3 && roundState < RoundState.SEQUECNE_SHOW_END_PICTURE}
                    onFinishedPreloading={() => handleFinishedPreloading(index)}
                    onErrorPreloading={() => handleErrorPreloading(index)} />
                )}
                {shown.includes(index) && (
                  <DisplayClueBox
                    clue={value}
                  />
                )}
              </Sheet>
            ))}
          </Stack>
          <Sheet>
            {roundState < RoundState.END &&
              <StyledButtonGroup variant='plain'>
                <StyledBottomButton
                  fullWidth
                  disabled={roundState >= RoundState.GUESS}
                  onClick={stopTimer}>
                  {t('stop_timer')}
                </StyledBottomButton>
                <StyledBottomButton
                  fullWidth
                  disabled={roundState !== RoundState.GUESS}
                  onClick={throwQuestion}>
                  {t('throw')}
                </StyledBottomButton>
                <StyledBottomButton
                  fullWidth
                  disabled={roundState <= RoundState.PLAY || (type === 'audio' && (roundState === RoundState.PLAY || roundState === RoundState.THROW))}
                  onClick={showAnswer}>
                  {t('show_answer')}
                </StyledBottomButton>
              </StyledButtonGroup>}
            <DisplayDescriptionBox description={description} />
          </Sheet>
          {type === 'audio' && <VolumeSlider />}
        </Stack>
      </AudioTurnProvider>
    </BackgroundBox >
  )
}

const BackgroundBox = styled(Box)(() => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  padding: 16
}))

const ReadyBox = styled(Box)(({ theme }) => ({
  alignItems: 'center',
  justifyContent: 'center',
  position: 'absolute',
  zIndex: '10',
  width: '100%',
  height: '100%',
  backgroundColor: theme.vars.palette.background.surface
}))

const StyledButton = styled(Button)(({ theme }) => ({
  height: '100%',
  width: '100%',
  textAlign: 'center',
  position: 'absolute',
  borderRadius: '12px',
  color: 'transparent',
  zIndex: '2',
  backgroundColor: theme.vars.palette.neutral.softBg,
  ':hover': {
    backgroundColor: theme.vars.palette.neutral.softHoverBg,
    color: theme.vars.palette.primary.softColor
  }
}))

const StyledButtonGroup = styled(ButtonGroup)(({ theme }) => ({
  height: '100%',
  width: '100%',
  justifyContent: 'space-between',
  textAlign: 'center',
  position: 'absolute',
  zIndex: '1',
  '--ButtonGroup-radius': '12px',
  backgroundColor: theme.vars.palette.neutral.softBg,
}))

const StyledBottomButton = styled(Button)(({ theme }) => ({
  ':hover': {
    backgroundColor: theme.vars.palette.neutral.softHoverBg,
    color: theme.vars.palette.primary.softColor
  }
}))

