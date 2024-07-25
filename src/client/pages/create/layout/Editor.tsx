import { Box, Divider, Stack, Typography } from '@mui/joy'
import EditClues from './editor/EditClues'
import EditVowelClues from './editor/EditVowelClues'
import EditWallPositions from './editor/EditWallPositions'
import { getGameHeaders } from '../../../utils/titles'

export default function Editor() {
  const gameHeaders = getGameHeaders()

  return (
    <Box width='100%'>
      <Box maxHeight='100%' overflow='auto' justifyContent='center'>
        <Stack
          direction='column'
          sx={{ px: '36px', py: '64px' }}
          divider={<Divider />}
          spacing={12}
        >
          <Stack>
            <Typography level='h1' sx={{ pb: '24px' }}>
              {gameHeaders.connection.title}
            </Typography>
            <Stack spacing={8}>
              {gameHeaders.connection.subtitles.map(([groupId, groupHeader]) => {
                return (
                  <Stack spacing={2} key={groupId} id={`connection-${groupId}`}>
                    <Typography level='h2'>{groupHeader}</Typography>
                    <EditClues
                      group={groupId}
                      round={'connection'}
                      descriptionPlaceholder='What is the connection?'
                    />
                  </Stack>
                )
              })}
            </Stack>
          </Stack>
          <Stack>
            <Typography level='h1' sx={{ pb: '24px' }}>
              {gameHeaders.sequence.title}
            </Typography>
            <Stack spacing={8}>
              {gameHeaders.sequence.subtitles.map(([groupId, groupHeader]) => {
                return (
                  <Stack spacing={2} key={groupId} id={`sequence-${groupId}`}>
                    <Typography level='h2'>{groupHeader}</Typography>
                    <EditClues
                      group={groupId}
                      round={'sequence'}
                      descriptionPlaceholder='What is the sequence?'
                    />
                  </Stack>
                )
              })}
            </Stack>
          </Stack>
          <Stack>
            <Typography level='h1' sx={{ pb: '24px' }}>
              {gameHeaders.wall.title}
            </Typography>
            <Stack spacing={8}>
              {gameHeaders.wall.subtitles.map(([wallId, wallHeader, _]) => {
                return (
                  <Stack spacing={2} key={wallId} id={`wall-${wallId}`}>
                    <Typography level='h2'>{wallHeader}</Typography>
                    <EditWallPositions wallId={wallId} wallHeader={wallHeader} />
                  </Stack>
                )
              })}
            </Stack>
          </Stack>
          <Stack>
            <Typography level='h1' sx={{ pb: '24px' }}>
              {gameHeaders.vowel.title}
            </Typography>
            <Stack spacing={8}>
              {gameHeaders.vowel.subtitles.map(([groupId, groupHeader]) => {
                return (
                  <Stack spacing={2} key={groupId} id={`vowel-${groupId}`}>
                    <Typography level='h2'>{groupHeader}</Typography>
                    <EditVowelClues
                      group={groupId}
                      descriptionPlaceholder='What is the category?'
                    />
                  </Stack>
                )
              })}
            </Stack>
          </Stack>
        </Stack>
      </Box>
    </Box>
  )
}
