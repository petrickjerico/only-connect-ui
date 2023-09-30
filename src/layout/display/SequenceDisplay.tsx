import { Box } from '@mui/joy';
import { SequenceRound } from '../../utils/types/display';

export default function SequenceDisplay({ data }: { data: SequenceRound }) {
  console.log(data)
  return (
    <Box>
      This displays the Sequences round.
    </Box>
  )
}