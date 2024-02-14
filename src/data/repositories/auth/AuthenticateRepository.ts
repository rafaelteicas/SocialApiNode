import { type AccountModel } from '../../../domain/models/auth/AccountModel'

export interface AuthenticateRepository {
  getAccountByEmail: (email: string) => Promise<AccountModel | null>
}
