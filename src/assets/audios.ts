import Wall from './audio/wall.mp3'
import Clues from './audio/clues.mp3'
import Vowel from './audio/vowel.mp3'
import VowelLong from './audio/vowel-long.mp3'
import Full from './audio/full.mp3'
import Solved from './audio/solved.wav'
import Correct from './audio/correct.wav'
import Incorrect from './audio/incorrect.wav'
import Tap from './audio/tap.wav'
import LifeReduced from './audio/life-reduced.wav'
import Fail from './audio/fail.wav'
import Click from './audio/click.wav'
import Buzzer from './audio/buzzer.wav'
import GroupSelected from './audio/group-selected.wav'
import NextClue from './audio/next-clue.wav'

export const WallBGM = new Audio(Wall)
WallBGM.volume = 0.3

export const CluesBGM = new Audio(Clues)
CluesBGM.volume = 0.3

export const VowelBGM = new Audio(Vowel)
VowelBGM.volume = 0.3

export const VowelLongBGM = new Audio(VowelLong)
VowelLongBGM.volume = 0.3

export const FullBGM = new Audio(Full)
FullBGM.volume = 0.3

export const SolvedSFX = new Audio(Solved)
export const CorrectSFX = new Audio(Correct)
CorrectSFX.volume = 0.3

export const NextClueSFX = new Audio(NextClue)
export const BuzzerSFX = new Audio(Buzzer)
export const GroupSelectedSFX = new Audio(GroupSelected)

export const IncorrectSFX = new Audio(Incorrect)
export const TapSFX = new Audio(Tap)
export const LifeReducedSFX = new Audio(LifeReduced)
export const FailSFX = new Audio(Fail)
FailSFX.volume = 0.15

export const ClickSFX = new Audio(Click)

