import { Button, Chip, Stack, useColorScheme } from '@mui/joy'
import { getGroupName } from '../utils/titles'

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

  return (
    <Stack gap={2} alignItems='center'>
      {namePlacement === 'top' && (<Chip size='lg' sx={{ visibility: isVisible ? undefined : 'hidden' }}>{groupName}</Chip>)}
      <Button variant='soft' onClick={onClick} size='sm' disabled={isDisabled}>
        <img
          src={require(`../../assets/img/${groupId}.png`)}
          alt={groupId}
          draggable={false}
          style={{ opacity: isDisabled ? 0.3 : 0.75 }}
          className={mode === 'dark' ? 'invert' : undefined}
        />
      </Button >
      {namePlacement === 'bottom' && (<Chip size='lg' sx={{ visibility: isVisible ? undefined : 'hidden' }}>{groupName}</Chip>)}
    </Stack>
  )
}