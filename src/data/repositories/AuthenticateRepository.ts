import { type AccountModel } from '../../domain/models/AccountModel'

export interface AuthenticateRepository {
  getAccountByEmail: (email: string) => Promise<AccountModel | null>
}
