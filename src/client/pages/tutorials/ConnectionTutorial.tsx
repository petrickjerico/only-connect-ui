import AccessTimeFilledRoundedIcon from '@mui/icons-material/AccessTimeFilledRounded'
import HelpRoundedIcon from '@mui/icons-material/HelpRounded'
import CheckCircleRoundedIcon from '@mui/icons-material/CheckCircleRounded'
import CancelRoundedIcon from '@mui/icons-material/CancelRounded'
import InfoRoundedIcon from '@mui/icons-material/InfoRounded'
import { Button, Divider, Modal, ModalDialog, Stack, Typography } from '@mui/joy'
import { useState } from 'react'
import DisplayClues from '../../layout/display/DisplayClues'
import { ClueGroup } from '../../utils/types/display'

export default function ConnectionTutorial({ verbose }: { verbose?: boolean }) {
  console.log(verbose)

  const clues: ClueGroup = {
    clue1: 'Quark',
    clue2: 'Type of load',
    clue3: 'Paradise Falls',
    clue4: 'What Astley will never give you',
    description: 'Up'
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
          {'"'}What is the <b>connection</b>?{'"'}
        </Typography>
        <Typography
          variant='plain'
          startDecorator={<AccessTimeFilledRoundedIcon />}
          whiteSpace='pre'
          flexWrap='wrap'
        >
          40 seconds
        </Typography>
        <Typography
          variant='plain'
          startDecorator={<CheckCircleRoundedIcon />}
          flexWrap='wrap'
        >
          1-5 points
        </Typography>
        <Typography
          variant='plain'
          startDecorator={<CancelRoundedIcon />}
          flexWrap='wrap'
        >
          0 point (rival may steal)
        </Typography>
        <Typography
          variant='plain'
          startDecorator={<InfoRoundedIcon />}
          flexWrap='wrap'
        >
          All text / images / music
        </Typography>
        <Button sx={{ mt: 2, py: 2 }} onClick={() => setTrial(true)} variant='soft' size='lg'>
          Try out
        </Button>
        <Modal open={trial} onClose={() => setTrial(false)}>
          <ModalDialog layout='fullscreen' sx={{ justifyContent: 'center' }}>
            <DisplayClues groupKey={'group1'} data={clues} />
          </ModalDialog>
        </Modal>
      </Stack>
      <Divider orientation='vertical' />
      <Stack spacing={2}>
        <Typography level='h4'>
          Round Description
        </Typography>
        <Typography>
          Teams are given up to four clues and must try to figure out the connection between them within 40 seconds.
        </Typography>
        <Typography>
          The team is initially shown one clue, and may request the remaining three clues at any time within the 40
          seconds (they are not automatically shown). The team may press their buzzer to guess after the first clue for
          5 points, the second for 3, the third for 2, or the fourth for 1.
        </Typography>
        <Typography>
          If the team guesses incorrectly, fails to answer after buzzing in a timely manner, or fails to buzz within the
          time allotted, the opposing team is shown any remaining clues and can answer for a bonus point.
        </Typography>
        <Typography>
          Play then alternates until each team has played three sets of clues.
        </Typography>
        <Typography>
          Typically, one of the six puzzles involves pictures, and another uses pieces of music, both classical and contemporary.
        </Typography>
      </Stack>
    </Stack>
  )
}