import {
  type SignInDataModel,
  type AuthenticateModel
} from '../../domain/models/AccountModel'
import { type AuthenticateUseCase } from '../../domain/usecases/AuthenticateUseCase'
import { type AuthenticateRepository } from '../repositories/AuthenticateRepository'
import { type VerifyHashRepository } from '../repositories/VerifyHashRepository'

export class Authenticate implements AuthenticateUseCase {
  constructor (
    private readonly authenticateRepository: AuthenticateRepository,
    private readonly verifyHashRepository: VerifyHashRepository
  ) {}

  async signIn (signInData: SignInDataModel): Promise<AuthenticateModel | null> {
    const account = await this.authenticateRepository.getAccountByEmail(signInData.email)
    if (account) {
      const comparedPassword = await this.verifyHashRepository.compare(
        signInData.password,
        account.password
      )
      if (comparedPassword) {
        return {
          id: account.id,
          birthday: account.birthday,
          email: account.email,
          name: account.name,
          username: account.username
        }
      }
    }
    return null
  }
}
