import { Modal, ModalClose, ModalDialog, Sheet, Typography, colors, styled } from '@mui/joy'
import Gramophone from '../assets/img/music.png'
import { useState } from 'react'

export default function DisplayClueBox({
  clue,
  height = 'tall',
  clueType,
  isTransparent
}: {
  clue: string,
  height?: 'short' | 'tall' | string
  clueType?: 'audio' | 'image'
  isTransparent?: boolean
}) {
  const [enlargePicture, setEnlargePicture] = useState<boolean>(false)

  return (
    <StyledSheet
      variant='soft'
      height={height}
      istransparent={isTransparent ? 'true' : 'false'}
      z={clueType === 'audio' || clueType === 'image' ? 1 : 0}>
      {clueType === 'audio' && (
        <img
          width='150px'
          height='auto'
          src={Gramophone}
          alt={clue}
          draggable={false}
          style={{ opacity: isTransparent ? 0.15 : 1 }}
        />)}
      {clueType === 'image' && (
        <img
          onClick={() => setEnlargePicture(true)}
          src={clue}
          alt={clue}
          draggable={false}
          style={{
            opacity: isTransparent ? 0.15 : 1,
            maxHeight: '100%',
            minHeight: '100%'
          }}
        />)}
      {!clueType && (
        <Typography level='h1' px='4px' whiteSpace='pre-line'>
          {clue}
        </Typography>)}
      {clueType === 'image' && (
        <Modal open={enlargePicture} onClose={() => setEnlargePicture(false)}>
          <ModalDialog layout='center' sx={{ justifyContent: 'center' }}>
            <ModalClose />
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

const StyledSheet = styled(Sheet)<{ height?: 'short' | 'tall' | string, istransparent?: string, z?: number }>(({ height, istransparent, z }) => ({
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
  backgroundColor: istransparent === 'true' ? 'transparent' : `${colors.blue[100]}`,
}))