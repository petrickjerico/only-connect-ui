import DisplayVowel from '../../layout/display/DisplayVowel'
import { useHost } from '../../utils/context/HostProvider'

export default function DisplayVowelRound() {
  const { game } = useHost()
  const data = game.vowels

  return (
    <DisplayVowel data={data} />
  )
}


