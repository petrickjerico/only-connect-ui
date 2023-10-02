import { SequenceRound } from '../../utils/types/display';
import DisplayGroups from '../../layout/display/DisplayGroups';

export default function SequenceDisplay({ data }: { data: SequenceRound }) {
  return (
    <DisplayGroups round={data} />
  )
}