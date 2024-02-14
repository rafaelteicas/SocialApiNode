import { type CreateAccountModel } from '../../models/auth/CreateAccountModel'

export interface CreateAccountUseCase {
  create: (account: CreateAccountModel) => Promise<void>
}
