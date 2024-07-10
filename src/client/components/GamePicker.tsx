import { Select, Option } from '@mui/joy'
import games from '../../assets/mock'
import { GameDisplay } from '../utils/types/display'
import { useHostDispatch } from '../utils/context/HostProvider'
import LibraryBooksRoundedIcon from '@mui/icons-material/LibraryBooksRounded';

const GAMES_LIST = Object.entries(games) as [string, GameDisplay][]
export const DEFAULT_GAME = GAMES_LIST[0] as [string, GameDisplay]

export default function GamePicker() {
  const dispatch = useHostDispatch()

  function getGame(name: string | null) {
    return GAMES_LIST.find(([key]) => key === name)?.[1] as unknown as GameDisplay
  }

  return (
    <Select
      defaultValue={DEFAULT_GAME[0]}
      onChange={(_, value) => dispatch({ type: 'UPDATE_GAME', payload: getGame(value) })}
      variant='soft'
      startDecorator={<LibraryBooksRoundedIcon />}
      sx={{
        width: 'fit-content'
      }}
    >
      {GAMES_LIST.map(([gameTitle]) =>
        <Option value={gameTitle} key={gameTitle} >
          {gameTitle}
        </Option>
      )}
    </Select>
  )
}