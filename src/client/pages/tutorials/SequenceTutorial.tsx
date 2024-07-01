import { Stack, Typography, Button, Modal, ModalDialog, Divider } from '@mui/joy'
import { useState } from 'react'
import DisplayClues from '../../layout/display/DisplayClues'
import { ClueGroup } from '../../utils/types/display'
import AccessTimeFilledRoundedIcon from '@mui/icons-material/AccessTimeFilledRounded'
import HelpRoundedIcon from '@mui/icons-material/HelpRounded'
import CheckCircleRoundedIcon from '@mui/icons-material/CheckCircleRounded'
import CancelRoundedIcon from '@mui/icons-material/CancelRounded'
import InfoRoundedIcon from '@mui/icons-material/InfoRounded'
import { useTranslation } from 'react-i18next'
import { stopAudio } from '../../utils/audios'
import { CluesBGM } from '../../../assets/audios'

export default function SequenceTutorial({ verbose }: { verbose?: boolean }) {
  console.log(verbose)

  const { t, i18n } = useTranslation()

  const clues: Record<string, ClueGroup> = {
    en: {
      clue1: 'November',
      clue2: 'Mike',
      clue3: 'Lima',
      clue4: 'Kilo',
      description: 'NATO alphabets in reverse order'
    },
    id: {
      clue1: 'Januari',
      clue2: 'Juli',
      clue3: 'Juni',
      clue4: 'Maret',
      description: 'Bulan dalam urutan alfabet'
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
          {t('round2_description_question')}
        </Typography>
        <Typography
          variant='plain'
          startDecorator={<AccessTimeFilledRoundedIcon />}
          whiteSpace='pre'
          flexWrap='wrap'
        >
          {t('round2_description_time')}
        </Typography>
        <Typography
          variant='plain'
          startDecorator={<CheckCircleRoundedIcon />}
          flexWrap='wrap'
        >
          {t('round2_description_win')}
        </Typography>
        <Typography
          variant='plain'
          startDecorator={<CancelRoundedIcon />}
          flexWrap='wrap'
        >
          {t('round2_description_lose')}
        </Typography>
        <Typography
          variant='plain'
          startDecorator={<InfoRoundedIcon />}
          flexWrap='wrap'
        >
          {t('round2_description_info')}
        </Typography>
        <Button
          sx={{ mt: 2, py: 2 }}
          onClick={() => setTrial(true)}
          variant='soft'
          size='lg'>
          {t('try_out')}
        </Button>
        <Modal open={trial} onClose={() => {
          setTrial(false)
          stopAudio(CluesBGM)
        }}>
          <ModalDialog layout='fullscreen' sx={{ justifyContent: 'center' }}>
            <DisplayClues groupKey={'group1'} data={clues[i18n.language]} hideLast />
          </ModalDialog>
        </Modal>
      </Stack>
      <Divider orientation='vertical' />
      <Stack spacing={2}>
        <Typography level='title-lg'>
          {t('round_description')}
        </Typography>
        {t('round2_description_paragraph')
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