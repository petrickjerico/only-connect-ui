import { ClueGroup, ConnectionRound } from '../../utils/types/display';
import { Box, Grid, Modal, ModalDialog, ModalClose, Stack } from '@mui/joy';
import { useState } from 'react';
import DisplayClueBox from '../../components/DisplayClueBox';
import DisplayGroupBox from '../../components/DisplayGroupBox';

export default function DisplayConnectionRound({ data }: { data: ConnectionRound }) {
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
        <ModalDialog layout='fullscreen'>
          <ModalClose />
          <Grid container columns={4} spacing={1}>
            {clues && Object.entries(clues).map(([key, value]) => (
              <Grid key={key} xs={1}>
                <DisplayClueBox clue={value} />
              </Grid>
            ))}
          </Grid >
        </ModalDialog>
      </Modal>
    </Box>
  )
}