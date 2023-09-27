import { Button, Stack } from '@mui/joy'
import { useState } from 'react'
import { styled } from '@mui/system'

export default function GroupSelection({
  onSelected,
}: {
  onSelected: (selection: number) => void
}) {
  const [selection, setSelection] = useState<number>(1)
  const selections = [
    [1, 2, 3],
    [4, 5, 6],
  ]

  return (
    <Stack spacing={1} direction='column' justifyContent='center'>
      {selections.map((row) => {
        return (
          <Stack key={row[0]} spacing={1} direction='row' justifyContent='center'>
            {row.map((col) => {
              return (
                <StyledButton
                  isSelected={col === selection}
                  key={col}
                  variant='outlined'
                  onClick={() => {
                    onSelected(col)
                    setSelection(col)
                  }}
                >
                  {col}
                </StyledButton>
              )
            })}
          </Stack>
        )
      })}
    </Stack>
  )
}

const StyledButton = styled(Button)<{ isSelected: boolean }>(({ theme, isSelected }) => ({
  backgroundColor: isSelected ? theme.palette.primary[100] : 'transparent',
}))
