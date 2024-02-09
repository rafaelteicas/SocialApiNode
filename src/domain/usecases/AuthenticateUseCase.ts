import { type AuthenticateModel, type SignInDataModel } from '../models/AccountModel'

export interface AuthenticateUseCase {
  signIn: (signInData: SignInDataModel) => Promise<AuthenticateModel | null>
}
