import { AspectRatio, Modal, ModalDialog } from '@mui/joy'
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
        <ModalDialog layout='center' sx={{ justifyContent: 'center', height: '90%', width: '90%' }}>
          <AspectRatio objectFit='contain'>
            <img
              src={url}
              draggable={false}
            />
          </AspectRatio>
        </ModalDialog>
      </Modal>
    </React.Fragment>
  )

}
