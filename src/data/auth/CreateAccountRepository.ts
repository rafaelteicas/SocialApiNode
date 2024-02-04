import { type AccountModel } from '../../domain/models/AccountModel'
import { type Repository } from '../RepositoryType'

export class CreateAccountRepository {
  constructor (private readonly userRepository: Repository) { };

  create (account: AccountModel): void {
    this.userRepository.save(account)
  }
}
