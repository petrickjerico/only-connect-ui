export type ClueGroup = {
  clue1: string
  clue2: string
  clue3: string
  clue4: string
  description: string
}

export type MediaAppendage = {
  url1: string
  url2: string
  url3: string
  url4: string
  type: 'audio' | 'image' | string
}

export type ConnectionRound = {
  group1: ClueGroup
  group2: ClueGroup
  group3: ClueGroup
  group4: ClueGroup
  group5: ClueGroup
  group6: ClueGroup
}

export type SequenceRound = ConnectionRound

export type WallGroup = {
  group1: ClueGroup
  group2: ClueGroup
  group3: ClueGroup
  group4: ClueGroup
}

export type WallRound = {
  wall1: WallGroup
  wall2: WallGroup
}

export type VowelGroup = ClueGroup & {
  solution1: string
  solution2: string
  solution3: string
  solution4: string
}

export type VowelRound = Record<string, VowelGroup>

export type Round = ConnectionRound | SequenceRound | WallRound | VowelRound

export type GameDisplay = {
  connections: ConnectionRound
  sequences: SequenceRound
  walls: WallRound
  vowels: VowelRound
}






