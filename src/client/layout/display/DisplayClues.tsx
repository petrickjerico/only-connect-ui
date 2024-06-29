import { Box, Button, ButtonGroup, CircularProgress, Divider, Sheet, Stack, Typography, styled } from '@mui/joy'
import { ClueGroup } from '../../utils/types/display'
import DisplayClueBox from '../../components/DisplayClueBox'
import DisplayDescriptionBox from '../../components/DisplayDescriptionBox'
import { useEffect, useState } from 'react'
import LinearTimer from '../../components/LinearTimer'
import DisplayGroupBox from '../../components/DisplayGroupBox'
import { BuzzerSFX, ClickSFX, CluesBGM, FailSFX, GroupSelectedSFX, NextClueSFX } from '../../../assets/audios'
import { playAudio, stopAudio } from '../../utils/audios'
import { sortDataSet } from '../../utils/game'
import HourglassTopRoundedIcon from '@mui/icons-material/HourglassTopRounded'
import MusicNoteRoundedIcon from '@mui/icons-material/MusicNoteRounded'
import ImageRoundedIcon from '@mui/icons-material/ImageRounded'
import NotesRoundedIcon from '@mui/icons-material/NotesRounded'
import DoneRoundedIcon from '@mui/icons-material/DoneRounded'
import BlockRoundedIcon from '@mui/icons-material/BlockRounded'
import { useTranslation } from 'react-i18next'
import { useKeyboardShortcut } from '../../utils/shortcuts'

const enum RoundState {
  READY,
  PLAY,
  GUESS,
  THROW,
  SEQUECNE_SHOW_END_PICTURE,
  END
}

interface MediaPreload {
  count: number
  mediaSuccess: number[]
  mediaError: number[]
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
    if (hideLast && index === 2) {
      setShown(Array.from(Array(index + 2).keys()))
    } else {
      setShown(Array.from(Array(index + 1).keys()))
    }
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
    if (!hideLast || hideLast && index < 2) {
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
    playAudio(NextClueSFX)
    showUntil(3)
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
            <Typography
              level='body-lg'
              position='absolute'
              gap={1}
              zIndex={11}
              sx={{ bottom: '4%' }}
              startDecorator={
                mediaPreloaded.mediaError.length > 0
                  ? <BlockRoundedIcon color='error' />
                  : mediaPreloaded.count < 4
                    ? <CircularProgress color='primary' size='sm' variant='soft' thickness={4} />
                    : <DoneRoundedIcon color='primary' />
              }>{
                mediaPreloaded.mediaError.length > 0
                  ? `${t('clue_error')}: ${mediaPreloaded.mediaError.map((index) => `${t('clue')} ${index + 1}`).join(', ')}.`
                  : mediaPreloaded.count < 4
                    ? t('clue_loading')
                    : t('clue_success')
              }</Typography>
          )}
        </Stack>
      </ReadyBox>
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
              {!shown.includes(index) && (
                <StyledButton
                  variant='plain'
                  onClick={() => {
                    playAudio(NextClueSFX)
                    showUntil(index)
                  }}>
                  {t('show_until_here')}
                </StyledButton>
              )}
              {type && (
                <DisplayClueBox
                  url={urls[index][1]}
                  clueType={type}
                  isContentPlaying={roundState === RoundState.PLAY && shown.at(-1) === index}
                  isContentTransparent={roundState === RoundState.END}
                  isContentHidden={hideLast && index === 3 && roundState < RoundState.SEQUECNE_SHOW_END_PICTURE}
                  onFinishedPreloading={() => handleFinishedPreloading(index)}
                  onErrorPreloading={() => handleErrorPreloading(index)} />
              )}
              {shown.includes(index) && (
                <DisplayClueBox
                  clue={hideLast && index === 3 && roundState < RoundState.END ? '?' : value}
                />
              )}
            </Sheet>
          ))}
        </Stack>
        <Sheet>
          {roundState < RoundState.END &&
            <StyledButtonGroup variant='plain'>
              <Button
                fullWidth
                disabled={roundState >= RoundState.GUESS}
                onClick={stopTimer}>
                {t('stop_timer')}
              </Button>
              <Button
                fullWidth
                disabled={roundState !== RoundState.GUESS}
                onClick={throwQuestion}>
                {t('throw')}
              </Button>
              <Button
                fullWidth
                disabled={roundState <= RoundState.PLAY}
                onClick={showAnswer}>
                {t('show_answer')}
              </Button>
            </StyledButtonGroup>}
          <DisplayDescriptionBox description={description} />
        </Sheet>
      </Stack>
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
    backgroundColor: theme.vars.palette.neutral.softBg,
    color: theme.vars.palette.primary.softColor
  }
}))

const StyledButtonGroup = styled(ButtonGroup)(({ theme }) => ({
  height: '100%',
  width: '100%',
  justifyContent: 'space-between',
  textAlign: 'center',
  position: 'absolute',
  borderRadius: '12px',
  color: 'transparent',
  zIndex: '1',
  backgroundColor: theme.vars.palette.neutral.softBg,
  ':hover': {
    backgroundColor: theme.vars.palette.neutral.softBg,
    color: theme.vars.palette.primary.softColor
  }
}))

