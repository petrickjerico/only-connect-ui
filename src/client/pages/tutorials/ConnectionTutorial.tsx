import AccessTimeFilledRoundedIcon from '@mui/icons-material/AccessTimeFilledRounded'
import HelpRoundedIcon from '@mui/icons-material/HelpRounded'
import CheckCircleRoundedIcon from '@mui/icons-material/CheckCircleRounded'
import CancelRoundedIcon from '@mui/icons-material/CancelRounded'
import InfoRoundedIcon from '@mui/icons-material/InfoRounded'
import { Button, Divider, Modal, ModalDialog, Stack, Typography } from '@mui/joy'
import { useState } from 'react'
import DisplayClues from '../../layout/display/DisplayClues'
import { ClueGroup } from '../../utils/types/display'
import { useTranslation } from 'react-i18next'
import { stopAudio } from '../../utils/audios'
import { CluesBGM } from '../../../assets/audios'

export default function ConnectionTutorial({ verbose }: { verbose?: boolean }) {
  console.log(verbose)

  const { t, i18n } = useTranslation()

  const clues: Record<string, ClueGroup> = {
    en: {
      clue1: 'Quark',
      clue2: 'Type of load',
      clue3: 'Paradise Falls',
      clue4: 'What Astley will never give you',
      description: 'Up'
    },
    id: {
      clue1: 'Zodiak April-Mei',
      clue2: 'Mobil mewah',
      clue3: 'Minuman energi',
      clue4: 'Sila ke-4',
      description: 'Banteng'
    }
  }

  const [trial, setTrial] = useState<boolean>(false)

  return (
    <Stack direction='row' spacing={2} >
      <Stack minWidth='25%'>
        <Typography level='title-lg' pb={2}>
          {t('quick_glance')}
        </Typography>
        <Typography
          variant='plain'
          startDecorator={<HelpRoundedIcon />}
          whiteSpace='pre'
          flexWrap='wrap'
        >
          {t('round1_description_question')}
        </Typography>
        <Typography
          variant='plain'
          startDecorator={<AccessTimeFilledRoundedIcon />}
          whiteSpace='pre'
          flexWrap='wrap'
        >
          {t('round1_description_time')}
        </Typography>
        <Typography
          variant='plain'
          startDecorator={<CheckCircleRoundedIcon />}
          flexWrap='wrap'
        >
          {t('round1_description_win')}
        </Typography>
        <Typography
          variant='plain'
          startDecorator={<CancelRoundedIcon />}
          flexWrap='wrap'
        >
          {t('round1_description_lose')}
        </Typography>
        <Typography
          variant='plain'
          startDecorator={<InfoRoundedIcon />}
          flexWrap='wrap'
        >
          {t('round1_description_info')}
        </Typography>
        <Button sx={{ mt: 2, py: 2 }} onClick={() => setTrial(true)} variant='soft' size='lg'>
          {t('try_out')}
        </Button>
        <Modal open={trial} onClose={() => {
          setTrial(false)
          stopAudio(CluesBGM)
        }}>
          <ModalDialog layout='fullscreen' sx={{ justifyContent: 'center' }}>
            <DisplayClues groupKey={'group1'} data={clues[i18n.language]} />
          </ModalDialog>
        </Modal>
      </Stack>
      <Divider orientation='vertical' />
      <Stack spacing={2}>
        <Typography level='title-lg'>
          {t('round_description')}
        </Typography>
        {t('round1_description_paragraph')
          .split('\n')
          .map((line, key) => (
            <Typography key={key}>
              {line}
            </Typography>
          ))}
      </Stack>
    </Stack>
  )
}