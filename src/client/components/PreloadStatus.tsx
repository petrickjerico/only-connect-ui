import { Typography, CircularProgress } from '@mui/joy'
import DoneRoundedIcon from '@mui/icons-material/DoneRounded'
import BlockRoundedIcon from '@mui/icons-material/BlockRounded'
import { useTranslation } from 'react-i18next'

export interface MediaPreload {
  count: number
  mediaSuccess: number[]
  mediaError: number[]
}

export default function PreloadStatus({ mediaPreload }: { mediaPreload: MediaPreload }) {
  const { t } = useTranslation()

  return (
    <Typography
      level='body-lg'
      position='absolute'
      gap={1}
      zIndex={11}
      sx={{ bottom: '4%' }}
      startDecorator={
        mediaPreload.mediaError.length > 0
          ? <BlockRoundedIcon color='error' />
          : mediaPreload.count < 4
            ? <CircularProgress color='primary' size='sm' variant='soft' thickness={4} />
            : <DoneRoundedIcon color='primary' />
      }>
      {
        mediaPreload.mediaError.length > 0
          ? `${t('clue_error')}: ${mediaPreload.mediaError.map((index) => `${t('clue')} ${index + 1}`).join(', ')}.`
          : mediaPreload.count < 4
            ? t('clue_loading')
            : t('clue_success')
      }
    </Typography>
  )
}