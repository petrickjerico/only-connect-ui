import { Button, useColorScheme } from '@mui/joy'

export default function DisplayGroupBox({
  groupId,
  onClick,
  isDisabled = false
}: {
  groupId: string,
  onClick: React.MouseEventHandler<HTMLAnchorElement> | undefined,
  isDisabled?: boolean
}) {

  const { mode } = useColorScheme()

  return (
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
  )
}