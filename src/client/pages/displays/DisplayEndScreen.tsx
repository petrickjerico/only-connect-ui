import { Stack, Typography } from '@mui/joy'
import CoverImage from '../../../assets/img/cover.png'
import { useTranslation } from 'react-i18next'

export default function DisplayEndScreen() {
  const { t } = useTranslation()
  return (
    <Stack
      direction='row'
      alignItems='center'
      justifyContent='center'
      spacing={8}
    >
      <img src={CoverImage} width='20%' height='auto' />
      <Stack spacing={2} maxWidth='30%'>
        <Typography level='h1'>
          {t('end_title')}
        </Typography>
        <Typography level='body-lg'>
          {t('end_message')}
        </Typography>
      </Stack>
    </Stack>
  )
}