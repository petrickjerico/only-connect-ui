export type RoundType = 'connection' | 'sequence' | 'wall' | 'vowel'

export type GameAttribute = {
  value: string
  round: RoundType
  wall?: string
  group: string
  order?: string
  type: 'clue' | 'description' | 'solution'
}

export type GameInput = Record<string, GameAttribute>
