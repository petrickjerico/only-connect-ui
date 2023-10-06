import { Box, Button, Sheet, Stack, Typography, colors, styled } from '@mui/joy'
import { WallGroup } from '../../utils/types/display'
import { Layout, Responsive, WidthProvider } from 'react-grid-layout'
import { useEffect, useState } from 'react'
import { getGroupColor } from '../../utils/colors'
import DisplayGroupBox from '../../components/DisplayGroupBox'
import LinearTimer from '../../components/LinearTimer'
import { FavoriteRounded } from '@mui/icons-material'
import { ClickSFX, CorrectSFX, FailSFX, GroupSelectedSFX, IncorrectSFX, LifeReducedSFX, SolvedSFX, TapSFX, WallBGM, playAudio, stopAudio } from '../../assets/audios'

const ReactGridLayout = WidthProvider(Responsive)

const enum RoundState {
  READY,
  PLAY,
  PAUSE,
  GUESS,
}

export default function DisplayWall({ data, groupKey }: { data: WallGroup, groupKey: string }) {
  const [layout, setLayout] = useState<Layout[]>([])
  const [selections, setSelections] = useState<string[]>([])
  const [found, setFound] = useState<string[]>([])
  const [foundGroups, setFoundGroups] = useState<string[]>([])
  const [lives, setLives] = useState<{ isActivated: boolean, number: number }>({ isActivated: false, number: 3 })
  const [guessing, setGuessing] = useState<number>(0)
  const [fastAnimation, setFastAnimation] = useState<boolean>(false)


  const [gameState, setGameState] = useState<RoundState>(RoundState.READY)

  const wallData: Record<string, Record<string, string>> = data

  function initializeLayout() {
    const layout: Layout[] = []
    Object.entries(wallData).forEach(([groupKey, clueGroup], groupIndex) => {
      Object.entries(clueGroup).forEach(([clueKey], clueIndex) => {
        if (clueKey != 'description') {
          const key = `${groupKey}_${clueKey}`
          layout.push({ i: key, x: groupIndex, y: clueIndex, w: 1, h: 1, isDraggable: false, isResizable: false })
        }
      })
    })

    const temp: Layout[] = layout.map(value => ({ value, sort: Math.random() }))
      .sort((a, b) => a.sort - b.sort)
      .map(({ value }, index) => ({ ...value, i: layout[index].i }))
    setLayout(temp)
  }

  function getColor(i: string, groupId: string) {
    if (selections.includes(i)) {
      return colors.blue[100]
    }
    if (found.includes(i)) {
      return getGroupColor(groupId)
    }
  }

  function shiftFoundUp(foundKeys: string[]) {
    const notFoundLayout: Layout[] =
      layout
        .filter(({ i }) => !foundKeys.includes(i))
        .sort((a, b) => a.x - b.x + (a.y - b.y))

    const newLayout: Layout[] =
      foundKeys
        .map((key) => ({ i: key, x: 0, y: 0, h: 1, w: 1 }))
        .concat(notFoundLayout)
        .map(({ i }, index) => ({
          i: i,
          x: index % 4,
          y: Math.floor(index / 4),
          h: 1,
          w: 1,
          isDraggable: false,
          isResizable: false
        }))


    setLayout(newLayout)
    return notFoundLayout.map(({ i }) => i)
  }

  function checkSelections() {
    const groups = selections.map(key => key.split('_')[0])

    if (groups.every(val => val === groups[0])) {
      let newfound = selections
      let newfoundGroups = [groups[0]]
      const rest = shiftFoundUp(found.concat(selections))

      if (rest.length === 4) {
        const restGroup = rest.map(key => key.split('_')[0])[0]
        newfound = newfound.concat(rest)
        newfoundGroups = newfoundGroups.concat(restGroup)
        setGameState(RoundState.PAUSE)
      }

      setFound(found.concat(newfound))
      setFoundGroups(foundGroups.concat(newfoundGroups))

      if (rest.length === 4) {
        stopAudio(WallBGM)
        playAudio(SolvedSFX)
      } else {
        playAudio(CorrectSFX)
      }

    } else {
      if (lives.isActivated) {
        const updatedLifeCount = lives.number - 1
        setLives({ ...lives, number: updatedLifeCount })
        if (!updatedLifeCount) {
          setGameState(RoundState.PAUSE)
          stopAudio(WallBGM)
          playAudio(FailSFX)
          return
        }
      }
      if (lives.isActivated) {
        playAudio(LifeReducedSFX)
      } else {
        playAudio(IncorrectSFX)
      }
    }
  }

  function solveWall() {
    let remainingClues: string[] = []
    let remainingGroups: string[] = []
    for (let i: number = 1; i <= 4; i++) {
      const groupId = `group${i}`
      if (!foundGroups.includes(groupId)) {
        remainingGroups = remainingGroups.concat(groupId)
        const groupClues = [
          `${groupId}_clue1`,
          `${groupId}_clue2`,
          `${groupId}_clue3`,
          `${groupId}_clue4`,
        ]
        remainingClues = remainingClues.concat(groupClues)
      }
    }
    shiftFoundUp(found.concat(remainingClues))
    setFound(found.concat(remainingClues))
    setFoundGroups(foundGroups.concat(remainingGroups))
  }

  useEffect(() => {
    playAudio(GroupSelectedSFX)
    initializeLayout()
  }, [])

  useEffect(() => {
    if (!fastAnimation && selections.length === 1) {
      setFastAnimation(true)
    }
    if (selections.length === 4) {
      checkSelections()
      setSelections([])
    }
  }, [selections, fastAnimation])

  useEffect(() => {
    if (found.length === 8 && !lives.isActivated) {
      setLives({ ...lives, isActivated: true })
    }
  }, [found])


  return <Box display='flex' alignItems='center' justifyContent='center' height='100%'>
    {gameState === RoundState.READY &&
      <DisplayGroupBox
        groupId={groupKey}
        onClick={() => {
          playAudio(ClickSFX)
          playAudio(WallBGM)
          setGameState(RoundState.PLAY)
        }} />}
    {gameState > RoundState.READY &&
      <Stack direction='row' gap={4} justifyContent='space-between'>
        <Stack width='70vw' gap={2}>
          <StyledReactGridLayout
            fast={fastAnimation}
            className='layout'
            cols={{ lg: 4, md: 4, sm: 4, xs: 4, xxs: 4 }}
            layouts={{ lg: layout, md: layout, sm: layout, xs: layout, xxs: layout }}
            isDraggable={false}
            containerPadding={[0, 0]}
          >
            {layout.map(({ i }) => {
              const keys: string[] = i.split('_')
              const [groupKey, clueKey] = [keys[0], keys[1]]
              const groupId = groupKey.charAt(groupKey.length - 1)
              return (
                <Button
                  variant='outlined'
                  key={i}
                  disabled={found.includes(i) || gameState !== RoundState.PLAY}
                  onClick={() => {
                    playAudio(TapSFX)
                    if (selections.includes(i)) {
                      setSelections(selections.filter(val => val !== i))
                    } else {
                      setSelections(selections.concat(i))
                    }
                  }
                  }
                  sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    userSelect: 'none',
                    alignItems: 'center',
                    justifyContent: 'center',
                    backgroundColor: getColor(i, groupId),
                    ':disabled': {
                      backgroundColor: getColor(i, groupId),
                    }
                  }}
                >
                  <Typography textAlign='center'>
                    {wallData[groupKey][clueKey]}
                  </Typography>
                  <Typography>
                    {groupKey}
                  </Typography>
                  <Typography>
                    {clueKey}
                  </Typography>
                </Button>
              )
            })}
          </StyledReactGridLayout>
          {gameState === RoundState.PLAY &&
            <Stack direction='row' gap={4}>
              <Stack direction='row' gap={1} visibility={lives.isActivated ? 'visible' : 'hidden'} width='10%' alignItems='center'>
                {Array.from(Array(lives.number).keys()).map((key) => <FavoriteRounded key={key} sx={{ color: colors.red[300] }} />)}
              </Stack>
              <LinearTimer
                duration={150}
                isVisible={true}
                isCounting={true}
                isEnd={false}
                onComplete={() => setGameState(RoundState.PAUSE)} />
            </Stack>}
          {gameState === RoundState.PAUSE &&
            <Button
              variant='solid'
              fullWidth
              color={found.length === 16 ? 'success' : 'neutral'}
              onClick={() => {
                setGameState(RoundState.GUESS)
              }}>
              {`The wall ${found.length === 16 ? 'is solved!' : 'has frozen.'} Proceed to guessing connections.`}
            </Button>}
        </Stack>
        {gameState === RoundState.GUESS &&
          <Stack display='flex' spacing={1} width='30%'>
            {Array.from(Array(4).keys()).map((index) => {
              if (index < foundGroups.length) {
                const connectionKey = foundGroups[index]
                const groupId = connectionKey.charAt(connectionKey.length - 1)
                return (
                  <StyledSheet key={connectionKey} variant='outlined' height='100%' colorid={groupId}>
                    <StyledButton
                      variant='soft'
                      onClick={() => setGuessing(guessing + 1)}
                      disabled={guessing !== index}
                      sx={{
                        position: 'absolute',
                        width: '100%',
                        visibility: guessing > index ? 'hidden' : 'visible'
                      }} >
                      What is the connection in this group?
                    </StyledButton>
                    <Typography level='h2' px='4px'>
                      {wallData[connectionKey]['description']}
                    </Typography>
                  </StyledSheet>
                )
              } else {
                return (
                  <StyledSheet key={index} variant='outlined' height='100%'>
                    <StyledButton
                      disabled={guessing !== index}
                      variant='soft' onClick={solveWall}>
                      Resolve wall
                    </StyledButton>
                  </StyledSheet>
                )
              }
            })}
          </Stack>}
      </Stack>
    }
  </Box>
}



const StyledReactGridLayout = styled(ReactGridLayout)<{ fast: boolean }>(({ fast }) => ({
  '.react-grid-item': {
    transition: `transform ${fast ? '250ms' : '1s'} ease-in-out`,
  },
}))

const StyledButton = styled(Button)(() => ({
  height: '100%',
  textAlign: 'center',
  borderRadius: '12px',
  zIndex: '1',
}))

const StyledSheet = styled(Sheet)<{ height?: 'short' | 'tall' | string, colorid?: string }>(({ height, colorid }) => ({
  height: height === 'tall' ? '200px' : height === 'short' ? '100px' : height,
  display: 'flex',
  flexDirection: 'column',
  textAlign: 'center',
  justifyContent: 'center',
  borderRadius: '12px',
  backgroundColor: colorid ? getGroupColor(colorid) : undefined,
}))
