import { Box, Input, styled } from '@mui/joy'
import { type ChangeEventHandler } from 'react'
import { getGroupColor } from '../utils/colors'

export default function ClueBox({
  onChange,
  placeholder,
  height = 'tall',
  colorid,
}: {
  onChange?: ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement> | undefined
  placeholder?: string
  height?: 'short' | 'tall'
  colorid?: string
}) {
  return (
    <Box height={height === 'tall' ? '128px' : ''} width='100%'>
      <StyledInput onChange={onChange} placeholder={placeholder} colorid={colorid} />
    </Box>
  )
}

const StyledInput = styled(Input)<{ colorid?: string }>(({ colorid }) => ({
  input: {
    textAlign: 'center',
  },
  'input:focus::placeholder': {
    color: 'transparent',
  },
  overflow: 'clip',
  flexDirection: 'row',
  height: '100%',
  backgroundColor: colorid ? getGroupColor(colorid) : undefined
}))
