import { Button, Chip, Stack, useColorScheme } from '@mui/joy'
import { getGroupName } from '../../../utils/titles'
import { useState } from 'react'

export default function DisplayGroupBox({
  groupId,
  onClick,
  isDisabled = false,
  namePlacement
}: {
  groupId: string,
  onClick: React.MouseEventHandler<HTMLAnchorElement> | undefined,
  isDisabled?: boolean,
  namePlacement?: 'top' | 'bottom'
}) {
  const { mode } = useColorScheme()
  const isVisible = !isDisabled && !!namePlacement
  const groupName = getGroupName(groupId.slice(-1))
  const [hover, setHover] = useState<boolean>(false)

  return (
    <Stack gap={2} alignItems='center'>
      {namePlacement === 'top' && <GroupNameChip isVisible={isVisible} isHover={hover} name={groupName} />}
      <Button
        variant='soft'
        onClick={onClick}
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
        disabled={isDisabled}
      >
        <img
          src={require(`../../../../assets/img/${groupId}.png`)}
          alt={groupId}
          draggable={false}
          style={{ opacity: isDisabled ? 0.3 : 0.75 }}
          className={mode === 'dark' ? 'invert' : undefined}
        />
      </Button >
      {namePlacement === 'bottom' && <GroupNameChip isVisible={isVisible} isHover={hover} name={groupName} />}
    </Stack>
  )
}

function GroupNameChip({ name, isVisible, isHover }: { name: string, isVisible: boolean, isHover: boolean }) {
  return (
    <Chip
      size='lg'
      sx={(theme) => ({
        visibility: isVisible ? undefined : 'hidden',
        backgroundColor: isHover ? theme.vars.palette.neutral.softHoverBg : theme.vars.palette.neutral.softBg,
        opacity: isHover ? '100%' : '80%'
      })}>
      {name}
    </Chip>
  )
}