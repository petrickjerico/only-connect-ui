import { Box } from '@mui/joy';
import { VowelRound } from '../../utils/types/display';

export default function VowelDisplay({ data }: { data: VowelRound }) {
  console.log(data)
  return (
    <Box>
      This displays the Missing Vowels round.
    </Box>
  )
}