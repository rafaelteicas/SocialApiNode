import express from 'express'
import { Routes } from '../routes'

const app = express()

// eslint-disable-next-line @typescript-eslint/no-unsafe-argument
app.use('/auth', Routes())

const PORT = 3000

app.listen(PORT, () => {
  console.log('Server is running on', PORT)
})
