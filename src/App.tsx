import {
  Box,
  Button,
  Divider,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  Modal,
  Sheet,
  Stack,
  ThemeProvider,
  Typography,
  listItemButtonClasses,
  useTheme,
} from '@mui/joy'
import './App.css'
import EditClues from './layout/EditClues'
import { useState } from 'react'
import KeyboardArrowDown from '@mui/icons-material/KeyboardArrowDown'
import EditVowelClues from './layout/EditVowelClues'
import GameProvider from './utils/context/GameProvider'
import GameModalSheet from './layout/GameModalSheet'

function App() {
  const groups = ['1', '2', '3', '4', '5', '6']
  const walls = ['A', 'B']
  const vowelsCategoryMaxCount = 5
  const vowelsCategory = Array.from(Array(vowelsCategoryMaxCount).keys()).map((x) => x + 1)

  const theme = useTheme()

  const [open, setOpen] = useState(true)
  const [open2, setOpen2] = useState(true)
  const [modalOpen, setModalOpen] = useState(false)

  return (
    <ThemeProvider theme={theme}>
      <GameProvider>
        <Stack direction='row' height='100vh'>
          <Box
            sx={{
              width: 320,
              pl: '24px',
            }}
          >
            <List
              size='sm'
              sx={(theme) => ({
                // Gatsby colors
                '--joy-palette-primary-plainColor': '#8a4baf',
                '--joy-palette-neutral-plainHoverBg': 'transparent',
                '--joy-palette-neutral-plainActiveBg': 'transparent',
                '--joy-palette-primary-plainHoverBg': 'transparent',
                '--joy-palette-primary-plainActiveBg': 'transparent',
                [theme.getColorSchemeSelector('dark')]: {
                  '--joy-palette-text-secondary': '#635e69',
                  '--joy-palette-primary-plainColor': '#d48cff',
                },

                '--List-insetStart': '32px',
                '--ListItem-paddingY': '0px',
                '--ListItem-paddingRight': '16px',
                '--ListItem-paddingLeft': '21px',
                '--ListItem-startActionWidth': '0px',
                '--ListItem-startActionTranslateX': '-50%',

                [`& .${listItemButtonClasses.root}`]: {
                  borderLeftColor: 'divider',
                },
                [`& .${listItemButtonClasses.root}.${listItemButtonClasses.selected}`]: {
                  borderLeftColor: 'currentColor',
                },
                '& [class*="startAction"]': {
                  color: 'var(--joy-palette-text-tertiary)',
                },
              })}
            >
              <ListItem
                nested
                sx={{ my: 1 }}
                startAction={
                  <IconButton
                    variant='plain'
                    size='sm'
                    color='neutral'
                    onClick={() => setOpen(!open)}
                  >
                    <KeyboardArrowDown sx={{ transform: open ? 'initial' : 'rotate(-90deg)' }} />
                  </IconButton>
                }
              >
                <ListItem>
                  <Typography
                    level='inherit'
                    sx={{
                      fontWeight: open ? 'bold' : undefined,
                      color: open ? 'text.primary' : 'inherit',
                    }}
                  >
                    Tutorial
                  </Typography>
                  <Typography component='span' level='body-xs' sx={{ ml: 1 }}>
                    9
                  </Typography>
                </ListItem>
                {open && (
                  <List sx={{ '--ListItem-paddingY': '8px' }}>
                    <ListItem>
                      <ListItemButton>Overview</ListItemButton>
                    </ListItem>
                    <ListItem>
                      <ListItemButton>0. Set Up Your Development Environment</ListItemButton>
                    </ListItem>
                    <ListItem>
                      <ListItemButton>1. Create and Deploy Your First Gatsby Site</ListItemButton>
                    </ListItem>
                    <ListItem>
                      <ListItemButton>2. Use and Style React components</ListItemButton>
                    </ListItem>
                  </List>
                )}
              </ListItem>
              <ListItem
                nested
                sx={{ my: 1 }}
                startAction={
                  <IconButton
                    variant='plain'
                    size='sm'
                    color='neutral'
                    onClick={() => setOpen2((bool) => !bool)}
                  >
                    <KeyboardArrowDown sx={{ transform: open2 ? 'initial' : 'rotate(-90deg)' }} />
                  </IconButton>
                }
              >
                <ListItem>
                  <Typography
                    level='inherit'
                    sx={{
                      fontWeight: open2 ? 'bold' : undefined,
                      color: open2 ? 'text.primary' : 'inherit',
                    }}
                  >
                    How-to Guides
                  </Typography>
                  <Typography component='span' level='body-xs' sx={{ ml: 1 }}>
                    39
                  </Typography>
                </ListItem>
                {open2 && (
                  <List sx={{ '--ListItem-paddingY': '8px' }}>
                    <ListItem>
                      <ListItemButton>Overview</ListItemButton>
                    </ListItem>
                    <ListItem>
                      <ListItemButton>Local Development</ListItemButton>
                    </ListItem>
                    <ListItem>
                      <ListItemButton>Routing</ListItemButton>
                    </ListItem>
                    <ListItem>
                      <ListItemButton>Styling</ListItemButton>
                    </ListItem>
                  </List>
                )}
              </ListItem>
            </List>
          </Box>
          <Divider orientation='vertical' />
          <Box width='100%'>
            <Box maxHeight='100%' overflow='auto' justifyContent='center'>
              <Stack
                direction='column'
                sx={{ px: '36px', py: '64px' }}
                divider={<Divider />}
                spacing={12}
              >
                <Stack>
                  <Typography level='h1' sx={{ pb: '24px' }}>
                    Round 1: Connections
                  </Typography>
                  <Stack spacing={8}>
                    {groups.map((group) => {
                      return (
                        <Stack spacing={2} key={group}>
                          <Typography level='h2'>{`Connection ${group}`}</Typography>
                          <EditClues
                            group={group}
                            round={'connection'}
                            descriptionPlaceholder='What is the connection?'
                          />
                        </Stack>
                      )
                    })}
                  </Stack>
                </Stack>
                <Stack>
                  <Typography level='h1' sx={{ pb: '24px' }}>
                    Round 2: Sequences
                  </Typography>
                  <Stack spacing={8}>
                    {groups.map((group) => {
                      return (
                        <Stack spacing={2} key={group}>
                          <Typography level='h2'>{`Sequence ${group}`}</Typography>
                          <EditClues
                            group={group}
                            round={'sequence'}
                            descriptionPlaceholder='What is the sequence?'
                          />
                        </Stack>
                      )
                    })}
                  </Stack>
                </Stack>
                <Stack>
                  <Typography level='h1' sx={{ pb: '24px' }}>
                    Round 3: Connecting Wall
                  </Typography>
                  <Stack spacing={8}>
                    {walls.map((wall) => {
                      return (
                        <Stack spacing={2} key={wall}>
                          <Typography level='h2'>{`Wall ${wall}`}</Typography>
                          <Sheet
                            variant='outlined'
                            sx={{ borderRadius: 'sm', background: 'white' }}
                          >
                            <Stack spacing={6} p={4}>
                              {['1', '2', '3', '4'].map((group) => {
                                return (
                                  <Stack spacing={2} key={group}>
                                    <Typography level='h3'>{`Group ${group}`}</Typography>
                                    <EditClues
                                      group={group}
                                      round={'wall'}
                                      descriptionPlaceholder='What is the connection in this group?'
                                    />
                                  </Stack>
                                )
                              })}
                            </Stack>
                          </Sheet>
                        </Stack>
                      )
                    })}
                  </Stack>
                </Stack>
                <Stack>
                  <Typography level='h1' sx={{ pb: '24px' }}>
                    Round 4: Missing vowels
                  </Typography>
                  <Stack spacing={8}>
                    {vowelsCategory.map((group) => {
                      return (
                        <Stack spacing={2} key={group}>
                          <Typography level='h2'>{`Category ${group}`}</Typography>
                          <EditVowelClues
                            group={group}
                            descriptionPlaceholder='What is the category?'
                          />
                        </Stack>
                      )
                    })}
                  </Stack>
                </Stack>
              </Stack>
            </Box>
          </Box>
          <Divider orientation='vertical' />
          <Box padding={4} display='flex' alignItems='flex-end'>
            <Button onClick={() => setModalOpen(true)}>Check</Button>
            <Modal
              aria-labelledby='modal-title'
              aria-describedby='modal-desc'
              open={modalOpen}
              onClose={() => setModalOpen(false)}
              sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}
            >
              <GameModalSheet />
            </Modal>
          </Box>
        </Stack>
      </GameProvider>
    </ThemeProvider>
  )
}

export default App
