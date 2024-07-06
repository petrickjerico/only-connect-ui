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
        onClick={() => { !hidden && setEnlargePicture(true) }}
        onLoad={onFinishedPreloading}
        onError={onErrorPreloading}
        style={{
          opacity: hidden ? 0 : transparent ? 0.1 : 1,
          height: '100%',
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
              objectFit: 'contain'
            }}
          />
        </ModalDialog>
      </Modal>
    </React.Fragment>
  )

}
