import { Modal, ModalDialog, ModalClose, Typography, Tabs, TabList, Tab, TabPanel, Button, DialogTitle } from '@mui/joy';
import { t } from 'i18next';
import ConnectionTutorial from './ConnectionTutorial';
import SequenceTutorial from './SequenceTutorial';
import VowelTutorial from './VowelTutorial';
import WallTutorial from './WallTutorial';
import { useState } from 'react';

export default function TutorialModal() {
  const [open, setOpen] = useState<boolean>(false)

  return (
    <>
      <Button variant='soft' onClick={() => setOpen(true)}>
        {t('learn')}
      </Button>
      <Modal open={open} onClose={() => setOpen(false)}>
        <ModalDialog minWidth='60%'>
          <ModalClose />
          <DialogTitle>{t('tutorial_title')}</DialogTitle>

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
                  {t('round')} 1: {'\n'}
                  {t('connections')}
                </Typography>
              </Tab>
              <Tab>
                <Typography whiteSpace='pre-line' textAlign='center' py={1}>
                  {t('round')} 2: {'\n'}
                  {t('sequences')}
                </Typography>
              </Tab>
              <Tab>
                <Typography whiteSpace='pre-line' textAlign='center' py={1}>
                  {t('round')} 3: {'\n'}
                  {t('connecting_walls')}
                </Typography>
              </Tab>
              <Tab>
                <Typography whiteSpace='pre-line' textAlign='center' py={1}>
                  {t('round')} 4: {'\n'}
                  {t('missing_vowels')}
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
    </>
  )
}