export type Clue = string

export type ClueGroup<T> = {
  clue1: T
  clue2: T
  clue3: T
  clue4: T
  description: string
}

export type ConnectionRound = {
  group1: ClueGroup<Clue>
  group2: ClueGroup<Clue>
  group3: ClueGroup<Clue>
  group4: ClueGroup<Clue>
  group5: ClueGroup<Clue>
  group6: ClueGroup<Clue>
}

export type SequenceRound = ConnectionRound

export type WallGroup = {
  group1: ClueGroup<string>
  group2: ClueGroup<string>
  group3: ClueGroup<string>
  group4: ClueGroup<string>
}

export type WallRound = {
  wall1: WallGroup
  wall2: WallGroup
}

export type VowelGroup = ClueGroup<string> & {
  solution1: string
  solution2: string
  solution3: string
  solution4: string
}

export type VowelRound = Record<string, VowelGroup>

export type GameDisplay = {
  connections: ConnectionRound
  sequences: SequenceRound
  walls: WallRound
  vowels: VowelRound
}






