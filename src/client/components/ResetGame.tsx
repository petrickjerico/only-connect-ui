import { IconButton } from '@mui/joy';
import RestartAltRoundedIcon from '@mui/icons-material/RestartAltRounded';
import { useHostDispatch } from '../utils/context/HostProvider';
import { useNavigate } from 'react-router-dom';

export default function ResetGame() {
  const dispatch = useHostDispatch()
  const navigate = useNavigate()

  return (
    <IconButton
      variant='soft'
      onClick={() => {
        dispatch({ type: 'RESET_GAME' })
        navigate('start')
      }}>
      <RestartAltRoundedIcon />
    </IconButton>
  )
}