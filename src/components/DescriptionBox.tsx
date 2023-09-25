import { styled } from '@mui/system'
import { Box, TextField } from '@mui/material'
import { type ChangeEventHandler } from 'react'

export default function DescriptionBox ({ onChange, placeholder }: { onChange: ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement> | undefined, placeholder?: string }) {
  // const [placeholderText, setPlaceholderText] = useState<string>(placeholder ?? '')
  return (
    <Box width='800px' display='flex'>
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
  flexDirection: 'column',
  width: '100%'
}))
