import { Button, Sheet, Stack, Typography } from '@mui/joy'
import CoverImage from '../../../assets/img/cover.png'
import { useTranslation } from 'react-i18next'
import { useHost } from '../../utils/context/HostProvider'
import { useState } from 'react'
import DisplayTieBreaker from './DisplayTieBreaker'

export default function DisplayEndScreen() {
  const { t } = useTranslation()
  const { teamName0, teamName1, teamScore0, teamScore1 } = useHost()
  const [showScores, setShowScores] = useState<boolean>(false)

  const [isTie, winner] = [
    teamScore0 === teamScore1,
    teamScore0 > teamScore1 ? teamName0 : teamName1
  ]

  return (
    <Stack
      direction='row'
      alignItems='center'
      justifyContent='center'
      spacing={8}
    >
      <img src={CoverImage} width='20%' height='auto' />
      <Stack spacing={2} width='30%' >
        <Typography level='h1'>
          {t('end_title')}
        </Typography>
        <Sheet sx={{ background: 'none' }}>
          {
            !showScores && (
              <Sheet
                variant='soft'
                color='neutral'
                sx={{
                  display: 'flex',
                  zIndex: '1',
                  position: 'absolute',
                  minWidth: '100%',
                  minHeight: '100%',
                  borderRadius: 8,
                  alignContent: 'center',
                  justifyContent: 'center'
                }}
              >
                <Button variant='plain' fullWidth onClick={() => setShowScores(true)} >
                  Show final scores
                </Button>
              </Sheet>
            )
          }
          <Stack direction='column' gap={2}>
            <Sheet variant='soft' sx={{ borderRadius: 8 }} color={teamScore0 > teamScore1 ? 'primary' : undefined}>
              <Stack direction='row' padding={2} alignItems='center' justifyContent='space-between'>
                <Typography level='h3'>{teamName0}</Typography>
                <Sheet variant='soft' sx={{ width: '25%', borderRadius: 8 }} color={teamScore0 > teamScore1 ? 'primary' : undefined}>
                  <Typography color='primary' level='h2' textAlign='right'>{teamScore0}</Typography>
                </Sheet>
              </Stack>
            </Sheet>
            <Sheet variant='soft' sx={{ borderRadius: 8 }} color={teamScore1 > teamScore0 ? 'primary' : undefined}>
              <Stack direction='row' padding={2} alignItems='center' justifyContent='space-between'>
                <Typography level='h3'>{teamName1}</Typography>
                <Sheet variant='soft' sx={{ width: '25%', borderRadius: 8 }} color={teamScore1 > teamScore0 ? 'primary' : undefined}>
                  <Typography color='primary' level='h2' textAlign='right'>{teamScore1}</Typography>
                </Sheet>
              </Stack>
            </Sheet>
            <Stack gap={2}>
              {isTie ? <DisplayTieBreaker /> : <Typography level='body-lg'>{winner} wins!</Typography>}
              <Typography level='body-lg' >
                {isTie ? 'It\'s a tie! Team captains will now go head-to-head in a tie-breaker.' : t('end_message')}
              </Typography>
            </Stack>
          </Stack>
        </Sheet>
      </Stack >
    </Stack >
  )
}