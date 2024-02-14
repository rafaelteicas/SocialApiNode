import { type SignInModel } from '../../domain/models/auth/SignInModel'
import { type AuthenticateUseCase } from '../../domain/usecases/auth/AuthenticateUseCase'
import { type AuthenticateRepository } from '../repositories/auth/AuthenticateRepository'
import { type TokenRepository } from '../repositories/encrypt/TokenRepository'
import { type VerifyHashRepository } from '../repositories/encrypt/VerifyHashRepository'

export class Authenticate implements AuthenticateUseCase {
  constructor (
    private readonly authenticateRepository: AuthenticateRepository,
    private readonly verifyHashRepository: VerifyHashRepository,
    private readonly tokenRepository: TokenRepository
  ) {}

  async signIn (signInData: SignInModel): Promise<{ token: string } | null> {
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
