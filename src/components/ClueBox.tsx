import { styled, Sheet, Textarea, Typography, TypographySystem } from '@mui/joy'
import { type ChangeEventHandler, useState } from 'react'
import { getGroupColor } from '../utils/colors'

export default function ClueBox({
  onChange,
  placeholder,
  height = 'tall',
  colorid,
  disabled,
  initialValue,
  editSize,
  displaySize = 'body-md'
}: {
  onChange?: ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement> | undefined
  placeholder?: string
  height?: 'short' | 'tall' | string
  colorid?: '1' | '2' | '3' | '4' | string
  disabled?: boolean
  initialValue?: string
  editSize?: 'sm' | 'md' | 'lg'
  displaySize?: keyof TypographySystem
}) {
  const [value, setValue] = useState<string>(initialValue ?? '')
  const [isEditing, setIsEditing] = useState<boolean>(false)

  return (
    <StyledDiv height={height}>
      <StyledSheet variant='outlined' colorid={colorid}>
        <Typography sx={{ whiteSpace: 'pre-line', padding: '4px' }} level={displaySize}>
          {value ? value : placeholder}
        </Typography>
      </StyledSheet>
      <StyledTextarea
        size={editSize}
        colorid={colorid}
        value={value}
        disabled={disabled}
        isediting={isEditing ? 'true' : 'false'}
        placeholder={placeholder}
        onFocus={() => setIsEditing(true)}
        onBlur={() => setIsEditing(false)}
        onChange={(event) => {
          setValue(event.target.value)
          if (onChange) onChange(event)
        }} />
    </StyledDiv>
  )
}

const StyledDiv = styled('div')<{ height: 'short' | 'tall' | string }>(({ height }) => ({
  width: '100%',
  height: height === 'tall' ? '128px' : height === 'short' ? '32px' : height,
  position: 'relative',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}))

const StyledSheet = styled(Sheet)<{ colorid?: string }>(({ colorid }) => ({
  height: '100%',
  width: '100%',
  textAlign: 'center',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  borderRadius: '6px',
  position: 'absolute',
  backgroundColor: colorid ? getGroupColor(colorid) : undefined
}))

const StyledTextarea = styled(Textarea)<{ isediting: string, colorid?: string }>(({ isediting, colorid }) => ({
  height: '100%',
  width: '100%',
  textAlign: 'center',
  position: 'absolute',
  zIndex: '1',
  opacity: isediting === 'true' ? 1 : 0,
  backgroundColor: colorid ? getGroupColor(colorid) : undefined,
}))