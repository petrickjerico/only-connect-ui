import LinearProgress from '@mui/joy/LinearProgress'
import Typography from '@mui/joy/Typography'
import { useCountUp } from 'use-count-up'

export default function LinearTimer({
  isCounting,
  duration,
  text,
  isVisible,
  isEnd,
  onComplete
}: {
  isCounting: boolean,
  duration: number,
  text?: string,
  isVisible: boolean
  isEnd: boolean
  onComplete: () => void
}) {
  const { value } = useCountUp({
    isCounting: isCounting,
    duration: duration,
    decimalPlaces: 1,
    easing: 'linear',
    start: isEnd ? 0 : 100,
    end: 0,
    onComplete: onComplete,
  })

  function getColor() {
    return Number(value) === 0 ? 'neutral' : Number(value) > 25 ? 'primary' : 'danger'
  }

  return (
    <LinearProgress
      determinate
      variant="soft"
      color={getColor()}
      value={Number(value!)}
      thickness={32}
      sx={{
        opacity: isVisible ? 1 : 0,
        transform: 'rotate(180deg)',
        overflow: 'clip',
        ['::before']: {
          opacity: 0.2
        }
      }}
    >
      <Typography
        level="body-lg"
        fontWeight="md"
        sx={{
          transform: 'rotate(180deg)'
        }}
      >
        {text}
      </Typography>
    </LinearProgress>
  )
}