import { styled } from '@mui/system'
import { Box, TextField } from '@mui/material'
import { type ChangeEventHandler } from 'react'

export default function ClueBox({
  onChange,
  placeholder
}: {
  onChange: ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement> | undefined,
  placeholder?: string
}) {
  return (
    <Box height="128px" display="flex">
      <StyledTextField
        onChange={onChange}
        multiline
        placeholder={placeholder}
      />
    </Box>
  )
}

const StyledTextField = styled(TextField)(({ theme }) => ({
  '& .MuiInputBase-input': {
    textAlign: 'center'
  },
  '& .MuiInputBase-input:focus::placeholder': {
    color: 'transparent'
  },
  overflow: 'clip',
  flexDirection: 'row',
  height: '100%'
}))
