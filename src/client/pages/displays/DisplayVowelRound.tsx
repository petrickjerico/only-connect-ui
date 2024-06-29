import { Box, Button, styled } from '@mui/joy'
import { VowelGroup, VowelRound } from '../../utils/types/display'
import { useCallback, useState } from 'react'
import DisplayDescriptionBox from '../../components/DisplayDescriptionBox'
import DisplayClueBox from '../../components/DisplayClueBox'
import { SolvedSFX, VowelLongBGM, ClickSFX } from '../../../assets/audios'
import { playAudio, stopAudio } from '../../utils/audios'
import { useKeyboardShortcut } from '../../utils/shortcuts'

type VowelDisplayOrder = [string, 'description' | 'clue' | 'solution' | 'pause']

export default function DisplayVowelRound({ data }: { data: VowelRound }) {
  const order: VowelDisplayOrder[] =
    Object.entries(data)
      .flatMap(([_, value]) => {
        const pairs: VowelDisplayOrder[] = []
        pairs.push([value.description, 'description'])

        for (let i: number = 1; `clue${i}` in value; i++) {
          const clueKey = `clue${i}` as keyof VowelGroup
          const solutionKey = `solution${i}` as keyof VowelGroup
          pairs.push([value[clueKey], 'clue'])
          pairs.push([value[solutionKey], 'solution'])
        }

        pairs.push(['', 'pause'])

        return pairs
      })
      .reverse()

  const [description, setDescription] = useState<string>('')
  const [clue, setClue] = useState<string>('')
  const [disabled, setDisabled] = useState<boolean>(false)
  const [isAudioPlaying, setIsAudioPlaying] = useState<boolean>(false)

  function endGame() {
    setDescription('')
    setClue('')
    playAudio(SolvedSFX)
    setDisabled(true)
  }


  function showNext() {
    if (order.length === 1) {
      stopAudio(VowelLongBGM)
      endGame()
      return
    }

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
        break
    }
  }

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
    <Box width='100%' marginX={4}>
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
    </Box>
  )
}

const StyledButton = styled(Button)(() => ({
  display: 'flex',
  flexDirection: 'column',
  gap: 8,
  alignItems: 'stretch',
  [':hover']: {
    backgroundColor: 'transparent'
  }
}))
