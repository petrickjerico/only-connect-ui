import Grid from '@mui/material/Grid'
import ClueBox from '../components/ClueBox'
import Button from '@mui/material/Button'
import { useState } from 'react'
import DescriptionBox from '../components/DescriptionBox'

export default function EditClues() {
  const [answers, setAnswers] = useState({})
  return (
    <Grid
      container
      spacing={2}
      justifyContent="center"
      alignItems="center"
      direction="column"
      height="100%"
    >
      <Grid item>
        <Grid container spacing={2} justifyContent="center" direction="row">
          <Grid item>
            <ClueBox
              placeholder="Clue 1"
              onChange={(event) => {
                setAnswers({ ...answers, 1: event.target.value })
              }}
            />
          </Grid>
          <Grid item>
            <ClueBox
              placeholder="Clue 2"
              onChange={(event) => {
                setAnswers({ ...answers, 2: event.target.value })
              }}
            />
          </Grid>
          <Grid item>
            <ClueBox
              placeholder="Clue 3"
              onChange={(event) => {
                setAnswers({ ...answers, 3: event.target.value })
              }}
            />
          </Grid>
          <Grid item>
            <ClueBox
              placeholder="Clue 4"
              onChange={(event) => {
                setAnswers({ ...answers, 4: event.target.value })
              }}
            />
          </Grid>
        </Grid>
      </Grid>
      <Grid item>
        <DescriptionBox
          onChange={(event) => {
            setAnswers({ ...answers, description: event.target.value })
          }}
          placeholder="What is the connection?"
        />
      </Grid>
      <Grid item>
        <Button
          onClick={() => {
            console.log(answers)
          }}
        >
          Create
        </Button>
      </Grid>
    </Grid>
  )
}
