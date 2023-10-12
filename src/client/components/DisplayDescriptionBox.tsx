import { Sheet, Typography, TypographySystem, colors, styled } from '@mui/joy'

export default function DisplayDescriptionBox({
  description,
  level = 'h1'
}: {
  description: string,
  level?: keyof TypographySystem
}) {
  return (
    <StyledSheet variant='plain'>
      <Typography level={level}>
        {description}
      </Typography>
    </StyledSheet >
  )
}

const StyledSheet = styled(Sheet)(() => ({
  display: 'flex',
  height: '50px',
  width: '100%',
  flexDirection: 'column',
  textAlign: 'center',
  justifyContent: 'center',
  borderRadius: '12px',
  padding: '8px 0px',
  backgroundColor: `${colors.blue[200]}`,
}))