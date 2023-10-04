import { Box, Button, Typography, colors, styled } from '@mui/joy';
import { WallGroup } from '../../utils/types/display';
import { Layout, Responsive, WidthProvider } from 'react-grid-layout';
import { useEffect, useState } from 'react';
import { getGroupColor } from '../../utils/colors';

const ReactGridLayout = WidthProvider(Responsive)

export default function DisplayWall({ data }: { data: WallGroup }) {
  const [layout, setLayout] = useState<Layout[]>([])
  const [selections, setSelections] = useState<string[]>([])
  const [found, setFound] = useState<string[]>([])
  const [lives, setLives] = useState<{ isActivated: boolean, number: number }>({ isActivated: false, number: 3 })

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
      const rest = shiftFoundUp(found.concat(selections))

      if (rest.length === 4) {
        newfound = newfound.concat(rest)
      }

      setFound(found.concat(newfound))
    } else {
      if (lives.isActivated) {
        setLives({ ...lives, number: lives.number - 1 })
      }
    }
  }

  useEffect(() => {
    initializeLayout()
  }, [])

  useEffect(() => {
    console.log(useEffect, '1 called')
    if (selections.length === 4) {
      checkSelections()
      setSelections([])
    }
  }, [selections])

  useEffect(() => {
    if (found.length === 8 && !lives.isActivated) {
      setLives({ ...lives, isActivated: true })
    }
  }, [found])


  return <Box width='60vw'>
    <StyledReactGridLayout
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
            disabled={found.includes(i) || lives.number === 0}
            onClick={() => {
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
              {wallData[`${groupKey}`][`${clueKey}`]}
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
    {lives.isActivated && (
      <Typography>
        Lives: {lives.number}
      </Typography>
    )}
  </Box>
}

const StyledReactGridLayout = styled(ReactGridLayout)(() => ({
  '.react-grid-item': {
    transition: 'all 200ms ease',
    transitionPproperty: 'left, top, width, height'
  }
}))