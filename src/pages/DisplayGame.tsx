import {
  Box,
  Sheet,
  Tab,
  TabList,
  TabPanel,
  Tabs,
  tabClasses,
} from '@mui/joy'
import { useGame } from '../utils/context/GameProvider'
import mock from '../mock.json'
import ConnectionDisplay from '../layout/display/ConnectionDisplay'
import SequenceDisplay from '../layout/display/SequenceDisplay'
import VowelDisplay from '../layout/display/VowelDisplay'
import WallDisplay from '../layout/display/WallDisplay'

export default function DisplayGame({ useMock }: { useMock?: boolean }) {
  const gameState = useGame()
  return (
    <Box p={4} height='100%'>
      <Tabs aria-label="tabs" defaultValue={0} sx={{ bgcolor: 'transparent', flexDirection: 'column' }}>
        <TabList
          disableUnderline
          sx={{
            justifyContent: 'center',
            p: 0.5,
            gap: 0.5,
            borderRadius: 'xl',
            bgcolor: 'background.level1',
            [`& .${tabClasses.root}[aria-selected="true"]`]: {
              boxShadow: 'sm',
              bgcolor: 'background.surface',
            },
          }}
        >
          <Tab disableIndicator>Data</Tab>
          <Tab disableIndicator>Connections</Tab>
          <Tab disableIndicator>Sequences</Tab>
          <Tab disableIndicator>Connecting Wall</Tab>
          <Tab disableIndicator>Missing Vowels</Tab>
        </TabList>
        <TabPanel value={0}>
          <Sheet
            variant='soft'
            color="neutral"
            sx={{
              borderRadius: 'sm',
              padding: '16px',
              overflow: 'scroll',
              maxHeight: '50vh',
            }}
          >
            <code>
              <pre>
                {JSON.stringify(useMock ? mock : gameState.game, null, 2)}
              </pre>
            </code>
          </Sheet>
        </TabPanel>
        <TabPanel value={1}>
          <ConnectionDisplay />
        </TabPanel>
        <TabPanel value={2}>
          <SequenceDisplay />
        </TabPanel>
        <TabPanel value={3}>
          <WallDisplay />
        </TabPanel>
        <TabPanel value={4}>
          <VowelDisplay />
        </TabPanel>
      </Tabs>
    </Box >
  )
}