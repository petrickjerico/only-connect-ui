import { Modal, ModalDialog } from '@mui/joy'
import React, { useState } from 'react'

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
    <React.Fragment>
      <img
        src={url}
        draggable={false}
        style={{
          opacity: hidden ? 0 : transparent ? 0.1 : 1,
          maxHeight: '100%',
          minHeight: '100%'
        }}
        onClick={() => setEnlargePicture(true)}
        onLoad={onFinishedPreloading}
        onError={onErrorPreloading}
      />
      <Modal open={enlargePicture} onClose={() => setEnlargePicture(false)}>
        <ModalDialog layout='center' sx={{ justifyContent: 'center' }}>
          <img
            src={url}
            draggable={false}
            style={{
              maxHeight: '100%',
              minHeight: '100%'
            }}
          />
        </ModalDialog>
      </Modal>
    </React.Fragment>
  )

}