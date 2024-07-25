import { styled, Sheet, Textarea, Typography, TypographySystem, colors } from '@mui/joy'
import { type ChangeEventHandler, useState } from 'react'
import { getGroupColor } from '../../../utils/colors'
import { useGame } from '../../../utils/context/GameProvider'

export default function ClueBox({
  onChange,
  placeholder,
  height = 'tall',
  colorId,
  disabled,
  editSize,
  displaySize = 'body-md',
  clueKey,
  textAlign
}: {
  onChange?: ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement> | undefined
  placeholder?: string
  height?: 'short' | 'tall' | string
  colorId?: '1' | '2' | '3' | '4' | string
  disabled?: boolean
  initialValue?: string
  editSize?: 'sm' | 'md' | 'lg'
  displaySize?: keyof TypographySystem
  textAlign?: 'left' | 'center' | 'right'
  clueKey: string
}) {
  const gameState = useGame()
  const value = gameState.game[`${clueKey}`]?.value ?? ''
  const [isEditing, setIsEditing] = useState<boolean>(false)

  return (
    <StyledDiv height={height}>
      <StyledSheet variant='outlined' colorid={colorId}>
        <Typography
          textAlign={textAlign}
          level={displaySize}
          whiteSpace='pre-line'
          p='4px'
          noWrap
          textOverflow='ellipsis'
          sx={{ color: `${value ? undefined : colors.grey[400]}` }} >
          {value ? value : placeholder}
        </Typography>
      </StyledSheet>
      <StyledTextarea
        size={editSize}
        colorid={colorId}
        disabled={disabled}
        isediting={isEditing ? 'true' : 'false'}
        onFocus={() => setIsEditing(true)}
        onBlur={() => setIsEditing(false)}
        onChange={(event) => {
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
  'textarea::placeholder': {
    color: colors.grey[500]
  },
  height: '100%',
  width: '100%',
  textAlign: 'center',
  position: 'absolute',
  zIndex: '1',
  opacity: isediting === 'true' ? 1 : 0,
  backgroundColor: colorid ? getGroupColor(colorid) : undefined,
}))