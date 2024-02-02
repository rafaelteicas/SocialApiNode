import 'reflect-metadata'
import express from 'express'
import { Routes } from '../routes'
import { AppDataSource } from '../../infra/orm/AppDataSource'

const app = express()

app.use('/auth', Routes())

AppDataSource.initialize()
  .then(() => {
    console.log('APP IS RUNNING')
  })
  .catch(console.log)

const PORT = 3000
app.listen(PORT, () => {
  console.log('Server is running on', PORT)
})
