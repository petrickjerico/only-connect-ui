import { Stack, Typography } from '@mui/joy'
import CoverImage from '../../../assets/img/cover.png'
import { useTranslation } from 'react-i18next'
import TutorialModal from '../tutorials/TutorialModal'

export default function DisplayStartScreen() {
  const { t } = useTranslation()

  return (
    <Stack
      direction='row'
      alignItems='center'
      justifyContent='center'
      spacing={8}>
      <img src={CoverImage} width='15%' height='auto' />
      <Stack spacing={2} maxWidth='30%'>
        <Typography level='h1'>
          {t('welcome_title')}
        </Typography>
        <Typography level='body-lg'>
          {t('welcome_line1')}
        </Typography>
        <Typography level='body-lg'>
          {t('welcome_line2')}
        </Typography>
        <Typography level='body-lg' pb={2}>
          {t('welcome_line3')}
        </Typography>
        <TutorialModal />
      </Stack>
    </Stack>
  )
}