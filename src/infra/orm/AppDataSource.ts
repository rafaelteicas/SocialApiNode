import env from '@/main/env/env'
import { join } from 'path'
import { DataSource } from 'typeorm'

export const AppDataSource = new DataSource({
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: env.DB_USERNAME,
  password: env.DB_PASSWORD,
  database: env.DB_DATABASE,
  synchronize: true,
  migrations: [join(__dirname, 'migrations/*.{ts,js}')],
  entities: [join(__dirname, 'entities/*.{ts,js}')]
})
