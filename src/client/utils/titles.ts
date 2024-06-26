import { useTranslation } from 'react-i18next'
import { RoundType } from './types/attributes'

const DEFAULT_VOWELS_CATEGORY_MAX_COUNT = 5
const DEFAULT_WALL_CONNECTION_COUNT = 4
export const DEFAULT_WALL_INDEXES: string[] = ['2', '5']
const DEFAULT_GROUP_NAMES: Record<string, string> = {
  '1': 'two_reeds',
  '2': 'lion',
  '3': 'twisted_flax',
  '4': 'snake',
  '5': 'water',
  '6': 'eye_of_horus'
}

const DEFAULT_GROUP_LOGOS: Record<string, string> = {
  '1': '𓇌',
  '2': '𓃭',
  '3': '𓎛 ',
  '4': '𓆑',
  '5': '𓈗',
  '6': '𓂀'
}

export function getGroupName(index: string) {
  const { t } = useTranslation()
  return `${DEFAULT_GROUP_LOGOS[index]} ${t(DEFAULT_GROUP_NAMES[index])}`
}

function getGroupEntries(groupNames?: Record<string, string>): [string, string][] {
  return Object.entries(groupNames ?? DEFAULT_GROUP_NAMES)
}
function getWallEntries(groupNames?: Record<string, string>, wallConnectionCount?: number): [string, string, string[]][] {
  return Object.entries(groupNames ?? DEFAULT_GROUP_NAMES)
    .filter(([key]) => DEFAULT_WALL_INDEXES.includes(key))
    .map(([_, value], index) => [
      `${index + 1}`,
      `${value} Wall`,
      Object.entries(Array.from(Array(wallConnectionCount ?? DEFAULT_WALL_CONNECTION_COUNT).keys()))
        .map((_, index) => `${value} Wall — Connection ${index + 1}`)
    ]
    )
}

function getVowelCategoriesEntries(vowelsCategoryCount?: number): [string, string][] {
  return Object.entries(Array.from(Array(vowelsCategoryCount ?? DEFAULT_VOWELS_CATEGORY_MAX_COUNT).keys()))
    .map((_, index) => { return [`${index + 1}`, `Category ${index + 1}`] })
}

export function getGameHeaders(
  groupNames?: Record<string, string>,
  wallConnectionCount?: number,
  vowelsCategoryMaxCount?: number
): Record<RoundType, { title: string, subtitles: [string, string, string[] | undefined][] }
> {
  const groupEntries = getGroupEntries(groupNames ?? DEFAULT_GROUP_NAMES)
  const wallEntries = getWallEntries(groupNames ?? DEFAULT_GROUP_NAMES, wallConnectionCount ?? DEFAULT_WALL_CONNECTION_COUNT)
  const vowelCategoriesEntries = getVowelCategoriesEntries(vowelsCategoryMaxCount ?? DEFAULT_VOWELS_CATEGORY_MAX_COUNT)


  const headers: Record<
    RoundType,
    {
      title: string,
      subtitles: [string, string, string[] | undefined][]
    }
  > = {
    connection: {
      title: 'Round 1: Connections',
      subtitles: groupEntries.map(([key, value]) => [key, `Connection ${key}: ${value}`, undefined])
    },
    sequence: {
      title: 'Round 2: Sequences',
      subtitles: groupEntries.map(([key, value]) => [key, `Sequence ${key}: ${value}`, undefined])
    },
    wall: {
      title: 'Round 3: Connecting Wall',
      subtitles: wallEntries
    },
    vowel: {
      title: 'Round 4: Missing Vowels',
      subtitles: vowelCategoriesEntries.map(([key, value]) => [key, value, undefined])
    }
  }

  return headers
}


