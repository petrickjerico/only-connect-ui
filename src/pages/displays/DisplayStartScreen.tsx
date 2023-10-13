import { Button, Divider, Modal, ModalClose, ModalDialog, Stack, Tab, TabList, TabPanel, Tabs, Typography } from '@mui/joy'
import CoverImage from '../../assets/img/cover.png'
import { useState } from 'react'
import ConnectionTutorial from '../tutorials/ConnectionTutorial'
import WallTutorial from '../tutorials/WallTutorial'
import SequenceTutorial from '../tutorials/SequenceTutorial'
import VowelTutorial from '../tutorials/VowelTutorial'

export default function DisplayStartScreen() {
  const [open, setOpen] = useState<boolean>(false)

  return (
    <Stack
      direction='row'
      alignItems='center'
      justifyContent='center'
      spacing={8}
      divider={<Divider orientation='vertical' />}>
      <img src={CoverImage} width='15%' height='auto' />
      <Stack spacing={2} maxWidth='30%'>
        <Typography level='h1'>
          Welcome to the game.
        </Typography>
        <Typography level='body-lg'>
          {'This is the game user interface inspired by the UK gameshow \'Only Connect\'. '}
        </Typography>
        <Typography level='body-lg'>
          {'In the game, two teams play against one another to obtain the highest points after the end of four rounds. '}
        </Typography>
        <Typography level='body-lg' pb={2}>
          {'Click the button below to learn more about the format of each round.'}
        </Typography>
        <Button variant='soft' onClick={() => setOpen(true)}>
          Learn more
        </Button>
        <Modal open={open} onClose={() => setOpen(false)}>
          <ModalDialog minWidth='60%'>
            <ModalClose />
            <Typography
              component="h2"
              id="modal-title"
              level="h3"
              textColor="inherit"
              fontWeight="lg"
              mb={1}
            >
              Primers & Tutorials
            </Typography>
            <Tabs
              aria-label="Basic tabs"
              defaultValue={0}
              variant='outlined'
              sx={{
                overflow: 'clip',
                borderRadius: '8px',
                height: '50vh'
              }}
            >
              <TabList variant='soft' tabFlex={1}>
                <Tab>
                  <Typography whiteSpace='pre-line' textAlign='center' py={1}>
                    {'Round 1:\nConnections'}
                  </Typography>
                </Tab>
                <Tab>
                  <Typography whiteSpace='pre-line' textAlign='center' py={1}>
                    {'Round 2:\nSequences'}
                  </Typography>
                </Tab>
                <Tab>
                  <Typography whiteSpace='pre-line' textAlign='center' py={1}>
                    {'Round 3:\nConnecting Wall'}
                  </Typography>
                </Tab>
                <Tab>
                  <Typography whiteSpace='pre-line' textAlign='center' py={1}>
                    {'Round 4:\nMissing Vowels'}
                  </Typography>
                </Tab>
              </TabList>
              <TabPanel value={0} sx={{ overflow: 'auto' }}>
                <ConnectionTutorial verbose />
              </TabPanel>
              <TabPanel value={1} sx={{ overflow: 'auto' }}>
                <SequenceTutorial verbose />
              </TabPanel>
              <TabPanel value={2} sx={{ overflow: 'auto' }}>
                <WallTutorial verbose />
              </TabPanel>
              <TabPanel value={3} sx={{ overflow: 'auto' }}>
                <VowelTutorial verbose />
              </TabPanel>
            </Tabs>
          </ModalDialog>
        </Modal>
      </Stack>
    </Stack>
  )
}