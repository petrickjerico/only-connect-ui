import { Box, Grid, Modal, ModalDialog } from '@mui/joy'
import { WallGroup, WallRound } from '../../utils/types/display'
import { useState } from 'react'
import DisplayGroupBox from '../../components/DisplayGroupBox'
import DisplayWall from '../../layout/display/DisplayWall'
import { DEFAULT_WALL_INDEXES } from '../../utils/titles'
import { stopAudio } from '../../utils/audios'
import { WallBGM } from '../../../assets/audios'

export default function DisplayWallRound({ data }: { data: WallRound }) {
  const [groupKey, setGroupKey] = useState<string>('')
  const [wall, setWall] = useState<Partial<WallGroup>>()
  const [opened, setOpened] = useState<string[]>([])

  return (
    <Box>
      <Grid container columns={2} gap={1} alignItems='start'>
        {Object.entries(data).map(([key, value], index) => {
          const groupId = `group${DEFAULT_WALL_INDEXES[index]}`
          return (
            <DisplayGroupBox
              key={key}
              groupId={groupId}
              isDisabled={opened.includes(key)}
              namePlacement='bottom'
              onClick={() => {
                setGroupKey(groupId)
                setWall(value)
                setOpened(opened.concat(key))
              }} />
          )
        })}
      </Grid >
      <Modal open={!!wall} onClose={() => {
        setWall(undefined)
        stopAudio(WallBGM)
      }}>
        <ModalDialog layout='fullscreen'>
          <DisplayWall groupKey={groupKey} data={wall as WallGroup} />
        </ModalDialog>
      </Modal>
    </Box>
  )

}