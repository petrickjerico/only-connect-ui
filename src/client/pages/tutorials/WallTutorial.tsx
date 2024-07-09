import AccessTimeFilledRoundedIcon from '@mui/icons-material/AccessTimeFilledRounded'
import HelpRoundedIcon from '@mui/icons-material/HelpRounded'
import CheckCircleRoundedIcon from '@mui/icons-material/CheckCircleRounded'
import CancelRoundedIcon from '@mui/icons-material/CancelRounded'
import InfoRoundedIcon from '@mui/icons-material/InfoRounded'
import { Button, Divider, Modal, ModalDialog, Stack, Typography } from '@mui/joy'
import { useState } from 'react'
import DisplayWall from '../../layout/display/DisplayWall'
import { useTranslation } from 'react-i18next'
import { stopAudio } from '../../utils/audios'
import { WallBGM } from '../../../assets/audios'
import { getTutorial } from '../../utils/tutorials'

export default function WallTutorial({ verbose }: { verbose?: boolean }) {
  console.log(verbose)

  const { t, i18n } = useTranslation()
  const { wallTutorial } = getTutorial(i18n.language)
  const [trial, setTrial] = useState<boolean>(false)

  return (
    <Stack direction='row' spacing={2} >
      <Stack minWidth='35%'>
        <Typography level='title-lg' pb={2}>
          {t('quick_glance')}
        </Typography>
        <Typography
          variant='plain'
          startDecorator={<HelpRoundedIcon />}
          whiteSpace='pre'
          flexWrap='wrap'
        >
          {t('round3_description_question')}
        </Typography>
        <Typography
          variant='plain'
          startDecorator={<AccessTimeFilledRoundedIcon />}
          whiteSpace='pre'
          flexWrap='wrap'
        >
          {t('round3_description_time')}
        </Typography>
        <Typography
          variant='plain'
          startDecorator={<CheckCircleRoundedIcon />}
          flexWrap='wrap'
        >
          {t('round3_description_win')}
        </Typography>
        <Typography
          variant='plain'
          startDecorator={<CancelRoundedIcon />}
          flexWrap='wrap'
        >
          {t('round3_description_lose')}
        </Typography>
        <Typography
          variant='plain'
          startDecorator={<InfoRoundedIcon />}
          flexWrap='wrap'
        >
          {t('round3_description_info')}
        </Typography>
        <Button sx={{ mt: 2, py: 2 }} onClick={() => setTrial(true)} variant='soft' size='lg'>
          {t('try_out')}
        </Button>
        <Modal open={trial} onClose={() => {
          setTrial(false)
          stopAudio(WallBGM)
        }}>
          <ModalDialog layout='fullscreen' sx={{ justifyContent: 'center' }}>
            <DisplayWall groupKey='group2' data={wallTutorial} />
          </ModalDialog>
        </Modal>
      </Stack>
      <Divider orientation='vertical' />
      <Stack spacing={2}>
        <Typography level='title-lg'>
          {t('round_description')}
        </Typography>
        {t('round3_description_paragraph')
          .split('\n')
          .map((line, key) => (
            <Typography key={key} level={line.split(' ')[0] === 'Part' ? 'title-md' : undefined}>
              {line}
            </Typography>
          ))}
      </Stack>
    </Stack>
  )
}