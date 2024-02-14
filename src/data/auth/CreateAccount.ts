import { type CreateAccountModel } from '../../domain/models/auth/CreateAccountModel'
import { type CreateAccountUseCase } from '../../domain/usecases/auth/CreateAccountUseCase'
import { type CreateAccountRepository } from '../repositories/auth/CreateAccountRepository'
import { type HashRepository } from '../repositories/encrypt/HashRepository'

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
