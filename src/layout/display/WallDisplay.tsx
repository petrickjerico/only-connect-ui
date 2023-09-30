import { Box } from '@mui/joy';
import { WallRound } from '../../utils/types/display';

export default function WallDisplay({ data }: { data: WallRound }) {
  console.log(data)
  return (
    <Box>
      This displays the Connecting Wall round.
    </Box>
  )
}