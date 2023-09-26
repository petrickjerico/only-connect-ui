export type RoundType = 'connection' | 'sequence' | 'wall' | 'vowel'

export type ClueGroup = {
  clues?: Record<number, string>
  description?: string
}

export type RoundGroup = Record<string, ClueGroup | Record<string, ClueGroup>>

export type Game = {
  [round in RoundType]?: RoundGroup
}
