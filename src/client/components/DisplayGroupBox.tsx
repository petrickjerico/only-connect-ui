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
      {isVisible && namePlacement === 'top' && (<Chip size='lg'>{groupName}</Chip>)}
      <Button variant='soft' onClick={onClick} size='sm' disabled={isDisabled}>
        <img
          src={require(`../../assets/img/${groupId}.png`)}
          alt={groupId}
          draggable={false}
          style={{ opacity: isDisabled ? 0.3 : 0.75 }}
          title={mode === 'dark' ? 'invert' : undefined}
          className={mode === 'dark' ? 'invert' : undefined}
        />
      </Button >
      {isVisible && namePlacement === 'bottom' && (<Chip size='lg'>{groupName}</Chip>)}
    </Stack>
  )
}