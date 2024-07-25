import { Input, Sheet, Typography, TypographySystem, colors, styled } from '@mui/joy'
import { useState, type ChangeEventHandler } from 'react'
import { getGroupColor } from '../../../utils/colors'
import { useGame } from '../../../utils/context/GameProvider'

export default function ShortInputBox({
  onChange,
  upperCase = false,
  placeholder,
  height = 'short',
  colorId,
  editSize,
  displaySize = 'body-md',
  clueKey,
  textAlign = 'center'
}: {
  onChange?: ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement> | undefined
  placeholder?: string
  upperCase?: boolean
  height?: 'short' | 'tall' | string
  colorId?: '1' | '2' | '3' | '4' | string
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
          px={1}
          noWrap
          textOverflow='ellipsis'
          sx={{ color: `${value ? undefined : colors.grey[400]}` }} >
          {value ? value : placeholder}
        </Typography>
      </StyledSheet>
      <StyledInput
        textalign={textAlign}
        isediting={isEditing ? 'true' : 'false'}
        colorid={colorId}
        value={value}
        size={editSize}
        onFocus={() => setIsEditing(true)}
        onBlur={() => setIsEditing(false)}
        onChange={(event) => {
          if (upperCase) event.target.value = event.target.value.toUpperCase()
          if (onChange) onChange(event)
        }}
        placeholder={placeholder}
      />
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

const StyledInput = styled(Input)<{ isediting: string, colorid?: string, textalign?: 'left' | 'center' | 'right' }>(({ isediting, colorid, textalign }) => ({
  'input::placeholder': {
    color: colors.grey[500]
  },
  'input:focus::placeholder': {
    color: 'transparent'
  },
  'input': {
    textAlign: textalign ?? 'center',
  },
  height: '100%',
  width: '100%',
  position: 'absolute',
  zIndex: '1',
  opacity: isediting === 'true' ? 1 : 0,
  backgroundColor: colorid ? getGroupColor(colorid) : undefined,
}))