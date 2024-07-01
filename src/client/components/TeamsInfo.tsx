import { DialogTitle, Box, Button, Stack, Typography, Input } from '@mui/joy'
import React, { useState } from 'react'
import { HostActionKind, useHost, useHostDispatch } from '../utils/context/HostProvider'
import { useTranslation } from 'react-i18next'

const enum TeamsInfoState {
  NAMES,
  TURN
}

export default function TeamsInfo({ onSubmit }: { onSubmit: () => void }) {
  const dispatch = useHostDispatch()
  const { players } = useHost()
  const { t } = useTranslation()
  const [playerNames, setPlayerNames] = useState<[string, string]>(players)
  const [firstPlayer, setFirstPlayer] = useState<number>()
  const [teamsInfoState, setTeamsInfoState] = useState<TeamsInfoState>(TeamsInfoState.NAMES)

  return (
    <React.Fragment>
      <DialogTitle>{t('teams_info')}</DialogTitle>
      {teamsInfoState === TeamsInfoState.NAMES && (
        <Stack direction='column' alignItems='center' gap={2} paddingY={4}>
          <Typography>{t('teams_name')}</Typography>
          <Stack direction='row' alignItems='center' gap={2}>
            <Input
              placeholder={players[0]}
              onChange={(event) => setPlayerNames([event.target.value, playerNames[1]])}
              sx={{ '& input': { textAlign: 'center' } }}
            />
            <Typography>vs.</Typography>
            <Input
              placeholder={players[1]}
              onChange={(event) => setPlayerNames([playerNames[0], event.target.value])}
              sx={{ '& input': { textAlign: 'center' } }}
            />
          </Stack>
        </Stack>
      )
      }
      {teamsInfoState === TeamsInfoState.TURN && (
        <Stack direction='column' alignItems='center' gap={2} paddingY={4}>
          <Typography>{t('teams_turn')}</Typography>
          <Stack direction='row' alignItems='center' gap={2}>
            <Input
              readOnly
              value={playerNames[0]}
              onClick={() => setFirstPlayer(0)}
              sx={(theme) => ({
                '& input': { textAlign: 'center', cursor: 'pointer' },
                cursor: 'pointer',
                backgroundColor: `${firstPlayer === 0 ? theme.vars.palette.primary.softBg : 'undefined'}`,
              })}
            />
            <Typography>vs.</Typography>
            <Input
              readOnly
              value={playerNames[1]}
              onClick={() => setFirstPlayer(1)}
              sx={(theme) => ({
                '& input': { textAlign: 'center', cursor: 'pointer' },
                cursor: 'pointer',
                backgroundColor: `${firstPlayer === 1 ? theme.vars.palette.primary.softBg : 'undefined'}`
              })}
            />
          </Stack>
        </Stack>
      )
      }
      <Box
        sx={{
          mt: 1,
          display: 'flex',
          gap: 1,
          flexDirection: { xs: 'column', sm: 'row-reverse' },
        }}
      >
        <Button variant="soft" color="primary" onClick={() => {
          switch (teamsInfoState) {
            case TeamsInfoState.NAMES:
              setTeamsInfoState(TeamsInfoState.TURN)
              break
            case TeamsInfoState.TURN:
              dispatch({ type: HostActionKind.INITIALIZE, initialPlayer: Number(firstPlayer) })
              dispatch({ type: HostActionKind.UPDATE_NAMES, players: playerNames })
              onSubmit()
              break
            default:
              break
          }
        }}>
          {teamsInfoState === TeamsInfoState.NAMES ? t('next') : t('done')}
        </Button>
        <Button
          variant="plain"
          color="neutral"
          onClick={() => {
            switch (teamsInfoState) {
              case TeamsInfoState.NAMES:
                setTeamsInfoState(TeamsInfoState.TURN)
                break
              case TeamsInfoState.TURN:
                onSubmit()
                break
              default:
                break
            }
          }}
        >
          {t('skip')}
        </Button>
      </Box>
    </React.Fragment>
  )
}