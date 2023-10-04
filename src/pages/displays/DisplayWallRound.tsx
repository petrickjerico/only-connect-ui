import { Box, Grid, Modal, ModalClose, ModalDialog } from '@mui/joy';
import { WallGroup, WallRound } from '../../utils/types/display';
import { useState } from 'react';
import DisplayGroupBox from '../../components/DisplayGroupBox';
import DisplayWall from '../../layout/display/DisplayWall';
import { DEFAULT_WALL_INDEXES } from '../../utils/titles';

export default function DisplayWallRound({ data }: { data: WallRound }) {
  const [wall, setWall] = useState<Partial<WallGroup>>()
  const [opened, setOpened] = useState<string[]>([])

  return (
    <Box>
      <Grid container columns={2} spacing={1}>
        {Object.entries(data).map(([key, value], index) => (
          <Grid key={key} xs={1}>
            <DisplayGroupBox
              groupId={`group${DEFAULT_WALL_INDEXES[index]}`}
              onClick={() => {
                setWall(value)
                setOpened(opened.concat(key))
              }}
              isDisabled={opened.includes(key)} />
          </Grid>
        ))}
      </Grid >
      <Modal open={!!wall} onClose={() => setWall(undefined)}>
        <ModalDialog layout='fullscreen'>
          <ModalClose />
          <DisplayWall data={wall as WallGroup} />
        </ModalDialog>
      </Modal>
    </Box>
  )

}