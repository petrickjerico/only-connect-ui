import { Stack, Divider, Typography } from '@mui/joy'
import CoverImage from '../../assets/img/cover.png'

export default function DisplayEndScreen() {
  return (
    <Stack
      direction='row'
      alignItems='center'
      justifyContent='center'
      spacing={8}
      divider={<Divider orientation='vertical' />}>
      <img src={CoverImage} width='20%' height='auto' />
      <Stack spacing={2} maxWidth='30%'>
        <Typography level='h1'>
          End of the game!
        </Typography>
        <Typography level='body-lg'>
          {'Thank you for playing! Hope you enjoyed the puzzles.'}
        </Typography>
      </Stack>
    </Stack>
  )
}