import { type CreateAccountModel } from '../../domain/models/auth/CreateAccountModel'
import { type CreateAccountUseCase } from '../../domain/usecases/CreateAccountUseCase'
import { type CreateAccountRepository } from '../repositories/CreateAccountRepository'
import { type HashRepository } from '../repositories/HashRepository'

export class CreateAccount implements CreateAccountUseCase {
  constructor (
    private readonly createAccountRepository: CreateAccountRepository,
    private readonly hashRepository: HashRepository
  ) { };

  async create (account: CreateAccountModel): Promise<void> {
    const checkIfExist = await this.createAccountRepository.checkIfExists(account.email)
    if (!checkIfExist) {
      const hashedPassword = await this.hashRepository.hash(account.password)
      await this.createAccountRepository.save({
        ...account,
        password: hashedPassword
      })
    }
  }
}
