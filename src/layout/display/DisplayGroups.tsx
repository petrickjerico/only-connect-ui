import { Grid } from '@mui/joy'
import { SequenceRound, VowelRound } from '../../utils/types/display'
import DisplayGroupBox from '../../components/DisplayGroupBox'


export default function DisplayGroups({ round }: { round: VowelRound | SequenceRound }) {
  return (
    <Grid container columns={3} spacing={1}>
      {Object.entries(round).map(([key, value]) => (
        <Grid key={key} xs={1}>
          <DisplayGroupBox groupId={key} onClick={() => console.log(value)} />
        </Grid>
      ))}
    </Grid >
  )
}