import bcrypt, { genSalt } from 'bcrypt'
import { type HashRepository } from '../../data/repositories/HashRepository'

export class EncrypterRepositoryImpl implements HashRepository {
  async hash (data: string): Promise<string> {
    const salt = await genSalt(10)
    const hashedPassword = await bcrypt.hash(data, salt)
    return hashedPassword
  }
}
