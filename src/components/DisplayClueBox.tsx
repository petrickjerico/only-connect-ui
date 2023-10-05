import { Sheet, Typography, colors, styled } from '@mui/joy'

export default function DisplayClueBox({
  clue,
  height = 'tall'
}: {
  clue: string,
  height?: 'short' | 'tall' | string
}) {
  return (
    <StyledSheet variant='soft' height={height}>
      <Typography level='h1' px='4px'>
        {clue}
      </Typography>
    </StyledSheet>
  )
}

const StyledSheet = styled(Sheet)<{ height?: 'short' | 'tall' | string }>(({ height }) => ({
  display: 'flex',
  height: height === 'tall' ? '200px' : height === 'short' ? '100px' : height,
  flexDirection: 'column',
  textAlign: 'center',
  justifyContent: 'center',
  borderRadius: '12px',
  backgroundColor: `${colors.blue[100]}`,
}))