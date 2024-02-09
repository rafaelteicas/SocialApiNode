import { type AccountModel, type SignInDataModel } from '../models/AccountModel'

export interface AuthenticateUseCase {
  signIn: (signInData: SignInDataModel) => Promise<AccountModel>
}
