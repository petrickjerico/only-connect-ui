import { KeyboardArrowDown } from '@mui/icons-material'
import {
  Box,
  List,
  listItemButtonClasses,
  ListItem,
  IconButton,
  Typography,
  ListItemButton,
  Link
} from '@mui/joy'
import { useState } from 'react'
import { getGameHeaders } from '../../../utils/titles'

export default function Sidebar() {
  const gameHeaders = getGameHeaders()
  const [open, setOpen] = useState<Record<string, boolean>>({
    'connection': true,
    'sequence': true,
    'vowel': true,
    'wall': true
  })

  return (
    <Box
      sx={{
        width: 480,
        pl: '24px',
        pt: '24px',
        overflow: 'scroll'
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
        <ListItem>
          <Typography level='title-md'>
            QUICK ACCESS
          </Typography>
        </ListItem>
        {Object.entries(gameHeaders).map(([round, { title, subtitles }]) => (
          <ListItem
            nested
            key={round}
            sx={{ my: 1 }}
            startAction={
              <IconButton
                variant='plain'
                size='sm'
                color='neutral'
                onClick={() => setOpen({ ...open, [round]: !open[round] })}
              >
                <KeyboardArrowDown sx={{ transform: open[round] ? 'initial' : 'rotate(-90deg)' }} />
              </IconButton>
            }
          >
            <ListItem>
              <Typography
                level='inherit'
                sx={{
                  fontWeight: open[round] ? 'bold' : undefined,
                  color: open[round] ? 'text.primary' : 'inherit',
                }}
              >
                {title}
              </Typography>
            </ListItem>
            {open[round] && (
              <List sx={{ '--ListItem-paddingY': '0px' }}>
                {subtitles.map(([key, subtitle, _]) => (
                  <Link href={`#${round}-${key}`} key={key}>
                    <ListItem>
                      <ListItemButton>{subtitle}</ListItemButton>
                    </ListItem>
                  </Link>

                ))}
              </List>
            )}
          </ListItem>
        ))
        }
      </List>
    </Box>
  )
}