import { CreateAccount } from '../../../data/auth/CreateAccount'
import { EncrypterRepositoryImpl } from '../../../infra/bcrypt/HashRepositoryImpl'
import { AccountRepositoryImpl } from '../../../infra/orm/repositories/AccountRepositoryImpl'
import { type Controller } from '../../../presentation/controllers/ControllerType'
import { CreateAccountController } from '../../../presentation/controllers/auth/CreateAccountController'
import { EmailValidator } from '../../../validator/EmailValidator'

export function makeSignUp (): Controller {
  const emailValidator = new EmailValidator()
  const createAccountRepository = new AccountRepositoryImpl()
  const hashRepository = new EncrypterRepositoryImpl()
  const createAccount = new CreateAccount(
    createAccountRepository,
    hashRepository
  )
  return new CreateAccountController(emailValidator, createAccount)
}
