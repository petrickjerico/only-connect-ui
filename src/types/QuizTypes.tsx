export type ClueType = 'text' | 'image' | 'audio'

export type RoundType = 'connection' | 'sequence' | 'wall' | 'vowel'

export type ClueGroup = {
  clues: Record<number, ClueType>
  description: string
}

export type RoundGroup = Record<string, ClueGroup | ClueGroup[]>

export type Game = Record<RoundType, RoundGroup>
