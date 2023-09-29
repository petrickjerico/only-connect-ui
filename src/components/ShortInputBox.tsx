import { Box, Input, colors, styled } from '@mui/joy'
import { type ChangeEventHandler } from 'react'
import { getGroupColor } from '../utils/colors'

export default function ShortInputBox({
  onChange,
  placeholder,
  colorId,
  size = 'md',
  textAlign
}: {
  onChange?: ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement> | undefined
  placeholder?: string
  colorId?: '1' | '2' | '3' | '4' | string
  size?: 'sm' | 'md' | 'lg'
  textAlign?: 'left' | 'center' | 'right'
}) {
  return (
    <Box width='100%'>
      <StyledInput
        colorid={colorId}
        textalign={textAlign}
        size={size}
        onChange={onChange}
        placeholder={placeholder}
      />
    </Box>
  )
}

const StyledInput = styled(Input)<{
  textalign?: 'left' | 'center' | 'right',
  colorid?: '1' | '2' | '3' | '4' | string
}>(({ textalign, colorid }) => ({
  'input': {
    textAlign: textalign ?? 'center',
  },
  'input::placeholder': {
    color: colors.grey[500],
    textAlign: textalign ?? 'center',
  },
  'input:focus::placeholder': {
    color: 'transparent'
  },
  backgroundColor: colorid ? getGroupColor(colorid) : undefined
}))
