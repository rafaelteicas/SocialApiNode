import { type CreateAccountRepository } from '../../../data/repositories/CreateAccountRepository'
import { type CreateAccountModel } from '../../../domain/models/AccountModel'
import { AppDataSource } from '../AppDataSource'
import { AccountEntity } from '../entities/AccountEntity'

const accountRepository = AppDataSource.getRepository(AccountEntity)
export class AccountRepositoryImpl implements CreateAccountRepository {
  async checkIfExists (email: string): Promise<boolean> {
    const account = await accountRepository.findOne({
      where: {
        email
      }
    })
    if (!account) {
      return false
    }
    return true
  }

  async save (data: CreateAccountModel): Promise<void> {
    await accountRepository.save({
      ...data,
      createdAt: new Date(),
      updatedAt: new Date()
    })
  }
}
