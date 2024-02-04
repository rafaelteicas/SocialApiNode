import { type Controller } from '../../../presentation/controllers/ControllerType'
import { CreateAccountController } from '../../../presentation/controllers/auth/CreateAccountController'
import { EmailValidator } from '../../../validator/EmailValidator'

export function makeSignUp (): Controller {
  const emailValidator = new EmailValidator()
  return new CreateAccountController(emailValidator)
}
