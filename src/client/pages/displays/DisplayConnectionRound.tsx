import { ClueGroup, ConnectionRound } from '../../utils/types/display'
import { Box, Grid, Modal, ModalDialog, Stack } from '@mui/joy'
import { useState } from 'react'
import DisplayGroupBox from '../../components/DisplayGroupBox'
import DisplayClues from '../../layout/display/DisplayClues'
import { stopAudio } from '../../utils/audios'
import { CluesBGM } from '../../../assets/audios'
import { useHostDispatch } from '../../utils/context/HostProvider'

export default function DisplayConnectionRound({ data }: { data: ConnectionRound }) {
  const [groupKey, setGroupKey] = useState<string>('')
  const [clues, setClues] = useState<Partial<ClueGroup>>()
  const [opened, setOpened] = useState<string[]>([])
  const dispatch = useHostDispatch()

  function onGroupBoxClick({ key, clues }: { key: string, clues: ClueGroup }) {
    setGroupKey(key)
    setClues(clues)
    setOpened(opened.concat(key))

    if (opened.length === 5) {
      dispatch({ type: 'UPDATE_CURRENT_ROUND' })
    }
    dispatch({ type: 'UPDATE_CURRENT_TEAM' })
  }

  return (
    <Box>
      <Stack gap={1}>
        <Grid container columns={3} gap={1} alignItems='end'>
          {Object.entries(data).map(([key, value], index) => (
            index < 3 &&
            <DisplayGroupBox
              key={key}
              groupId={key}
              isDisabled={opened.includes(key)}
              namePlacement='top'
              onClick={() => onGroupBoxClick({ key: key, clues: value })} />
          ))}
        </Grid >
        <Grid container columns={3} gap={1} alignItems='start'>
          {Object.entries(data).map(([key, value], index) => (
            index >= 3 &&
            <DisplayGroupBox
              key={key}
              groupId={key}
              isDisabled={opened.includes(key)}
              namePlacement='bottom'
              onClick={() => onGroupBoxClick({ key: key, clues: value })} />
          ))}
        </Grid >
      </Stack>
      <Modal open={!!clues} onClose={() => {
        setClues(undefined)
        stopAudio(CluesBGM)
      }}>
        <ModalDialog layout='fullscreen' sx={{ justifyContent: 'center' }}>
          <DisplayClues groupKey={groupKey} data={clues as ClueGroup} />
        </ModalDialog>
      </Modal>
    </Box>
  )
}