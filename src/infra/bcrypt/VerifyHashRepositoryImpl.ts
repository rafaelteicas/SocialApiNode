import { compare } from 'bcrypt'
import { type VerifyHashRepository } from '../../data/repositories/VerifyHashRepository'

export class VerifyHashRepositoryImpl implements VerifyHashRepository {
  async compare (data: string, hashedData: string): Promise<boolean> {
    const result = await compare(data, hashedData)
    return result
  }
}
