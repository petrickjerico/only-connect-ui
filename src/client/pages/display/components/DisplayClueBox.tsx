import { Sheet, Typography, styled } from '@mui/joy'
import ImageClue from './ImageClue'
import AudioClue from './AudioClue'
import QuestionMarkRoundedIcon from '@mui/icons-material/QuestionMarkRounded';

export default function DisplayClueBox({
  clue,
  url = '',
  height = 'tall',
  clueType = 'text',
  isContentPlaying = undefined,
  isContentTransparent,
  isContentHidden,
  isQuestionMark = false,
  fontSize,
  fontWeight,
  wordSpacing,
  onFinishedPreloading = () => { },
  onErrorPreloading = () => { }
}: {
  clue?: string
  url?: string
  height?: 'short' | 'tall' | string
  clueType?: 'audio' | 'image' | 'text' | string
  isContentPlaying?: boolean
  isContentTransparent?: boolean
  isContentHidden?: boolean
  isQuestionMark?: boolean
  fontSize?: number
  fontWeight?: number
  wordSpacing?: string
  onFinishedPreloading?: () => void
  onErrorPreloading?: () => void
}) {

  return (
    <StyledSheet
      variant='soft'
      z={clueType !== 'text' ? 1 : isQuestionMark ? 3 : 0}
      height={fontSize ? 'fit-content' : height}
      transparent={String(isContentHidden || isContentTransparent)}
    >
      {clueType === 'audio' && (
        <AudioClue
          url={url}
          isImageHidden={isContentHidden}
          isImageTransparent={isContentTransparent}
          isTurnToPlay={isContentPlaying}
          onFinishedPreloading={onFinishedPreloading}
          onErrorPreloading={onErrorPreloading}
        />
      )}
      {clueType === 'image' && (
        <ImageClue
          url={url}
          hidden={isContentHidden}
          transparent={isContentTransparent}
          onFinishedPreloading={onFinishedPreloading}
          onErrorPreloading={onErrorPreloading}
        />
      )}
      {clueType === 'text' && (
        <Typography
          level='h1'
          px='4px'
          whiteSpace='pre-line'
          fontSize={fontSize}
          fontWeight={fontWeight}
          sx={{ wordSpacing: wordSpacing }}
        >
          {clue}
        </Typography>
      )}
      {isQuestionMark && (
        <QuestionMarkRoundedIcon sx={{ height: '80%', width: 'auto' }} />
      )}
    </StyledSheet>
  )
}

const StyledSheet = styled(Sheet)<{
  z?: number
  height?: 'short' | 'tall' | string
  transparent?: string
}>(({
  z,
  height,
  transparent,
  theme
}) => ({
  display: 'flex',
  height: height === 'tall' ? '200px' : height === 'short' ? '100px' : height,
  width: '100%',
  flexDirection: 'column',
  textAlign: 'center',
  alignItems: 'center',
  justifyContent: 'center',
  borderRadius: '12px',
  minHeight: height ? '100px' : undefined,
  zIndex: z ?? undefined,
  position: z ? 'absolute' : undefined,
  overflow: 'clip',
  backgroundColor: transparent === 'true' ? 'transparent' : `${theme.vars.palette.primary.softBg}`
}))
