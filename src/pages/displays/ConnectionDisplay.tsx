import { ConnectionRound } from '../../utils/types/display';
import DisplayGroups from '../../layout/display/DisplayGroups';

export default function ConnectionDisplay({ data }: { data: ConnectionRound }) {
  return (
    <DisplayGroups round={data} />
  )
}