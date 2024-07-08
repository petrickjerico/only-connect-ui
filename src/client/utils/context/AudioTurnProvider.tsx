import { useContext, createContext, useState } from 'react'
import { MUSIC_VOLUME_DEFAULT } from '../audios'

const AudioTurnContext = createContext<{
  isMediaPlaying: boolean,
  volume: number,
  setIsMediaPlaying: (value: boolean) => void
  setVolume: (value: number) => void
}>({
  isMediaPlaying: false,
  volume: MUSIC_VOLUME_DEFAULT,
  setIsMediaPlaying: () => { },
  setVolume: () => { }
})

export function useAudioTurn() {
  return useContext(AudioTurnContext)
}

export default function AudioTurnProvider({ children }: { children: React.ReactNode }) {
  const [isMediaPlaying, setIsMediaPlaying] = useState<boolean>(false)
  const [volume, setVolume] = useState<number>(MUSIC_VOLUME_DEFAULT)

  return (
    <AudioTurnContext.Provider value={{ isMediaPlaying, volume, setIsMediaPlaying, setVolume }}>
      {children}
    </AudioTurnContext.Provider>
  )
}