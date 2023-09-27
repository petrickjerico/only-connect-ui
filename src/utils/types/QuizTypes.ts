export type RoundType = 'connection' | 'sequence' | 'wall' | 'vowel'

export type GameAttribute = {
  value: string
  round: RoundType
  wall?: string
  group: string
  type: 'clue' | 'description' | 'solution'
}

export type Game = Record<string, GameAttribute>
