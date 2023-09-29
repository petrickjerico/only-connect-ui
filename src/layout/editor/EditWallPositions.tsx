import { Button, IconButton, Sheet, Stack, Switch, Typography, styled } from '@mui/joy'
import { GameActionKind, GamePayload, useGame, useGameDispatch } from '../../utils/context/GameProvider'
import { Layout, Responsive, WidthProvider } from 'react-grid-layout'
import { useState } from 'react'
import { Palette, BackHand, KeyboardArrowDown } from '@mui/icons-material'
import ClueBox from '../../components/ClueBox'
import ShortInputBox from '../../components/ShortInputBox'

const ResponsiveReactGridLayout = WidthProvider(Responsive)
const MAXIMUM_CLUE_COUNT = 16

export default function EditWallPositions({ wallId }: { wallId: string }) {

  const [isColored, setIsColored] = useState<boolean>(true)
  const [isMoving, setIsMoving] = useState<boolean>(false)
  const [isInfoOpen, setIsInfoOpen] = useState<boolean>(true)

  const gameState = useGame()
  const dispatch = useGameDispatch()

  const gameEntries = Object.entries(gameState.game)
  const clues =
    gameEntries
      .filter(([_, { wall, type }]) => wall === wallId && type === 'clue')

  const count = clues.length
  const isWallEnabled = count === MAXIMUM_CLUE_COUNT

  const layout: Layout[] = []

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
    for (let row = 1; row < 5; row++) {
      for (let col = 1; col < 5; col++) {
        const clueKey: string = `wall_wall${wallId}_group${row}_clue${col}`
        layout.push({ i: clueKey, x: col - 1, y: row - 1, w: 1, h: 1, isResizable: false })
      }
    }
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
            Click here to start editing.
          </Button>
        </Sheet>
      )}
      {isWallEnabled && (
        <Stack direction='column' spacing={2}>
          <Sheet variant='outlined' sx={{ borderRadius: 'sm', p: '20px' }}>
            <Typography startDecorator={
              <IconButton onClick={() => setIsInfoOpen(!isInfoOpen)}>
                <KeyboardArrowDown sx={{ transform: isInfoOpen ? 'initial' : 'rotate(-90deg)' }} />
              </IconButton>}>
              <b>EDITING THE WALL</b>
            </Typography>
            <div style={{ display: `${isInfoOpen ? 'initial' : 'none'}` }}>
              <ul>
                <li>Turn on <b>colors</b> in the SETTINGS (done for you). Enter clues into the colored GRID and the CONNECTIONS for all the same-colored clues.</li>
                <li>Turn off <b>colors</b> and turn on <b>hand mode</b> in the SETTINGS. Shuffle the GRID to its desired initial state in the game.</li>
                <li>During <b>hand mode</b>, the GRID may extend beyond the 4 × 4 layout. Keep moving tiles as needed to ensure that the GRID is 4 × 4 in size before submitting.</li>
              </ul>
            </div>
          </Sheet>
          <Stack direction='row' spacing={2}>
            <Sheet sx={{ borderRadius: 'sm', padding: '10px', width: '100%' }} >
              <Stack spacing={1} >
                <Typography level='body-sm' fontWeight='700' textAlign='center' paddingY={1}>
                  GRID
                </Typography>
                <Sheet sx={{ backgroundColor: 'transparent' }} >
                  <StyledReactGridLayout
                    className='layout'
                    cols={{ lg: 4, md: 4, sm: 4, xs: 4, xxs: 4 }}
                    layouts={{ lg: layout, md: layout, sm: layout, xs: layout, xxs: layout }}
                    isDraggable={isMoving}
                    isBounded
                    containerPadding={[0, 0]}
                    onLayoutChange={(layout: Layout[]) => console.log(layout)}>
                    {clues.map(([key, { wall, group, value, order }]) => {
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
                            initialValue={value}
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
                sx={{ borderRadius: 'sm', padding: '10px' }}
              >
                <Stack spacing={1}>
                  <Typography level='body-sm' fontWeight='700' textAlign='center' paddingY={1}>
                    CONNECTIONS
                  </Typography>
                  {['1', '2', '3', '4'].map((groupId) => (
                    <ShortInputBox
                      key={groupId}
                      textAlign='left'
                      colorId={groupId}
                      size='sm'
                      placeholder={`Connection ${groupId}`}
                      onChange={(event) => {
                        const descriptionKey: string = `wall_wall${wallId}_group${groupId}_description`
                        dispatchWallUpdates({
                          key: descriptionKey,
                          value: event.target.value,
                          wall: wallId,
                          group: `${groupId}`,
                          type: 'description'
                        })
                      }} />

                  ))}
                </Stack>
              </Sheet>
              <Sheet
                variant='plain'
                sx={{ borderRadius: 'sm', padding: '10px' }}
              >
                <Stack spacing={1}>
                  <Typography level='body-sm' fontWeight='700' textAlign='center' paddingY={1}>
                    SETTINGS
                  </Typography>
                  <Sheet variant='soft' sx={{ borderRadius: 'sm', padding: '16px', }}>
                    <Stack direction='row' justifyContent='space-between'>
                      <Typography fontSize='xs' startDecorator={<Palette />}>
                        Show colors
                      </Typography>
                      <Switch
                        size='sm'
                        sx={{ ml: 5 }}
                        checked={isColored}
                        onChange={(event) => setIsColored(event.target.checked)}
                      />
                    </Stack>
                  </Sheet>
                  <Sheet variant='soft' sx={{ borderRadius: 'sm', padding: '16px', }}>
                    <Stack direction='row' justifyContent='space-between'>
                      <Typography fontSize='xs' startDecorator={<BackHand />}>
                        Hand mode
                      </Typography>
                      <Switch
                        size='sm'
                        sx={{ ml: 5 }}
                        checked={isMoving}
                        onChange={(event) => setIsMoving(event.target.checked)}
                      />
                    </Stack>
                  </Sheet>
                </Stack>
              </Sheet>
            </Stack>
          </Stack >
        </Stack >
      )
      }
    </Sheet >
  )
}

const StyledReactGridLayout = styled(ResponsiveReactGridLayout)(({ isDraggable }) => ({
  '.react-grid-item:active:hover': {
    zIndex: 10,
    cursor: 'grabbing',
    boxShadow: `${isDraggable ? 'rgba(149, 157, 165, 0.4) 0px 8px 24px' : undefined}`,
  },
  '.react-grid-item:hover': {
    cursor: 'grab',
    boxShadow: `${isDraggable ? 'rgba(149, 157, 165, 0.2) 0px 8px 24px' : undefined}`,
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
