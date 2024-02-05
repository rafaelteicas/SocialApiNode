import { type Repository } from 'typeorm'
import { type AccountModel } from '../../domain/models/AccountModel'
import { type AccountEntity } from '../../infra/orm/entities/AccountEntity'

export class CreateAccountRepository {
  constructor (private readonly userRepository: Repository<AccountEntity>) { };

  create (account: AccountModel): void {
    this.userRepository.save(account)
  }
}
