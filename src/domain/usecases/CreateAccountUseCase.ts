import { type CreateAccountModel } from '../models/AccountModel'

export interface CreateAccountUseCase {
  create: (account: CreateAccountModel) => Promise<void>
}
