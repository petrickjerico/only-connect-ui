import { Sheet, Typography } from "@mui/joy";

export default function DisplayGroupBox({ id }: { id: number }) {
  return (
    <Sheet>
      <Typography>
        {id}
      </Typography>
    </Sheet>
  )
}