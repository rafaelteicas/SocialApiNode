import { type TokenRepository } from '../../data/repositories/encrypt/TokenRepository'
import jwt from 'jsonwebtoken'
import env from '../../main/env/env'

export class TokenRepositoryImpl implements TokenRepository {
  generate (data: any): string {
    const token = jwt.sign(data, env.JWT_KEY)
    return token
  }
}
