import { Modal, ModalDialog, Sheet, styled } from '@mui/joy'
import { useState } from 'react'

export default function ImageClue({
  url,
  hidden,
  transparent,
  onFinishedPreloading,
  onErrorPreloading
}: {
  url: string
  hidden?: boolean
  transparent?: boolean
  onFinishedPreloading?: () => void
  onErrorPreloading?: () => void
}) {
  const [enlargePicture, setEnlargePicture] = useState<boolean>(false)

  return (
    <StyledSheet
      onClick={() => { !hidden && setEnlargePicture(true) }}>
      <img
        src={url}
        draggable={false}
        onLoad={onFinishedPreloading}
        onError={onErrorPreloading}
        style={{
          opacity: hidden ? 0 : transparent ? 0.1 : 1,
          maxHeight: '100%',
          minHeight: '100%',
          maxWidth: '100%',
          minWidth: '100%',
          objectFit: 'contain'
        }}
      />
      <Modal open={enlargePicture} onClose={() => setEnlargePicture(false)}>
        <ModalDialog layout='center' sx={{ justifyContent: 'center', height: '80%', width: '80%' }}>
          <img
            src={url}
            draggable={false}
            style={{
              maxHeight: '100%',
              minHeight: '100%',
              maxWidth: '100%',
              minWidth: '100%',
              objectFit: 'contain'
            }}
          />
        </ModalDialog>
      </Modal>
    </StyledSheet>
  )

}

const StyledSheet = styled(Sheet)(() => ({
  height: '100%',
  width: '100%',
  justifyContent: 'center',
  background: 'none',
  cursor: 'pointer',
  display: 'flex'
}))
