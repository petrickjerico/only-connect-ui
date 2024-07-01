import AccessTimeFilledRoundedIcon from '@mui/icons-material/AccessTimeFilledRounded'
import HelpRoundedIcon from '@mui/icons-material/HelpRounded'
import CheckCircleRoundedIcon from '@mui/icons-material/CheckCircleRounded'
import CancelRoundedIcon from '@mui/icons-material/CancelRounded'
import InfoRoundedIcon from '@mui/icons-material/InfoRounded'
import { Box, Button, Divider, Modal, ModalDialog, Stack, Typography } from '@mui/joy'
import { useState } from 'react'
import { VowelRound } from '../../utils/types/display'
import DisplayVowelRound from '../displays/DisplayVowelRound'
import { useTranslation } from 'react-i18next'
import i18n from '../../i18n'
import { stopAllBGM } from '../../utils/audios'

export default function VowelTutorial({ verbose }: { verbose?: boolean }) {
  console.log(verbose)

  const { t } = useTranslation()


  const data: Record<string, VowelRound> = {
    en: {
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
        clue4: 'G NDN DFR C',
        solution1: 'INDIA AND ASIA',
        solution2: 'INDONESIA AND ASIA',
        solution3: 'IRELAND AND EUROPE',
        solution4: 'UGANDA AND AFRICA',
        description: 'Countries and the continent they are in'
      }
    },
    id: {
      group1: {
        clue1: 'NTR M',
        clue2: 'KLM',
        clue3: 'MS',
        clue4: 'R GN',
        solution1: 'NATRIUM',
        solution2: 'KALIUM',
        solution3: 'EMAS',
        solution4: 'ARGON',
        description: 'Elemen dalam tabel periodik'
      },
      group2: {
        clue1: 'BL DNDNP SR',
        clue2: 'SM TRTR DNMDN',
        clue3: 'JWB RTD NBN DG',
        clue4: 'ML KDNM BN',
        solution1: 'BALI DAN DENPASAR',
        solution2: 'SUMATERA UTARA DAN MEDAN',
        solution3: 'JAWA BARAT DAN BANDUNG',
        solution4: 'MALUKU DAN AMBON',
        description: 'Provinsi Indonesia dan ibukotanya'
      }
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
          {t('round4_description_question')}
        </Typography>
        <Typography
          variant='plain'
          startDecorator={<AccessTimeFilledRoundedIcon />}
          whiteSpace='pre'
          flexWrap='wrap'
        >
          {t('round4_description_time')}
        </Typography>
        <Typography
          variant='plain'
          startDecorator={<CheckCircleRoundedIcon />}
          flexWrap='wrap'
        >
          {t('round4_description_win')}
        </Typography>
        <Typography
          variant='plain'
          startDecorator={<CancelRoundedIcon />}
          flexWrap='wrap'
        >
          {t('round4_description_lose')}
        </Typography>
        <Typography
          variant='plain'
          startDecorator={<InfoRoundedIcon />}
          flexWrap='wrap'
        >
          {t('round4_description_info')}
        </Typography>
        <Button sx={{ mt: 2, py: 2 }} onClick={() => setTrial(true)} variant='soft' size='lg'>
          {t('try_out')}
        </Button>
        <Modal open={trial} onClose={() => {
          setTrial(false)
          stopAllBGM()
        }}>
          <ModalDialog layout='fullscreen' sx={{ alignItems: 'center', justifyContent: 'center' }}>
            <Box width='100%' justifyContent='center' display='flex'>
              <DisplayVowelRound data={data[i18n.language]} />
            </Box>
          </ModalDialog>
        </Modal>
      </Stack >
      <Divider orientation='vertical' />
      <Stack spacing={2}>
        <Typography level='title-lg'>
          {t('round_description')}
        </Typography>
        {t('round4_description_paragraph')
          .split('\n')
          .map((line, key) => (
            <Typography key={key}>
              {line}
            </Typography>
          ))}
      </Stack>
    </Stack >
  )
}