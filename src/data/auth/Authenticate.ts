import {
  type SignInDataModel,
  type AuthenticateModel
} from '../../domain/models/AccountModel'
import { type AuthenticateUseCase } from '../../domain/usecases/AuthenticateUseCase'
import { type AuthenticateRepository } from '../repositories/AuthenticateRepository'
import { type TokenRepository } from '../repositories/TokenRepository'
import { type VerifyHashRepository } from '../repositories/VerifyHashRepository'

export class Authenticate implements AuthenticateUseCase {
  constructor (
    private readonly authenticateRepository: AuthenticateRepository,
    private readonly verifyHashRepository: VerifyHashRepository,
    private readonly tokenRepository: TokenRepository
  ) {}

  async signIn (signInData: SignInDataModel): Promise<AuthenticateModel | null> {
    const account = await this.authenticateRepository.getAccountByEmail(signInData.email)
    if (account) {
      const comparedPassword = await this.verifyHashRepository.compare(
        signInData.password,
        account.password
      )
      if (comparedPassword) {
        const token = this.tokenRepository.generate({
          ...account
        })
        return { token }
      }
    }
    return null
  }
}
