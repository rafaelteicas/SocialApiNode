import { type CreateAccountModel } from '../../domain/models/auth/CreateAccountModel'

export interface CreateAccountRepository {
  save: (data: CreateAccountModel) => Promise<void>
  checkIfExists: (email: string) => Promise<boolean>
}
