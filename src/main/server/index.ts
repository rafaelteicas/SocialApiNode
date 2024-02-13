import 'reflect-metadata'
import express, { type Express } from 'express'
import { AppDataSource } from '../../infra/orm/AppDataSource'
import { authRoutes } from '../routes/authRoutes'
import cors from 'cors'

export async function setupApp (): Promise<Express> {
  const app = express()
  app.use(cors())
  app.use(express.json())
  authRoutes(app)
  return app
}

AppDataSource.initialize()
  .then(async () => {
    const app = await setupApp()
    const PORT = 3000
    app.listen(PORT, () => {
      console.log('Server is running on', PORT)
    })
  })
  .catch(console.log)
