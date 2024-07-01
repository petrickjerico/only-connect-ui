import { Box, Button, ButtonGroup, Modal, ModalDialog, Stack, styled } from '@mui/joy';
import React, { useCallback, useEffect, useState } from 'react';
import { playAudio, stopAudio } from '../../utils/audios';
import { ClickSFX, GroupSelectedSFX, SolvedSFX, VowelLongBGM } from '../../../assets/audios';
import DisplayClueBox from '../../components/DisplayClueBox';
import DisplayDescriptionBox from '../../components/DisplayDescriptionBox';
import { useKeyboardShortcut } from '../../utils/shortcuts';
import { VowelDisplayOrder } from './DisplayVowelRound';
import { getRandomTiebreaker } from '../../utils/tiebreaker';
import { useTranslation } from 'react-i18next';
import { useHost, useHostDispatch } from '../../utils/context/HostProvider';

export default function DisplayTieBreaker() {
  let order: VowelDisplayOrder[] = []

  const { t, i18n } = useTranslation()
  const { teamName0, teamName1 } = useHost()
  const dispatch = useHostDispatch()
  const [open, setOpen] = useState<boolean>(false)
  const [description, setDescription] = useState<string>('')
  const [clue, setClue] = useState<string>('')
  const [disabled, setDisabled] = useState<boolean>(false)
  const [isAudioPlaying, setIsAudioPlaying] = useState<boolean>(false)

  function showNext() {

    const [value, type] = order.pop() as VowelDisplayOrder

    switch (type) {
      case 'pause':
        setDescription('')
        setClue('')
        break
      case 'description':
        setDescription(value)
        break
      case 'clue':
        if (!isAudioPlaying) {
          setIsAudioPlaying(true)
          playAudio(VowelLongBGM)
        }
        setClue(value)
        break
      case 'solution':
        setClue(value)
        stopAudio(VowelLongBGM)
        playAudio(SolvedSFX)
        setDisabled(true)
        break
    }
  }

  useEffect(() => {
    const [clue, solution] = getRandomTiebreaker(i18n.language)
    order = [
      [solution, 'solution'],
      [clue, 'clue'],
      ['Tie-breaker', 'description']
    ]
  }, [])

  const handleShowNext = useCallback(showNext, [])

  function handleShowNextWithSound() {
    handleShowNext()
    playAudio(ClickSFX)
  }

  useKeyboardShortcut({
    key: ' ',
    onKeyPressed: handleShowNextWithSound
  })

  return (
    <React.Fragment>
      <Button
        variant='soft'
        fullWidth
        onClick={() => {
          setOpen(true)
          playAudio(GroupSelectedSFX)
        }}>Tie-breaker</Button>
      <Modal open={open} onClose={() => setOpen(false)}>
        <ModalDialog layout='fullscreen'>
          <Stack
            marginX={10}
            height='100%'
            justifyContent='center'
            display='flex'
            direction='column'
            gap={0.5}>
            <StyledButton
              onClick={handleShowNextWithSound}
              fullWidth
              variant='plain'
              disabled={disabled}
            >
              <DisplayDescriptionBox description={description} />
              <DisplayClueBox
                clue={clue}
                height='short'
                fontSize={60}
                fontWeight={500}
                wordSpacing='8px'
              />
            </StyledButton>
            <Box paddingX={2} >
              <StyledButtonGroup variant='plain'>
                <StyledBottomButton
                  fullWidth
                  disabled={!disabled}
                  onClick={() => {
                    dispatch({ type: 'INCREMENT_TEAM_SCORE_0' })
                    setOpen(false)
                    playAudio(ClickSFX)
                  }}>
                  {`${teamName0} ${t('wins')}`}
                </StyledBottomButton>
                <StyledBottomButton
                  fullWidth
                  disabled={!disabled}
                  onClick={() => {
                    dispatch({ type: 'INCREMENT_TEAM_SCORE_1' })
                    setOpen(false)
                    playAudio(ClickSFX)
                  }}>
                  {`${teamName1} ${t('wins')}`}
                </StyledBottomButton>
              </StyledButtonGroup>
            </Box>
          </Stack>
        </ModalDialog>
      </Modal>
    </React.Fragment>
  )
}

const StyledButton = styled(Button)(() => ({
  display: 'flex',
  flexDirection: 'column',
  gap: 8,
  [':hover']: {
    backgroundColor: 'transparent'
  }
}))

const StyledButtonGroup = styled(ButtonGroup)(({ theme }) => ({
  justifyContent: 'space-between',
  textAlign: 'center',
  height: '48px',
  '--ButtonGroup-radius': '12px',
  backgroundColor: theme.vars.palette.neutral.softBg,
}))

const StyledBottomButton = styled(Button)(({ theme }) => ({
  ':hover': {
    backgroundColor: theme.vars.palette.neutral.softHoverBg,
    color: theme.vars.palette.primary.softColor
  }
}))
