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
import DisplayConnectionRound from './displays/DisplayConnectionRound'
import DisplaySequenceRound from './displays/DisplaySequenceRound'
import DisplayVowelRound from './displays/DisplayVowelRound'
import DisplayWallRound from './displays/DisplayWallRound'
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
            ['& :not(.MuiTabPanel-hidden)']: {
              display: 'flex',
              alignItems: 'center'
            }
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
          <TabPanel value={1}>
            <DisplayConnectionRound data={connections} />
          </TabPanel>
          <TabPanel value={2}>
            <DisplaySequenceRound data={sequences} />
          </TabPanel>
          <TabPanel value={3}>
            <DisplayWallRound data={walls} />
          </TabPanel>
          <TabPanel value={4}>
            <DisplayVowelRound data={vowels} />
          </TabPanel>
        </Tabs>
      </Box>
    </Box >
  )
}