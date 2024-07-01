import { Box, Grid, Modal, ModalDialog } from '@mui/joy'
import { WallGroup, WallRound } from '../../utils/types/display'
import { useState } from 'react'
import DisplayGroupBox from '../../components/DisplayGroupBox'
import DisplayWall from '../../layout/display/DisplayWall'
import { DEFAULT_WALL_INDEXES } from '../../utils/titles'
import { playAudio, stopAudio } from '../../utils/audios'
import { GroupSelectedSFX, WallBGM } from '../../../assets/audios'
import { useHostDispatch } from '../../utils/context/HostProvider'

export default function DisplayWallRound({ data }: { data: WallRound }) {
  const [groupKey, setGroupKey] = useState<string>('')
  const [wall, setWall] = useState<Partial<WallGroup>>()
  const [opened, setOpened] = useState<string[]>([])
  const dispatch = useHostDispatch()

  function onGroupBoxClick({ key, wall }: { key: string, wall: WallGroup }) {
    setGroupKey(key)
    setWall(wall)
    setOpened(opened.concat(key))
    playAudio(GroupSelectedSFX)

    if (opened.length === 1) {
      dispatch({ type: 'UPDATE_CURRENT_ROUND' })
    }
    dispatch({ type: 'UPDATE_CURRENT_TEAM' })
  }

  return (
    <Box>
      <Grid container columns={2} gap={1} alignItems='start'>
        {Object.entries(data).map(([key, value], index) => {
          const groupId = `group${DEFAULT_WALL_INDEXES[index]}`
          return (
            <DisplayGroupBox
              key={key}
              groupId={groupId}
              isDisabled={opened.includes(groupId)}
              namePlacement='bottom'
              onClick={() => onGroupBoxClick({ key: groupId, wall: value })}
            />
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