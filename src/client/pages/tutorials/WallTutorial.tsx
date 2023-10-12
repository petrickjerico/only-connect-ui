import AccessTimeFilledRoundedIcon from '@mui/icons-material/AccessTimeFilledRounded'
import HelpRoundedIcon from '@mui/icons-material/HelpRounded'
import CheckCircleRoundedIcon from '@mui/icons-material/CheckCircleRounded'
import CancelRoundedIcon from '@mui/icons-material/CancelRounded'
import InfoRoundedIcon from '@mui/icons-material/InfoRounded'
import { Button, Divider, Modal, ModalDialog, Stack, Typography } from '@mui/joy'
import { useState } from 'react'
import { WallGroup } from '../../utils/types/display'
import DisplayWall from '../../layout/display/DisplayWall'

export default function WallTutorial({ verbose }: { verbose?: boolean }) {
  console.log(verbose)

  const data: WallGroup = {
    group1: {
      clue1: 'Brain',
      clue2: 'Stomach',
      clue3: 'Lung',
      clue4: 'Kidney',
      description: 'Body organs'
    },
    group2: {
      clue1: 'Heart',
      clue2: 'Spade',
      clue3: 'Club',
      clue4: 'Diamond',
      description: 'Card suits'
    },
    group3: {
      clue1: 'Eye',
      clue2: 'Tea',
      clue3: 'Axe',
      clue4: 'Cue',
      description: 'Letter homonyms'
    },
    group4: {
      clue1: 'Ewe',
      clue2: 'Bee',
      clue3: 'Jay',
      clue4: 'Doe',
      description: 'Animals'
    }
  }

  const [trial, setTrial] = useState<boolean>(false)

  return (
    <Stack direction='row' spacing={2} >
      <Stack minWidth='25%'>
        <Typography level='h4' pb={2}>
          Quick Glance
        </Typography>
        <Typography
          variant='plain'
          startDecorator={<HelpRoundedIcon />}
          whiteSpace='pre'
          flexWrap='wrap'
        >
          {'"'}What are the <b>groups</b>?{'"'}
        </Typography>
        <Typography
          variant='plain'
          startDecorator={<AccessTimeFilledRoundedIcon />}
          whiteSpace='pre'
          flexWrap='wrap'
        >
          2 minutes 30 seconds
        </Typography>
        <Typography
          variant='plain'
          startDecorator={<CheckCircleRoundedIcon />}
          flexWrap='wrap'
        >
          max. 10 points
        </Typography>
        <Typography
          variant='plain'
          startDecorator={<CancelRoundedIcon />}
          flexWrap='wrap'
        >
          No steals
        </Typography>
        <Typography
          variant='plain'
          startDecorator={<InfoRoundedIcon />}
          flexWrap='wrap'
        >
          All text; 3 lives after 2 groups
        </Typography>
        <Button sx={{ mt: 2, py: 2 }} onClick={() => setTrial(true)} variant='soft' size='lg'>
          Try out
        </Button>
        <Modal open={trial} onClose={() => setTrial(false)}>
          <ModalDialog layout='fullscreen' sx={{ justifyContent: 'center' }}>
            <DisplayWall groupKey='group2' data={data} />
          </ModalDialog>
        </Modal>
      </Stack>
      <Divider orientation='vertical' />
      <Stack spacing={2}>
        <Typography level='h4'>
          Round Description
        </Typography>
        <Typography>
          In this round, each team receives a wall of 16 clues and are given 2
          minutes and 30 seconds to sort them into four groups of four connected items.
          They will then identify the connection in each group.
        </Typography>
        <Typography>
          No stealing happens in this round.
        </Typography>
        <Typography level='title-lg'>
          Part 1: Sort clues into groups
        </Typography>
        <Typography>
          Teams create groups one at a time, and may make unlimited guesses before finding two complete groups.
          Once two groups are found, only three chances are given to find the remaining two groups before the wall freezes, even if time remains.
        </Typography>
        <Typography>
          There may be red herrings, but there is only one perfect solution for each wall.
        </Typography>
        <Typography>
          Once all groups are found, time is out, or all three lives are down, the team scores 1 point for each group found within 2 minutes 30 seconds.
        </Typography>
        <Typography level='title-lg'>
          Part 2: Define the connection
        </Typography>
        <Typography>
          The team will then be asked to define the connection in the group(s) they found. Any groups not found will be shown, and their connections will also be asked for.
        </Typography>
        <Typography>
          The team scores 1 point for correctly identifying the connections in each group, including the groups they failed to find.
        </Typography>
        <Typography>
          If a team finds all four groups and correctly identifies all four connections, they are awarded 2 bonus points, for a maximum total of 10 points.
        </Typography>
      </Stack>
    </Stack>
  )
}