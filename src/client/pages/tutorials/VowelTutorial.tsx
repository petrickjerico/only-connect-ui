import AccessTimeFilledRoundedIcon from '@mui/icons-material/AccessTimeFilledRounded'
import HelpRoundedIcon from '@mui/icons-material/HelpRounded'
import CheckCircleRoundedIcon from '@mui/icons-material/CheckCircleRounded'
import CancelRoundedIcon from '@mui/icons-material/CancelRounded'
import InfoRoundedIcon from '@mui/icons-material/InfoRounded'
import { Box, Button, Divider, Modal, ModalDialog, Stack, Typography } from '@mui/joy'
import { useState } from 'react'
import { VowelRound } from '../../utils/types/display'
import DisplayVowelRound from '../displays/DisplayVowelRound'

export default function VowelTutorial({ verbose }: { verbose?: boolean }) {
  console.log(verbose)

  const data: VowelRound = {
    group1: {
      clue1: 'DN',
      clue2: 'ND M',
      clue3: 'TN',
      clue4: 'RG N',
      solution1: 'IODINE',
      solution2: 'INDIUM',
      solution3: 'TIN',
      solution4: 'ARGON',
      description: 'Elements in the periodic table'
    },
    group2: {
      clue1: 'ND ND S',
      clue2: 'N DNS NDS',
      clue3: 'RL NDND RP',
      clue4: 'VC TRN DST RL',
      solution1: 'INDIA AND ASIA',
      solution2: 'INDONESIA AND ASIA',
      solution3: 'IRELAND AND EUROPE',
      solution4: 'VICTORIA AND AUSTRALIA',
      description: 'Countries and the continent they are in'
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
          {'"'}What is the <b>phrase</b>?{'"'}
        </Typography>
        <Typography
          variant='plain'
          startDecorator={<AccessTimeFilledRoundedIcon />}
          whiteSpace='pre'
          flexWrap='wrap'
        >
          90 seconds - 3 minutes
        </Typography>
        <Typography
          variant='plain'
          startDecorator={<CheckCircleRoundedIcon />}
          flexWrap='wrap'
        >
          +1 point (if correct)
        </Typography>
        <Typography
          variant='plain'
          startDecorator={<CancelRoundedIcon />}
          flexWrap='wrap'
        >
          -1 point (if incorrect)
        </Typography>
        <Typography
          variant='plain'
          startDecorator={<InfoRoundedIcon />}
          flexWrap='wrap'
        >
          All text
        </Typography>
        <Button sx={{ mt: 2, py: 2 }} onClick={() => setTrial(true)} variant='soft' size='lg'>
          Try out
        </Button>
        <Modal open={trial} onClose={() => setTrial(false)}>
          <ModalDialog layout='fullscreen' sx={{ alignItems: 'center', justifyContent: 'center' }}>
            <Box width='100%' justifyContent='center' display='flex'>
              <DisplayVowelRound data={data} />
            </Box>
          </ModalDialog>
        </Modal>
      </Stack >
      <Divider orientation='vertical' />
      <Stack spacing={2}>
        <Typography level='h4'>
          Round Description
        </Typography>
        <Typography>
          In a final buzzer round, the teams are presented with a series of word puzzles.
          The category of the puzzles is given before they are displayed, and each category contains a
          maximum of four puzzles. Each puzzle is a word or phrase with the vowels removed and the
          spaces shifted to disguise the original words.
        </Typography>
        <Typography>
          Teams answer simultaneously using buzzers, and score 1 point for each puzzle they solve.
          Otherwise, teams face a penalty of 1 point for each incorrect answer.
        </Typography>
        <Typography>
          If the team that buzzes provides an incorrect answer (even by a single letter) or fails to answer quickly,
          the opposing team is given an opportunity to answer for a bonus point.
        </Typography>
        <Typography>
          The round lasts for between 90 seconds and three minutes.
        </Typography>
      </Stack>
    </Stack >
  )
}