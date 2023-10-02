import { Button } from '@mui/joy'

export default function DisplayGroupBox({ groupId, onClick }: { groupId: string, onClick: React.MouseEventHandler<HTMLAnchorElement> | undefined }) {

  return (
    <Button variant='soft' onClick={onClick} size='sm' fullWidth>
      <img
        src={require(`../../public/img/${groupId}.png`)}
        alt={groupId}
        draggable={false}
      />
    </Button >
  )
}