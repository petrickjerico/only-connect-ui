import { styled } from '@mui/system'
import { Box, Input } from '@mui/joy'
import { type ChangeEventHandler } from 'react'

export default function DescriptionBox({
  onChange,
  placeholder
}: {
  onChange: ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement> | undefined,
  placeholder?: string
}) {
  return (
    <Box width='100%'>
      <StyledInput
        onChange={onChange}
        placeholder={placeholder}
      />
    </Box>
  )
}

const StyledInput = styled(Input)(() => ({
  'input': {
    textAlign: 'center'
  },
  'input:focus::placeholder': {
    color: 'transparent'
  },
}))
