import { Box, Grid, Modal, ModalDialog, Tooltip } from '@mui/joy'
import { WallGroup, WallRound } from '../../utils/types/display'
import { useState } from 'react'
import DisplayGroupBox from '../../components/DisplayGroupBox'
import DisplayWall from '../../layout/display/DisplayWall'
import { DEFAULT_WALL_INDEXES, getGroupName } from '../../utils/titles'

export default function DisplayWallRound({ data }: { data: WallRound }) {
  const [groupKey, setGroupKey] = useState<string>('')
  const [wall, setWall] = useState<Partial<WallGroup>>()
  const [opened, setOpened] = useState<string[]>([])

  return (
    <Box>
      <Grid container columns={2} spacing={1}>
        {Object.entries(data).map(([key, value], index) => {
          const groupId = `group${DEFAULT_WALL_INDEXES[index]}`
          return (
            <Tooltip open={!opened.includes(key) && !wall} key={key} title={getGroupName(DEFAULT_WALL_INDEXES[index])} placement='bottom' size='lg' variant='soft'>
              <Grid xs={1}>
                <DisplayGroupBox
                  groupId={groupId}
                  onClick={() => {
                    setGroupKey(groupId)
                    setWall(value)
                    setOpened(opened.concat(key))
                  }}
                  isDisabled={opened.includes(key)} />
              </Grid>
            </Tooltip>
          )
        })}
      </Grid >
      <Modal open={!!wall} onClose={() => setWall(undefined)}>
        <ModalDialog layout='fullscreen'>
          <DisplayWall groupKey={groupKey} data={wall as WallGroup} />
        </ModalDialog>
      </Modal>
    </Box>
  )

}