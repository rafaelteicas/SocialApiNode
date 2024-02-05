import { type AccountModel } from '../models/AccountModel'

export interface CreateAccountUseCase {
  create: (account: AccountModel) => Promise<void>
}
