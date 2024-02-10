import { type TokenRepository } from '../../data/repositories/TokenRepository'
import jwt from 'jsonwebtoken'
import env from '../../main/server/env'

export class TokenRepositoryImpl implements TokenRepository {
  generate (data: any): string {
    const token = jwt.sign(data, env.JWT_KEY)
    return token
  }
}
