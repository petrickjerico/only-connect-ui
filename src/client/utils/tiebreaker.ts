import _ from 'lodash'
import tiebreaker from '../../assets/mock/Tiebreaker.json'

export function getRandomTiebreaker(language: string): [string, string] {
  const tiebreakers = Object
    .entries(tiebreaker)
    .find(([lang]) => lang === language)
    ?.[1] as string[][]

  return _.sample(tiebreakers) as [string, string]
}