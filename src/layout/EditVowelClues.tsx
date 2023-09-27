import ClueBox from '../components/ClueBox'
import ArrowForward from '@mui/icons-material/ArrowForward'
import { useState } from 'react'
import DescriptionBox from '../components/DescriptionBox'
import { Box, Stack } from '@mui/joy'

export default function EditVowelClues({
  group,
  descriptionPlaceholder,
}: {
  group: number
  descriptionPlaceholder: string
}) {
  const [answers, setAnswers] = useState({})
  return (
    <Stack
      spacing={2}
      justifyContent='center'
      alignItems='center'
      direction='column'
      display='flex'
    >
      <DescriptionBox
        onChange={(event) => {
          console.log(group)
          setAnswers({ ...answers, description: event.target.value })
        }}
        placeholder={descriptionPlaceholder}
      />
      {[1, 2, 3, 4].map((clue) => {
        return (
          <Stack key={clue} spacing={2} justifyContent='space-between' direction='row' width='100%'>
            <ClueBox
              placeholder={`Clue ${clue}`}
              height='short'
              onChange={(event) => {
                console.log(group)
                setAnswers({ ...answers, 1: event.target.value })
              }}
            />
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center'
              }}
            >
              <ArrowForward />
            </Box>
            <ClueBox
              placeholder={`Solution ${clue}`}
              height='short'
              onChange={(event) => {
                console.log(group)
                setAnswers({ ...answers, 2: event.target.value })
              }}
            />
          </Stack>
        )
      })}
    </Stack>
  )
}
