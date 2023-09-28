import { Input, Sheet, Stack, Switch, Typography, styled } from '@mui/joy'
import { GameActionKind, GamePayload, useGame, useGameDispatch } from '../../utils/context/GameProvider'
import RGL, { Layout, WidthProvider } from 'react-grid-layout'
import { getGroupColor } from '../../utils/colors'
import { useState } from 'react'
import { Palette, EditNote } from '@mui/icons-material'

const ReactGridLayout = WidthProvider(RGL)
const MAXIMUM_CLUE_COUNT = 16

export default function EditWallPositions({ wallId, wallHeader }: { wallId: string, wallHeader: string }) {

  const [isColored, setIsColored] = useState<boolean>(true)
  const [isEditing, setIsEditing] = useState<boolean>(false)
  const dispatch = useGameDispatch()

  const gameState = useGame()
  const gameEntries = Object.entries(gameState.game)
  const clues =
    gameEntries
      .filter(([_, { wall, type, value }]) => wall === wallId && type === 'clue' && value)
  const descriptions =
    Object.fromEntries(gameEntries
      .filter(([_, { wall, type, value }]) => wall === wallId && type === 'description' && value)
      .map(([_, { group, value }]) => [group, value]))

  const count = clues.length
  const isWallEnabled = count > 0 && count <= MAXIMUM_CLUE_COUNT

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

  const layout: Layout[] = []

  function initializeWallLayout() {
    for (let row = 1; row < 5; row++) {
      for (let col = 1; col < 5; col++) {
        const clueKey: string = `wall_wall${wallId}_group${row}_clue${col}`
        layout.push({ i: clueKey, x: col - 1, y: row - 1, w: 1, h: 1, isResizable: false })
      }
    }
  }

  return (
    <Sheet
      variant='outlined'
      sx={{ borderRadius: 'sm', padding: '32px', backgroundColor: 'white' }}
    >
      <Stack direction='column' spacing={2}>
        <Typography level='h3'>
          {`${wallHeader} — Preview`}
        </Typography>
        <Typography>
          {'Move around the tiles into their desired initial positions. The grid may grow beyond 4 × 4 during movement. '}
          {'Please ensure that the final grid is 4 × 4 in size.'}
        </Typography>
        <Stack direction='row' spacing={2}>
          <Sheet sx={{ borderRadius: 'sm', padding: '10px', width: '100%' }} >
            <Stack spacing={1} >
              <Typography level='body-xs' fontWeight='700' textAlign='center' paddingY={1}>
                GRID
              </Typography>
              {isWallEnabled && (
                <StyledReactGridLayout
                  className='layout'
                  cols={4}
                  layout={layout}
                  isDraggable={!isEditing}
                  isBounded
                  containerPadding={[0, 0]}
                  onLayoutChange={(layout: Layout[]) => console.log(layout)}>
                  {clues.map(([key, { wall, group, value, order }]) => (
                    <Sheet
                      variant='outlined'
                      key={key}
                      sx={{
                        borderRadius: 'sm',
                        justifyContent: 'center',
                        backgroundColor: `${isColored ? getGroupColor(group) : 'white'}`,
                      }}
                    >
                      <StyledInput
                        variant='plain'
                        disabled={!isEditing}
                        value={value}
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
                  ))}
                </StyledReactGridLayout>
              )}
              {!isWallEnabled && (
                <Sheet
                  variant='plain'
                  sx={{
                    borderRadius: 'sm',
                    userSelect: 'none',
                    backgroundColor: 'transparent',
                    display: 'flex',
                    width: '100%'
                  }}
                >
                  <Typography level='h1'>
                    Nope.
                  </Typography>
                </Sheet>
              )}
            </Stack>
          </Sheet>
          <Stack minWidth='25%' maxWidth='25%' spacing={2}>
            <Sheet
              variant='plain'
              sx={{ borderRadius: 'sm', padding: '10px' }}
            >
              <Stack spacing={1}>
                <Typography level='body-xs' fontWeight='700' textAlign='center' paddingY={1}>
                  LEGEND
                </Typography>
                {['1', '2', '3', '4'].map((groupId) => (
                  <Sheet
                    variant='outlined'
                    key={groupId}
                    sx={{ borderRadius: 'sm', backgroundColor: `${getGroupColor(groupId)}`, py: '4px', px: '16px' }}>
                    <Typography level='body-xs' noWrap textAlign='center'>
                      <StyledInput
                        size='sm'
                        variant='plain'
                        disabled={!isEditing}
                        value={`${descriptions[groupId] ?? `Connection ${groupId}`}`}
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
                    </Typography>
                  </Sheet>
                ))}
              </Stack>
            </Sheet>
            <Sheet
              variant='plain'
              sx={{ borderRadius: 'sm', padding: '10px' }}
            >
              <Stack spacing={1}>
                <Typography level='body-xs' fontWeight='700' textAlign='center' paddingY={1}>
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
                    <Typography fontSize='xs' startDecorator={<EditNote />}>
                      Edit mode
                    </Typography>
                    <Switch
                      size='sm'
                      sx={{ ml: 5 }}
                      checked={isEditing}
                      onChange={(event) => setIsEditing(event.target.checked)}
                    />
                  </Stack>
                </Sheet>
              </Stack>
            </Sheet>
          </Stack>
        </Stack >
      </Stack >
    </Sheet >
  )
}

const StyledReactGridLayout = styled(ReactGridLayout)(() => ({
  '.react-grid-item:active:hover': {
    zIndex: 10,
    cursor: 'grabbing',
    boxShadow: 'rgba(149, 157, 165, 0.4) 0px 8px 24px',
  },
  '.react-grid-item:hover': {
    cursor: 'grab',
    boxShadow: 'rgba(149, 157, 165, 0.2) 0px 8px 24px',
  },
}))

const StyledInput = styled(Input)(() => ({
  input: {
    textAlign: 'center',
  },
  'input:focus::placeholder': {
    color: 'transparent',
  },
  overflow: 'clip',
  flexDirection: 'row',
  backgroundColor: 'transparent',
  height: '100%'
}))
