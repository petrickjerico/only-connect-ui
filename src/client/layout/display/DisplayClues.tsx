import { Box, Button, ButtonGroup, Divider, Sheet, Stack, Typography, styled } from '@mui/joy'
import { MediaAppendage, ClueGroup } from '../../utils/types/display'
import DisplayClueBox from '../../components/DisplayClueBox'
import DisplayDescriptionBox from '../../components/DisplayDescriptionBox'
import { useEffect, useState } from 'react'
import LinearTimer from '../../components/LinearTimer'
import DisplayGroupBox from '../../components/DisplayGroupBox'
import { BuzzerSFX, ClickSFX, CluesBGM, FailSFX, GroupSelectedSFX, NextClueSFX } from '../../../assets/audios'
import { playAudio, stopAudio } from '../../utils/audios'
import { getMediaAppendage } from '../../utils/game'
import ReactPlayer from 'react-player/youtube'
import HourglassTopRoundedIcon from '@mui/icons-material/HourglassTopRounded'
import MusicNoteRoundedIcon from '@mui/icons-material/MusicNoteRounded'
import ImageRoundedIcon from '@mui/icons-material/ImageRounded'
import NotesRoundedIcon from '@mui/icons-material/NotesRounded'
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

export default function DisplayClues({
  groupKey,
  data,
  hideLast,
}: {
  groupKey: string,
  data: ClueGroup,
  hideLast?: boolean
}) {
  const mediaAppendage = getMediaAppendage(data)
  const clues = Object.entries(data).filter(([key]) => key !== 'description')
  const description = data.description
  const [shown, setShown] = useState<number[]>([0])
  const [gameState, setGameState] = useState<RoundState>(RoundState.READY)
  const { t } = useTranslation()

  function showUntil(index: number) {
    if (hideLast && index === 2) {
      setShown(Array.from(Array(index + 2).keys()))
    } else {
      setShown(Array.from(Array(index + 1).keys()))
    }
  }

  function getLastShown(): number {
    return shown[shown.length - 1]
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
      return index === getLastShown()
    } else if (index === 2) {
      return getLastShown() === 3 && gameState < RoundState.THROW
    } else {
      return gameState === RoundState.THROW
    }
  }

  function getClueMediaUrl(index: number) {
    if (mediaAppendage) {
      return mediaAppendage[`url${index + 1}` as keyof MediaAppendage]
    } else {
      return ''
    }
  }


  function getClueMediaType(): 'audio' | 'image' | undefined {
    if (mediaAppendage) {
      return mediaAppendage['type' as keyof MediaAppendage] as 'audio' | 'image'
    } else {
      return undefined
    }
  }

  function startQuestion() {
    playAudio(ClickSFX)
    if (!getClueMediaType() || getClueMediaType() !== 'audio') {
      playAudio(CluesBGM)
    }
    setGameState(RoundState.PLAY)
  }

  function stopTimer() {
    setGameState(RoundState.GUESS)
    stopAudio(CluesBGM)
    playAudio(BuzzerSFX)
  }

  function throwQuestion() {
    setGameState(RoundState.THROW)
    playAudio(NextClueSFX)
    showUntil(3)
  }

  function showAnswer() {
    if (
      hideLast
      && getClueMediaType() === 'image'
      && gameState < RoundState.SEQUECNE_SHOW_END_PICTURE
    ) {
      setGameState(RoundState.SEQUECNE_SHOW_END_PICTURE)
    } else {
      setGameState(RoundState.END)
    }
    playAudio(ClickSFX)
    showUntil(4)
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
    <Box display='flex' alignItems='center' justifyContent='center' px={4}>
      {gameState === RoundState.READY &&
        <Stack alignItems='center' spacing={4}>
          <DisplayGroupBox
            groupId={groupKey}
            onClick={startQuestion} />
          <Stack direction='row' spacing={2} divider={<Divider orientation='vertical' />}>
            {getClueMediaType() === 'audio' &&
              <Typography startDecorator={<MusicNoteRoundedIcon />} level='body-lg'>
                {t('music_clues')}
              </Typography>}
            {getClueMediaType() === 'image' &&
              <Typography startDecorator={<ImageRoundedIcon />} level='body-lg'>
                {t('image_clues')}
              </Typography>}
            {!getClueMediaType() &&
              <Typography startDecorator={<NotesRoundedIcon />} level='body-lg'>
                {t('text_clues')}
              </Typography>}
            <Typography startDecorator={<HourglassTopRoundedIcon />} level='body-lg'>
              {t('40_seconds')}
            </Typography>
          </Stack>
        </Stack>}
      {gameState > RoundState.READY &&
        <Stack gap={2} flexGrow={1}>
          <Stack direction='row' gap={2}>
            {clues.map(([key], index) => {
              if (index < 4) return (
                <LinearTimer
                  key={key}
                  text={getScore(index)}
                  duration={42}
                  isVisible={getTimerVisibility(index)}
                  isCounting={gameState === RoundState.PLAY}
                  isEnd={gameState > RoundState.GUESS}
                  onComplete={() => {
                    playAudio(FailSFX)
                    setGameState(RoundState.GUESS)
                  }}
                />
              )
            })}
          </Stack>
          <Stack direction='row' gap={2}>
            {clues.map(([key, value], index) => {
              if (index < 4) return (
                <Sheet key={key} sx={{ width: '100%' }}>
                  {!shown.includes(index) && (
                    <StyledButton
                      variant='plain'
                      onClick={() => {
                        playAudio(NextClueSFX)
                        showUntil(index)
                      }}
                      sx={(theme) => ({
                        backgroundColor: `${theme.vars.palette.neutral.softBg}`,
                        ':hover': {
                          backgroundColor: `${theme.vars.palette.neutral.softBg}`,
                          color: `${theme.vars.palette.primary.softColor}`
                        }
                      })}>
                      {t('show_until_here')}
                    </StyledButton>
                  )}
                  {(mediaAppendage && (!hideLast || index < 3 || gameState >= RoundState.SEQUECNE_SHOW_END_PICTURE)) && (
                    <DisplayClueBox
                      clueType={getClueMediaType()}
                      clue={getClueMediaUrl(index)}
                      isTransparent={gameState === RoundState.END} />
                  )}
                  {shown.includes(index) && (
                    <DisplayClueBox
                      clue={hideLast && index === 3 && gameState < RoundState.END ? '?' : value} />
                  )}
                  {mediaAppendage && (
                    <ReactPlayer
                      url={getClueMediaUrl(index)}
                      width='0'
                      height='0'
                      playing={index === getLastShown() && gameState === RoundState.PLAY} />
                  )}
                </Sheet>)
            })}
          </Stack>
          <Sheet>
            {gameState < RoundState.END &&
              <StyledButtonGroup
                variant='plain'
                sx={(theme) => ({
                  backgroundColor: `${theme.vars.palette.neutral.softBg}`,
                  ':hover': {
                    backgroundColor: `${theme.vars.palette.neutral.softBg}`,
                    color: `${theme.vars.palette.primary.softColor}`
                  }
                })}>
                <Button
                  fullWidth
                  disabled={gameState >= RoundState.GUESS}
                  onClick={stopTimer}>
                  {t('stop_timer')}
                </Button>
                <Button
                  fullWidth
                  disabled={gameState !== RoundState.GUESS}
                  onClick={throwQuestion}>
                  {t('throw')}
                </Button>
                <Button
                  fullWidth
                  disabled={gameState <= RoundState.PLAY}
                  onClick={showAnswer}>
                  {t('show_answer')}
                </Button>
              </StyledButtonGroup>}
            <DisplayDescriptionBox description={description} />
          </Sheet>
        </Stack>}
    </Box>
  )
}

const StyledButton = styled(Button)(() => ({
  height: '100%',
  width: '100%',
  textAlign: 'center',
  position: 'absolute',
  borderRadius: '12px',
  color: 'transparent',
  zIndex: '2',
}))

const StyledButtonGroup = styled(ButtonGroup)(() => ({
  height: '100%',
  width: '100%',
  justifyContent: 'space-between',
  textAlign: 'center',
  position: 'absolute',
  borderRadius: '12px',
  color: 'transparent',
  zIndex: '1',
}))

