import { useContext, createContext, useState } from 'react'

const AudioTurnContext = createContext<{
  isMediaPlaying: boolean,
  setIsMediaPlaying: (value: boolean) => void
}>({
  isMediaPlaying: false,
  setIsMediaPlaying: () => { }
})

export function useAudioTurn() {
  return useContext(AudioTurnContext)
}

export default function AudioTurnProvider({ children }: { children: React.ReactNode }) {
  const [isMediaPlaying, setIsMediaPlaying] = useState<boolean>(false)
  return (
    <AudioTurnContext.Provider value={{ isMediaPlaying, setIsMediaPlaying }}>
      {children}
    </AudioTurnContext.Provider>
  )
}