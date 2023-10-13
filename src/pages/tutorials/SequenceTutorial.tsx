import { Stack, Typography, Button, Modal, ModalDialog, Divider } from '@mui/joy'
import { useState } from 'react'
import DisplayClues from '../../layout/display/DisplayClues'
import { ClueGroup } from '../../utils/types/display'
import AccessTimeFilledRoundedIcon from '@mui/icons-material/AccessTimeFilledRounded'
import HelpRoundedIcon from '@mui/icons-material/HelpRounded'
import CheckCircleRoundedIcon from '@mui/icons-material/CheckCircleRounded'
import CancelRoundedIcon from '@mui/icons-material/CancelRounded'
import InfoRoundedIcon from '@mui/icons-material/InfoRounded'

export default function SequenceTutorial({ verbose }: { verbose?: boolean }) {
  console.log(verbose)

  const clues: ClueGroup = {
    clue1: 'November',
    clue2: 'Mike',
    clue3: 'Lima',
    clue4: 'Kilo',
    description: 'NATO alphabets in reverse order'
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
          {'"'}What comes <b>fourth</b>?{'"'}
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
          2-5 points
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
          All text / images (rarely music)
        </Typography>
        <Button sx={{ mt: 2, py: 2 }} onClick={() => setTrial(true)} variant='soft' size='lg'>
          Try out
        </Button>
        <Modal open={trial} onClose={() => setTrial(false)}>
          <ModalDialog layout='fullscreen' sx={{ justifyContent: 'center' }}>
            <DisplayClues groupKey={'group1'} data={clues} hideLast />
          </ModalDialog>
        </Modal>
      </Stack>
      <Divider orientation='vertical' />
      <Stack spacing={2}>
        <Typography level='h4'>
          Round Description
        </Typography>
        <Typography>
          In this round, each set of four clues forms a sequence.
          Teams may see a maximum of three clues, and must determine what would
          come fourth in the sequence within the 40 second time limit.
        </Typography>
        <Typography>
          As with the first round, teams score points dependent on the number of clues seen,
          and if they fail to guess correctly, it is thrown over to the other team, who can
          see any remaining clues and answer for a bonus point.
        </Typography>
        <Typography>
          Teams can score points without correctly identifying what the sequence is, but may
          be required to do so if the sequence is very specific.
        </Typography>
        <Typography>
          As in the previous round, one set of clues involves pictures, with teams describing the fourth
          picture in the sequence.
        </Typography>
      </Stack>
    </Stack>
  )
}