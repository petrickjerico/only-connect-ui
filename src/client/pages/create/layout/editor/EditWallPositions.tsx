import {
  Button,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
  IconButton,
  Modal,
  ModalDialog,
  Sheet,
  Stack,
  ToggleButtonGroup,
  Tooltip,
  Typography,
  styled
} from '@mui/joy'
import { GameActionKind, GamePayload, useGame, useGameDispatch } from '../../../../utils/context/GameProvider'
import { Layout, Responsive, WidthProvider } from 'react-grid-layout'
import { useState, Fragment } from 'react'
import { Palette, BackHand, KeyboardArrowDown, Shuffle, RestartAlt, WarningRounded } from '@mui/icons-material'
import ClueBox from '../../components/InputClueBox'
import ShortInputBox from '../../components/InputShortBox'

const ResponsiveReactGridLayout = WidthProvider(Responsive)
const MAXIMUM_CLUE_COUNT = 16

export default function EditWallPositions({ wallId, wallHeader }: { wallId: string, wallHeader: string }) {
  const [gridSetings, setGridSettings] = useState(() => ['color'])
  const [isColored, setIsColored] = useState<boolean>(true)
  const [isMoving, setIsMoving] = useState<boolean>(false)
  const [isInfoOpen, setIsInfoOpen] = useState<boolean>(true)
  const [isResetModalOpen, setIsResetModalOpen] = useState<boolean>(false)
  const [layout, setLayout] = useState<Layout[]>([])

  const gameState = useGame()
  const dispatch = useGameDispatch()

  const gameEntries = Object.entries(gameState.game)
  const clues = gameEntries.filter(([_, { wall, type }]) => wall === wallId && type === 'clue')
  const count = clues.length
  const isWallEnabled = count === MAXIMUM_CLUE_COUNT

  function dispatchWallUpdates({
    key,
    wall,
    group,
    order,
    value,
    type
  }: {
    key: string,
    value: string
    wall: string
    group: string
    order?: string
    type: 'clue' | 'description' | 'solution'
  }) {
    const payload: GamePayload = {
      key: key,
      value: {
        value: value,
        round: 'wall',
        wall: wall,
        group: group,
        type: type,
        order: order ?? undefined,
      },
    }
    dispatch({ type: GameActionKind.UPDATE, payload: payload })
  }

  function initializeDispatch() {
    for (let row = 1; row < 5; row++) {
      const descriptionKey: string = `wall_wall${wallId}_group${row}_description`
      dispatchWallUpdates({
        key: descriptionKey,
        value: '',
        wall: wallId,
        group: `${row}`,
        type: 'description'
      })
      for (let col = 1; col < 5; col++) {
        const clueKey: string = `wall_wall${wallId}_group${row}_clue${col}`
        dispatchWallUpdates({
          key: clueKey,
          value: '',
          wall: wallId,
          group: `${row}`,
          order: `${col}`,
          type: 'clue'
        })
      }
    }
  }

  function initializeWall() {
    const temp: Layout[] = []
    for (let row = 1; row < 5; row++) {
      for (let col = 1; col < 5; col++) {
        const clueKey: string = `wall_wall${wallId}_group${row}_clue${col}`
        temp.push({ i: clueKey, x: col - 1, y: row - 1, w: 1, h: 1, isResizable: false })
      }
    }
    setLayout(temp)
  }

  function shuffle() {
    const temp: Layout[] = layout.map(value => ({ value, sort: Math.random() }))
      .sort((a, b) => a.sort - b.sort)
      .map(({ value }, index) => ({ ...value, i: layout[index].i }))
    setLayout(temp)
  }

  function reset() {
    initializeDispatch()
    initializeWall()
  }

  return (
    <Sheet sx={{ backgroundColor: 'transparent' }}>
      {!isWallEnabled && (
        <Sheet
          variant='plain'
          sx={{
            borderRadius: 'sm',
            userSelect: 'none',
            display: 'flex',
            flexDirection: 'column',
            width: '100%',
            height: '150px'
          }}
        >
          <Button onClick={() => initializeDispatch()} variant='plain' fullWidth sx={{ height: '100%' }} size='lg'>
            Click here to start editing
          </Button>
        </Sheet>
      )}
      {isWallEnabled && (
        <Stack direction='row' spacing={2}>
          <Sheet sx={{ borderRadius: 'sm', padding: '10px', width: '100%' }} >
            <Stack spacing={1} >
              <Stack direction='row' justifyContent='space-between' >
                <Typography level='body-sm' fontWeight='700' paddingY={1}>
                  GRID
                </Typography>
                <Stack direction='row' spacing={1}>
                  <Sheet
                    variant="soft"
                    sx={{ borderRadius: 'md', display: 'flex' }}
                  >
                    <ToggleButtonGroup
                      size='sm'
                      spacing={0.5}
                      variant='plain'
                      value={gridSetings}
                      onChange={(_, newSettings) => {
                        setGridSettings(newSettings)
                      }}
                      aria-label="grid settings"
                    >
                      <IconButton value="color" aria-label="color" onClick={() => setIsColored(!isColored)} color='primary'>
                        <Tooltip title='Color' size='sm' placement='top' >
                          <Palette />
                        </Tooltip>
                      </IconButton>
                      <IconButton value="move" aria-label="move" onClick={() => setIsMoving(!isMoving)} color='primary'>
                        <Tooltip title='Grab' size='sm' placement='top' >
                          <BackHand />
                        </Tooltip>
                      </IconButton>
                    </ToggleButtonGroup>
                  </Sheet>
                  <IconButton variant='solid' size='sm' onClick={shuffle} color='primary'>
                    <Tooltip title='Shuffle' size='sm' placement='top' color='primary'>
                      <Shuffle />
                    </Tooltip>
                  </IconButton>
                  <Fragment>
                    <IconButton variant='solid' size='sm' color='danger' onClick={() => setIsResetModalOpen(true)}>
                      <Tooltip title='Reset' size='sm' color='danger' placement='top'>
                        <RestartAlt />
                      </Tooltip>
                    </IconButton>
                    <Modal
                      open={isResetModalOpen}
                      onClose={() => setIsResetModalOpen(false)}
                    >
                      <ModalDialog variant="outlined" role="alertdialog" maxWidth='30vw' size='sm'>
                        <DialogTitle>
                          <WarningRounded />
                          Confirmation
                        </DialogTitle>
                        <Divider />
                        <DialogContent>
                          {`Are you sure you want to reset the ${wallHeader}? You will lose all clues and connections that you have entered.`}
                        </DialogContent>
                        <DialogActions>
                          <Button variant="solid" color="danger" onClick={() => {
                            reset()
                            setIsResetModalOpen(false)
                          }
                          }>
                            Reset
                          </Button>
                          <Button variant="plain" color="neutral" onClick={() => setIsResetModalOpen(false)}>
                            Cancel
                          </Button>
                        </DialogActions>
                      </ModalDialog>
                    </Modal>
                  </Fragment>
                </Stack>
              </Stack>
              <Divider />
              <Sheet sx={{ backgroundColor: 'transparent' }} >
                <StyledReactGridLayout
                  className='layout'
                  cols={{ lg: 4, md: 4, sm: 4, xs: 4, xxs: 4 }}
                  layouts={{ lg: layout, md: layout, sm: layout, xs: layout, xxs: layout }}
                  isDraggable={isMoving}
                  isBounded
                  containerPadding={[0, 0]}
                  onLayoutChange={(layout: Layout[]) => console.log(layout)}>
                  {clues.map(([key, { wall, group, order }]) => {
                    if (!layout.length) {
                      initializeWall()
                    }
                    return (
                      <Sheet
                        variant='plain'
                        key={key}
                        sx={{ userSelect: 'none' }}
                      >
                        <StyledClueBox
                          height='100%'
                          disabled={isMoving}
                          colorId={isColored ? group : 'white'}
                          clueKey={key}
                          placeholder={`Connection ${group}\nClue ${order}`}
                          onChange={(event) => {
                            const key: string = `wall_wall${wall}_group${group}_clue${order}`
                            dispatchWallUpdates({
                              key: key,
                              value: event.target.value,
                              wall: wallId,
                              group: `${group}`,
                              order: `${order}`,
                              type: 'clue'
                            })
                          }} />
                      </Sheet>
                    )
                  })}
                </StyledReactGridLayout>
              </Sheet>
            </Stack>
          </Sheet>
          <Stack minWidth='25%' maxWidth='25%' spacing={2}>
            <Sheet
              variant='plain'
              sx={{ borderRadius: 'sm', padding: '10px' }}>
              <Stack spacing={1}>
                <Typography level='body-sm' fontWeight='700' paddingY={1}>
                  CONNECTIONS
                </Typography>
                <Divider />
                {['1', '2', '3', '4'].map((groupId) => {
                  const descriptionKey: string = `wall_wall${wallId}_group${groupId}_description`
                  return (
                    <ShortInputBox
                      clueKey={descriptionKey}
                      key={groupId}
                      textAlign='left'
                      colorId={groupId}
                      editSize='sm'
                      displaySize='body-sm'
                      placeholder={`Connection ${groupId}`}
                      onChange={(event) => {
                        dispatchWallUpdates({
                          key: descriptionKey,
                          value: event.target.value,
                          wall: wallId,
                          group: `${groupId}`,
                          type: 'description'
                        })
                      }}
                    />
                  )
                })}
              </Stack>
            </Sheet>
            <Sheet
              variant='plain'
              sx={{ borderRadius: 'sm', p: '10px', maxHeight: '100%' }}>
              <Stack spacing={1}>
                <Stack direction='row' justifyContent='space-between' >
                  <Typography
                    fontWeight='700'
                    level='body-sm'
                    paddingY={1}>
                    HELP
                  </Typography>
                  <IconButton onClick={() => setIsInfoOpen(!isInfoOpen)} size='sm'>
                    <KeyboardArrowDown sx={{ transform: isInfoOpen ? 'rotate(180deg)' : 'initial' }} />
                  </IconButton>
                </Stack>
                <Stack direction='column' display={isInfoOpen ? 'flex' : 'none'} spacing={2}>
                  <Divider />
                  <Typography level='body-xs'>
                    <Typography startDecorator={<Palette />} fontWeight='700'>Color</Typography>{' '}toggles connection colors on the grid.
                  </Typography>
                  <Typography level='body-xs'>
                    <Typography startDecorator={<BackHand />} fontWeight='700'>Grab</Typography>{' '}toggles manual tile movements.
                  </Typography>
                  <Typography level='body-xs'>
                    <Typography startDecorator={<Shuffle />} fontWeight='700'>Shuffle</Typography>{' '}randomises tile positions without hand.
                  </Typography>
                  <Typography level='body-xs'>
                    <Typography startDecorator={<RestartAlt />} fontWeight='700'>Reset</Typography>{' '}clears the grid and connections.
                  </Typography>
                  <Divider />
                  <Stack direction='column' spacing={1} p={1}>
                    <Typography level='body-xs' color='warning' fontWeight='700' startDecorator={<WarningRounded />}>
                      WARNING
                    </Typography>
                    <Typography level='body-xs'>
                      When moving tiles manually, the grid may extend beyond the 4 × 4 layout. Adjust tiles until the final grid is 4 × 4 in size.
                    </Typography>
                    <Typography level='body-xs' >
                      (This will also be checked during submission.)
                    </Typography>
                  </Stack>
                </Stack>
              </Stack>
            </Sheet>
          </Stack>
        </Stack >
      )
      }
    </Sheet >
  )
}

const StyledReactGridLayout = styled(ResponsiveReactGridLayout)(({ isDraggable }) => ({
  '.react-grid-item': {
    cursor: 'grab',
    boxShadow: `${isDraggable ? 'rgba(149, 157, 165, 0.1) 0px 8px 24px' : undefined}`,
  },
  '.react-grid-item:hover': {
    boxShadow: `${isDraggable ? 'rgba(149, 157, 165, 0.2) 0px 8px 24px' : undefined}`,
    border: '3'
  },
  '.react-grid-item:active:hover': {
    zIndex: 10,
    cursor: 'grabbing',
    boxShadow: `${isDraggable ? 'rgba(149, 157, 165, 0.4) 0px 8px 24px' : undefined}`,
  },
}))

const StyledClueBox = styled(ClueBox)(() => ({
  textarea: {
    textAlign: 'center',
  },
  'textarea:focus::placeholder': {
    color: 'transparent',
  },
  overflow: 'clip',
  flexDirection: 'row',
  backgroundColor: 'transparent',
}))
