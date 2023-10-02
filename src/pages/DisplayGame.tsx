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
import ConnectionDisplay from './displays/ConnectionDisplay'
import SequenceDisplay from './displays/SequenceDisplay'
import VowelDisplay from './displays/VowelDisplay'
import WallDisplay from './displays/WallDisplay'
import { GameDisplay } from '../utils/types/display'
import { transformInputsToDisplay } from '../utils/game'

export default function DisplayGame({ useMock }: { useMock?: boolean }) {
  const gameState = useGame()
  const {
    connections,
    sequences,
    walls,
    vowels
  }: GameDisplay = transformInputsToDisplay(gameState.game)

  return (
    <Box height='100%' display='flex'>
      <Box p={4} display='flex' flexGrow='1'>
        <Tabs
          aria-label='tabs'
          defaultValue={0}
          sx={{
            flexGrow: '1',
            bgcolor: 'transparent',
            alignItems: 'center',
          }}>
          <TabList
            disableUnderline
            sx={{
              justifyContent: 'center',
              p: 0.5,
              gap: 0.5,
              borderRadius: 'md',
              bgcolor: 'background.level1',
              [`& .${tabClasses.root}[aria-selected="true"]`]: {
                boxShadow: 'sm',
                bgcolor: 'background.surface',
                borderRadius: 'md',
              },
            }}
          >
            <Tab disableIndicator>Data</Tab>
            <Tab disableIndicator>Connections</Tab>
            <Tab disableIndicator>Sequences</Tab>
            <Tab disableIndicator>Connecting Wall</Tab>
            <Tab disableIndicator>Missing Vowels</Tab>
          </TabList>
          <TabPanel value={0} >
            <Sheet
              variant='soft'
              color='neutral'
              sx={{
                borderRadius: 'sm',
                padding: '16px',
                overflow: 'scroll',
              }}
            >
              <code>
                <pre>
                  {JSON.stringify(useMock ? mock : gameState.game, null, 2)}
                </pre>
              </code>
            </Sheet>
          </TabPanel>
          <TabPanel value={1} >
            <ConnectionDisplay data={connections} />
          </TabPanel>
          <TabPanel value={2}>
            <SequenceDisplay data={sequences} />
          </TabPanel>
          <TabPanel value={3}>
            <WallDisplay data={walls} />
          </TabPanel>
          <TabPanel value={4}>
            <VowelDisplay data={vowels} />
          </TabPanel>
        </Tabs>
      </Box>
    </Box >
  )
}