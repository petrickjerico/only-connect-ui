import { Snackbar, Stepper, Step, StepIndicator } from '@mui/joy'
import { useState, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { useHost } from '../../../utils/context/HostProvider'

export default function LevelStepperSnackBar({ currId }: { currId: number }) {
  const [open, setOpen] = useState<boolean>(true)
  const { t } = useTranslation()
  const { isNewGame } = useHost()

  useEffect(() => {
    setOpen(isNewGame)
  }, [isNewGame])

  useEffect(() => {
    setOpen(1 <= currId && currId <= 4)
  }, [currId])

  return (
    <Snackbar
      autoHideDuration={5000}
      anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      sx={{ width: '50%' }}
      open={open}
      onClose={(_, reason) => {
        reason != 'clickaway' && setOpen(false)
      }}
    >
      <Stepper sx={{ width: '100%' }}>
        {['connections', 'sequences', 'connecting_walls', 'missing_vowels'].map((title, index) =>
          <Step
            sx={{ opacity: index === currId - 1 ? '100%' : index < currId - 1 ? '25%' : '75%' }}
            key={title}
            orientation='vertical'
            indicator={
              <StepIndicator
                variant={index < currId ? 'soft' : 'outlined'}
                color={index === currId - 1 ? 'primary' : 'neutral'}
              >
                {index + 1}
              </StepIndicator>
            }
          >
            {t(title)}
          </Step>
        )}
      </Stepper>
    </Snackbar>
  )
}