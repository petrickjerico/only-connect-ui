import { Modal, ModalDialog, Sheet, Typography, styled, useColorScheme } from '@mui/joy'
import Gramophone from '../../assets/img/music.png'
import { useState } from 'react'

export default function DisplayClueBox({
  clue,
  height = 'tall',
  clueType,
  isTransparent,
  fontSize,
  fontWeight,
  wordSpacing,
  onFinishedPreloading,
  onErrorPreloading
}: {
  clue: string,
  height?: 'short' | 'tall' | string
  clueType?: 'audio' | 'image'
  isTransparent?: boolean
  fontSize?: number
  fontWeight?: number
  wordSpacing?: string
  onFinishedPreloading?: () => void
  onErrorPreloading?: () => void
}) {
  const [enlargePicture, setEnlargePicture] = useState<boolean>(false)
  const { mode } = useColorScheme()

  return (
    <StyledSheet
      variant='soft'
      height={height}
      z={clueType === 'audio' || clueType === 'image' ? 1 : 0}
      sx={(theme) => ({
        backgroundColor: isTransparent ? 'transparent' : `${theme.vars.palette.primary.softBg}`
      })}>
      {clueType === 'audio' && (
        <img
          width='150px'
          height='auto'
          src={Gramophone}
          alt={clue}
          draggable={false}
          style={{ opacity: isTransparent ? 0.1 : 0.75 }}
          title={mode === 'dark' ? 'invert' : undefined}
          className={mode === 'dark' ? 'invert' : undefined}
        />)}
      {clueType === 'image' && (
        <img
          onClick={() => setEnlargePicture(true)}
          src={clue}
          alt={clue}
          draggable={false}
          style={{
            opacity: isTransparent ? 0.1 : 1,
            maxHeight: '100%',
            minHeight: '100%'
          }}
          onLoad={onFinishedPreloading}
          onError={onErrorPreloading}
        />)}
      {!clueType && (
        <Typography
          level='h1'
          px='4px'
          whiteSpace='pre-line'
          fontSize={fontSize}
          fontWeight={fontWeight}
          sx={{
            wordSpacing: wordSpacing
          }}>
          {clue}
        </Typography>)}
      {clueType === 'image' && (
        <Modal open={enlargePicture} onClose={() => setEnlargePicture(false)}>
          <ModalDialog layout='center' sx={{ justifyContent: 'center' }}>
            <img
              src={clue}
              alt={clue}
              draggable={false}
              style={{
                maxHeight: '100%',
                minHeight: '100%'
              }}
            />
          </ModalDialog>
        </Modal>)}
    </StyledSheet>
  )
}

const StyledSheet = styled(Sheet)<{
  height?: 'short' | 'tall' | string,
  z?: number
}>(({
  height,
  z
}) => ({
  display: 'flex',
  height: height === 'tall' ? '200px' : height === 'short' ? '100px' : height,
  width: '100%',
  flexDirection: 'column',
  textAlign: 'center',
  alignItems: 'center',
  justifyContent: 'center',
  borderRadius: '12px',
  zIndex: z ?? undefined,
  position: z ? 'absolute' : undefined,
  overflow: 'clip',
}))