import { type AccountModel } from '../../domain/models/AccountModel'

export interface CreateAccountRepository {
  save: (data: AccountModel) => Promise<void>
}
