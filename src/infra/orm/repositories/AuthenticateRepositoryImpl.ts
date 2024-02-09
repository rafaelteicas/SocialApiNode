import { type AuthenticateRepository } from '../../../data/repositories/AuthenticateRepository'
import { accountRepository } from './AccountRepositoryImpl'

export class AuthenticateRepositoryImpl implements AuthenticateRepository {
  async getAccountByEmail (email: string): Promise<any> {
    const account = await accountRepository.findOne({ where: { email } })
    return account
  };
}
