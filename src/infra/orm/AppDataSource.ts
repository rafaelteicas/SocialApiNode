import { join } from 'path'
import { DataSource } from 'typeorm'

export const AppDataSource = new DataSource({
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'rafael',
  password: 'testpassword123',
  database: 'testdb',
  synchronize: true,
  migrations: [join(__dirname, 'migrations/*.{ts,js}')]
})
