import { Box } from '@mui/joy';
import { ConnectionRound } from '../../utils/types/display';

export default function ConnectionDisplay({ data }: { data: ConnectionRound }) {
  console.log(data)
  return (
    <Box>
      This displays the Connections round.
    </Box>
  )
}