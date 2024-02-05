import { type AccountModel } from '../../domain/models/AccountModel'
import { type CreateAccountUseCase } from '../../domain/usecases/CreateAccountUseCase'
import { type CreateAccountRepository } from '../repositories/CreateAccountRepository'

export class CreateAccount implements CreateAccountUseCase {
  constructor (private readonly userRepository: CreateAccountRepository) { };

  async create (account: AccountModel): Promise<void> {
    await this.userRepository.save(account)
  }
}
