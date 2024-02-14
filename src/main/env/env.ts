import dotenv from 'dotenv'

dotenv.config()

export default {
  DB_USERNAME: process.env.DB_USERNAME ?? 'user',
  DB_PASSWORD: process.env.DB_PASSWORD ?? 'password',
  DB_DATABASE: process.env.DB_DATABASE ?? 'database',
  JWT_KEY: process.env.JWT_KEY ?? 'any key'
}
