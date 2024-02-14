import { type SignInModel } from '../../models/auth/SignInModel'

export interface AuthenticateUseCase {
  signIn: (signInData: SignInModel) => Promise<{ token: string } | null>
}
