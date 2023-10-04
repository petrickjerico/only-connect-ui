import { Button } from '@mui/joy'

export default function DisplayGroupBox({
  groupId,
  onClick,
  isDisabled
}: {
  groupId: string,
  onClick: React.MouseEventHandler<HTMLAnchorElement> | undefined,
  isDisabled: boolean
}) {

  return (
    <Button variant='soft' onClick={onClick} size='sm' disabled={isDisabled}>
      <img
        src={require(`../../public/img/${groupId}.png`)}
        alt={groupId}
        draggable={false}
      />
    </Button >
  )
}