import {
  Divider,
  Stack,
} from '@mui/joy'

import Editor from './layout/Editor'
import Finalizer from './layout/Finalizer'
import Sidebar from './layout/Sidebar'

export default function CreateGame() {

  return (
    <Stack direction='row' height='100vh' divider={<Divider orientation='vertical' />}>
      <Sidebar />
      <Editor />
      <Finalizer />
    </Stack>
  )
}