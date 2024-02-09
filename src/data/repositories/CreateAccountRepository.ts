import { type CreateAccountModel } from '../../domain/models/AccountModel'

export interface CreateAccountRepository {
  save: (data: CreateAccountModel) => Promise<void>
  checkIfExists: (email: string) => Promise<boolean>
}
