import { styled } from '@mui/system'
import { Box, Input } from '@mui/joy'
import { type ChangeEventHandler } from 'react'

export default function ClueBox({
  onChange,
  placeholder,
  height = 'tall',
}: {
  onChange: ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement> | undefined
  placeholder?: string
  height?: 'short' | 'tall'
}) {
  return (
    <Box height={height === 'tall' ? '128px' : ''} width='100%'>
      <StyledInput onChange={onChange} placeholder={placeholder} />
    </Box>
  )
}

const StyledInput = styled(Input)(() => ({
  input: {
    textAlign: 'center',
  },
  'input:focus::placeholder': {
    color: 'transparent',
  },
  overflow: 'clip',
  flexDirection: 'row',
  height: '100%',
}))
