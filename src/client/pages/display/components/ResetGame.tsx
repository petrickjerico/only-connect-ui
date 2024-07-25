import { IconButton } from '@mui/joy';
import RestartAltRoundedIcon from '@mui/icons-material/RestartAltRounded';
import { useHostDispatch } from '../../../utils/context/HostProvider';

export default function ResetGame() {
  const dispatch = useHostDispatch()

  return (
    <IconButton
      variant='soft'
      onClick={() => dispatch({ type: 'RESET_GAME' })}>
      <RestartAltRoundedIcon />
    </IconButton>
  )
}