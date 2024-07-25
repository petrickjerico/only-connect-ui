import { DialogTitle, Box, Button, Stack, Typography, Input } from '@mui/joy'
import React, { useState } from 'react'
import { useHost, useHostDispatch } from '../../../utils/context/HostProvider'
import { useTranslation } from 'react-i18next'

const enum TeamsInfoState {
  NAMES,
  TURN
}

export default function TeamsInfo({ onSubmit }: { onSubmit: () => void }) {
  const dispatch = useHostDispatch()
  const { t } = useTranslation()
  const { teamName0, teamName1, currentTeam } = useHost()
  const [teamsInfoState, setTeamsInfoState] = useState<TeamsInfoState>(TeamsInfoState.NAMES)
  const [teamsInfo, setTeamsInfo] = useState<{
    teamName0: string,
    teamName1: string,
    currentTeam?: number
  }>({
    teamName0: teamName0,
    teamName1: teamName1,
    currentTeam: undefined
  })

  return (
    <React.Fragment>
      <DialogTitle>{t('teams_info')}</DialogTitle>
      {teamsInfoState === TeamsInfoState.NAMES && (
        <Stack direction='column' alignItems='center' gap={2} paddingY={4}>
          <Typography>{t('teams_name')}</Typography>
          <Stack direction='row' alignItems='center' gap={2}>
            <Input
              placeholder={teamName0}
              onChange={(event) => setTeamsInfo({ ...teamsInfo, teamName0: event.target.value })}
              sx={(theme) => ({
                '& input': { textAlign: 'center' },
                'input:focus::placeholder': {
                  color: 'transparent'
                },
                '--Input-focusedHighlight': theme.vars.palette.primary.plainColor,
                '--Input-focusedThickness': '1px',
              })}
            />
            <Typography>vs.</Typography>
            <Input
              placeholder={teamName1}
              onChange={(event) => setTeamsInfo({ ...teamsInfo, teamName1: event.target.value })}
              sx={(theme) => ({
                '& input': { textAlign: 'center' },
                'input:focus::placeholder': {
                  color: 'transparent'
                },
                '--Input-focusedHighlight': theme.vars.palette.primary.plainColor,
                '--Input-focusedThickness': '1px',
              })}
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
              value={teamsInfo.teamName0}
              onClick={() => setTeamsInfo({ ...teamsInfo, currentTeam: 0 })}
              sx={(theme) => ({
                color: `${teamsInfo.currentTeam === 0
                  ? theme.vars.palette.primary.plainColor
                  : 'undefined'}`,
                '& input': { textAlign: 'center', cursor: 'pointer' },
                cursor: 'pointer',
                backgroundColor: `${teamsInfo.currentTeam === 0
                  ? theme.vars.palette.primary.softBg
                  : 'undefined'}`,
                '--Input-focusedHighlight': theme.vars.palette.primary.plainColor,
                '--Input-focusedThickness': '1px',
              })}
            />
            <Typography>vs.</Typography>
            <Input
              readOnly
              value={teamsInfo.teamName1}
              onClick={() => setTeamsInfo({ ...teamsInfo, currentTeam: 1 })}
              sx={(theme) => ({
                color: `${teamsInfo.currentTeam === 1
                  ? theme.vars.palette.primary.plainColor
                  : 'undefined'}`,
                '& input': { textAlign: 'center', cursor: 'pointer' },
                cursor: 'pointer',
                backgroundColor: `${teamsInfo.currentTeam === 1
                  ? theme.vars.palette.primary.softBg
                  : 'undefined'}`,
                '--Input-focusedHighlight': theme.vars.palette.primary.plainColor,
                '--Input-focusedThickness': '1px',
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
              dispatch({ type: 'UPDATE_TEAM_NAME_0', payload: teamsInfo.teamName0 })
              dispatch({ type: 'UPDATE_TEAM_NAME_1', payload: teamsInfo.teamName1 })
              dispatch({ type: 'INITIALIZE_CURRENT_TEAM', payload: teamsInfo.currentTeam ?? currentTeam })
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