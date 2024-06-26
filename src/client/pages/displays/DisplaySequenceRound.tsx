import { ClueGroup, SequenceRound } from '../../utils/types/display'
import { Box, Grid, Modal, ModalDialog, Stack, Tooltip } from '@mui/joy'
import { useState } from 'react'
import DisplayGroupBox from '../../components/DisplayGroupBox'
import DisplayClues from '../../layout/display/DisplayClues'
import { getGroupName } from '../../utils/titles'
import { stopAudio } from '../../utils/audios'
import { CluesBGM } from '../../../assets/audios'

export default function DisplaySequenceRound({ data }: { data: SequenceRound }) {
  const [groupKey, setGroupKey] = useState<string>('')
  const [clues, setClues] = useState<Partial<ClueGroup>>()
  const [opened, setOpened] = useState<string[]>([])

  return (
    <Box>
      <Stack gap={1}>
        <Grid container columns={3} spacing={1}>
          {Object.entries(data).map(([key, value], index) => (
            index < 3 &&
            <Tooltip open={!opened.includes(key) && !clues} key={key} title={getGroupName((index + 1).toString())} placement='top' size='lg' variant='soft'>
              <Grid key={key} xs='auto'>
                <DisplayGroupBox
                  groupId={key}
                  onClick={() => {
                    setGroupKey(key)
                    setClues(value)
                    setOpened(opened.concat(key))
                  }}
                  isDisabled={opened.includes(key)} />
              </Grid>
            </Tooltip>
          ))}
        </Grid>
        <Grid container columns={3} spacing={1}>
          {Object.entries(data).map(([key, value], index) => (
            index >= 3 &&
            <Tooltip open={!opened.includes(key) && !clues} key={key} title={getGroupName((index + 1).toString())} placement='bottom' size='lg' variant='soft'>
              <Grid xs='auto'>
                <DisplayGroupBox
                  groupId={key}
                  onClick={() => {
                    setGroupKey(key)
                    setClues(value)
                    setOpened(opened.concat(key))
                  }}
                  isDisabled={opened.includes(key)} />
              </Grid>
            </Tooltip>
          ))}
        </Grid >
      </Stack>
      <Modal open={!!clues} onClose={() => {
        setClues(undefined)
        stopAudio(CluesBGM)
      }}>
        <ModalDialog layout='fullscreen' sx={{ justifyContent: 'center' }}>
          <DisplayClues groupKey={groupKey} data={clues as ClueGroup} hideLast />
        </ModalDialog>
      </Modal>
    </Box>
  )
}