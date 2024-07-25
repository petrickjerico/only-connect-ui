import { Snackbar, IconButton } from '@mui/joy'
import { useState, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { useHost } from '../../../utils/context/HostProvider'
import InfoRoundedIcon from '@mui/icons-material/InfoRounded'
import CloseRoundedIcon from '@mui/icons-material/CloseRounded'

export default function ReloadSnackBar() {
  const [open, setOpen] = useState<boolean>(true)
  const { t } = useTranslation()
  const { isNewGame } = useHost()

  useEffect(() => {
    if (isNewGame) {
      setOpen(true)
    }
  }, [isNewGame])

  return (
    <Snackbar
      size='md'
      autoHideDuration={5000}
      startDecorator={<InfoRoundedIcon />}
      endDecorator={
        <IconButton onClick={() => setOpen(false)}>
          <CloseRoundedIcon />
        </IconButton>
      }
      open={open}
      onClose={() => setOpen(false)}
      anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
    >
      {t('reload_message')}
    </Snackbar>
  )
}