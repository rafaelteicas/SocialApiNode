import { type CreateAccountRepository } from '../../../data/repositories/CreateAccountRepository'
import { type AccountModel } from '../../../domain/models/AccountModel'
import { AppDataSource } from '../AppDataSource'
import { AccountEntity } from '../entities/AccountEntity'

export class AccountRepository implements CreateAccountRepository {
  async save (data: AccountModel): Promise<void> {
    const accountRepository = AppDataSource.getRepository(AccountEntity)
    await accountRepository.save(data)
  }
}
