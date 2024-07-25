import { Box, Button, Modal, ModalClose, Sheet, Stack, Typography } from '@mui/joy'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useGame } from '../../../../utils/context/GameProvider'

export default function GameModal() {
  const [modalOpen, setModalOpen] = useState(false)
  const game = useGame()
  const navigate = useNavigate()

  return (
    <Box padding={4} display='flex' alignItems='flex-end'>
      <Stack spacing={1}>
        <Button onClick={() => navigate('/display')}>Display</Button>
        <Button onClick={() => setModalOpen(true)}>Check</Button>
      </Stack>
      <Modal
        aria-labelledby='modal-title'
        aria-describedby='modal-desc'
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}
      >
        <Sheet
          variant="outlined"
          sx={{
            width: '30vw',
            maxWidth: '50vw',
            borderRadius: 'md',
            p: 3,
            boxShadow: 'lg',
          }}
        >
          <ModalClose variant="plain" sx={{ m: 1 }} />
          <Typography
            component="h2"
            id="modal-title"
            level="h4"
            textColor="inherit"
            fontWeight="lg"
            mb={1}
          >
            Game check
          </Typography>
          <Sheet
            variant='soft'
            color="neutral"
            sx={{
              borderRadius: 'sm',
              padding: '16px',
              overflow: 'scroll',
              maxHeight: '50vh',
            }}
          >
            <code>
              <pre>
                {JSON.stringify(game.game, null, 2)}
              </pre>
            </code>
          </Sheet>
        </Sheet>
      </Modal>
    </Box>
  )
}