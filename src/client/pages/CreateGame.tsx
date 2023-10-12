import {
  Divider,
  Stack,
} from '@mui/joy'

import Editor from '../layout/create/Editor'
import Finalizer from '../layout/create/Finalizer'
import Sidebar from '../layout/create/Sidebar'

export default function CreateGame() {

  return (
    <Stack direction='row' height='100vh' divider={<Divider orientation='vertical' />}>
      <Sidebar />
      <Editor />
      <Finalizer />
    </Stack>
  )
}