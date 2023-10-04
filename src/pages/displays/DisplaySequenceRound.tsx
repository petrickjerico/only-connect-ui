import { ClueGroup, SequenceRound } from '../../utils/types/display';
import { Box, Grid, Modal, ModalDialog, ModalClose, Stack } from '@mui/joy';
import { useState } from 'react';
import DisplayGroupBox from '../../components/DisplayGroupBox';
import DisplayClues from '../../layout/display/DisplayClues';

export default function DisplaySequenceRound({ data }: { data: SequenceRound }) {
  const [clues, setClues] = useState<Partial<ClueGroup>>()
  const [opened, setOpened] = useState<string[]>([])

  return (
    <Box>
      <Stack gap={1}>
        <Grid container columns={3} spacing={1}>
          {Object.entries(data).map(([key, value], index) => (
            index < 3 && <Grid key={key} xs='auto'>
              <DisplayGroupBox
                groupId={key}
                onClick={() => {
                  setClues(value)
                  setOpened(opened.concat(key))
                }}
                isDisabled={opened.includes(key)} />
            </Grid>
          ))}
        </Grid >
        <Grid container columns={3} spacing={1}>
          {Object.entries(data).map(([key, value], index) => (
            index >= 3 && <Grid key={key} xs='auto'>
              <DisplayGroupBox
                groupId={key}
                onClick={() => {
                  setClues(value)
                  setOpened(opened.concat(key))
                }}
                isDisabled={opened.includes(key)} />
            </Grid>
          ))}
        </Grid >
      </Stack>
      <Modal open={!!clues} onClose={() => setClues(undefined)}>
        <ModalDialog layout='fullscreen' sx={{ justifyContent: 'center' }}>
          <ModalClose />
          <DisplayClues data={clues as ClueGroup} hideLast />
        </ModalDialog>
      </Modal>
    </Box>
  )
}