import { Box } from '@mui/joy';
import { VowelRound } from '../../utils/types/display';

export default function DisplayVowelRound({ data }: { data: VowelRound }) {
  console.log(data)
  return (
    <Box>
      {JSON.stringify(data)}
    </Box>
  )
}