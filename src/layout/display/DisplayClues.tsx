import { Box, Stack } from '@mui/joy'
import { ClueGroup } from '../../utils/types/display'
import DisplayClueBox from '../../components/DisplayClueBox'
import DisplayDescriptionBox from '../../components/DisplayDescriptionBox'

export default function DisplayClues({ data, hideLast }: { data: ClueGroup, hideLast?: boolean }) {
  const clues = Object.entries(data).filter(([key]) => key !== 'description')
  const description = data.description

  return (
    <Box alignItems='center' justifyContent='center' px={4}>
      <Stack gap={2}>
        <Stack direction='row' gap={2}>
          {clues.map(([key, value]) => (
            <DisplayClueBox key={key} clue={hideLast ? '?' : value} />
          ))}
        </Stack>
        <DisplayDescriptionBox description={description} />
      </Stack >
    </Box >
  )
}