import AccessTimeFilledRoundedIcon from '@mui/icons-material/AccessTimeFilledRounded'
import HelpRoundedIcon from '@mui/icons-material/HelpRounded'
import CheckCircleRoundedIcon from '@mui/icons-material/CheckCircleRounded'
import CancelRoundedIcon from '@mui/icons-material/CancelRounded'
import InfoRoundedIcon from '@mui/icons-material/InfoRounded'
import { Button, Divider, Modal, ModalDialog, Stack, Typography } from '@mui/joy'
import { useState } from 'react'
import { WallGroup } from '../../utils/types/display'
import DisplayWall from '../../layout/display/DisplayWall'
import { useTranslation } from 'react-i18next'
import { stopAudio } from '../../utils/audios'
import { WallBGM } from '../../../assets/audios'

export default function WallTutorial({ verbose }: { verbose?: boolean }) {
  console.log(verbose)

  const { t, i18n } = useTranslation()


  const data: Record<string, WallGroup> = {
    en: {
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
        description: 'Letter homophones'
      },
      group4: {
        clue1: 'Ewe',
        clue2: 'Bee',
        clue3: 'Jay',
        clue4: 'Doe',
        description: 'Animals'
      }
    }, id: {
      group1: {
        clue1: 'Lambung',
        clue2: 'Usus',
        clue3: 'Ginjal',
        clue4: 'Pankreas',
        description: 'Organ tubuh'
      },
      group2: {
        clue1: 'Hati',
        clue2: 'Sekop',
        clue3: 'Keriting',
        clue4: 'Wajik',
        description: 'Lambang kartu main'
      },
      group3: {
        clue1: 'Otak',
        clue2: 'Gado',
        clue3: 'Bala',
        clue4: 'Ongol',
        description: 'Diulang jadi makanan'
      },
      group4: {
        clue1: 'Kepang',
        clue2: 'Kribo',
        clue3: 'Cepak',
        clue4: 'Botak',
        description: 'Gaya rambut'
      }
    }
  }

  const [trial, setTrial] = useState<boolean>(false)

  return (
    <Stack direction='row' spacing={2} >
      <Stack minWidth='25%'>
        <Typography level='h4' pb={2}>
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
            <DisplayWall groupKey='group2' data={data[i18n.language]} />
          </ModalDialog>
        </Modal>
      </Stack>
      <Divider orientation='vertical' />
      <Stack spacing={2}>
        <Typography level='h4'>
          {t('round_description')}
        </Typography>
        {t('round3_description_paragraph')
          .split('\n')
          .map((line, key) => (
            <Typography key={key} level={line.split(' ')[0] === 'Part' ? 'title-lg' : undefined}>
              {line}
            </Typography>
          ))}
      </Stack>
    </Stack>
  )
}