import { Sheet, Typography } from "@mui/joy";

export default function DisplayClueBox({ clue }: { clue: string }) {
  return (
    <Sheet>
      <Typography>
        {clue}
      </Typography>
    </Sheet>
  )
}