import tutorials from '../../assets/bank/Tutorials.json'
import { ClueGroup, VowelRound, WallGroup } from './types/display';

export function getTutorial(language: string) {

  const tutorialData = Object
    .entries(tutorials)
    .find(([lang]) => lang === language)
    ?.[1]

  return {
    connectionTutorial: tutorialData?.connection as ClueGroup,
    sequenceTutorial: tutorialData?.sequence as ClueGroup,
    wallTutorial: tutorialData?.wall as WallGroup,
    vowelTutorial: tutorialData?.vowel as VowelRound
  }
}