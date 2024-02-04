import 'reflect-metadata'
import express from 'express'
import { AppDataSource } from '../../infra/orm/AppDataSource'
import { authRoutes } from '../routes/authRoutes'

const app = express()

authRoutes(app)

AppDataSource.initialize()
  .then(() => {
    console.log('APP IS RUNNING')
  })
  .catch(console.log)

const PORT = 3000
app.listen(PORT, () => {
  console.log('Server is running on', PORT)
})
