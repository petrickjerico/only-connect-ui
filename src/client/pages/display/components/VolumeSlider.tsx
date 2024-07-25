import { Sheet, Slider, styled } from '@mui/joy'
import { useAudioTurn } from '../../../utils/context/AudioTurnProvider'
import VolumeUpRoundedIcon from '@mui/icons-material/VolumeUpRounded';

export default function VolumeSlider() {
  const { volume, setVolume } = useAudioTurn()

  return (
    <StyledSheet variant='soft'>
      <VolumeUpRoundedIcon />
      <Slider
        variant='soft'
        value={volume}
        defaultValue={volume}
        onChange={(_, value) => setVolume(value as number)}
        sx={{ marginX: '4px' }}
      />
    </StyledSheet>
  )
}

const StyledSheet = styled(Sheet)(() => ({
  display: 'flex',
  position: 'absolute',
  bottom: '2%',
  width: '15%',
  alignSelf: 'center',
  alignItems: 'center',
  padding: '0 16px ',
  borderRadius: '8px',
  gap: '8px'
}))