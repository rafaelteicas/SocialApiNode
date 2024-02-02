import { CreateAccountController } from '../../presentation/controllers/auth/CreateAccountController'
import { EmailValidator } from '../../validator/EmailValidator'
import { ExpressAdapter } from '../adapters/ExpressAdapter'
import { RouterAdapter } from '../adapters/RouterAdapter'

export function Routes (): any {
  const routerAdapter = new RouterAdapter(new ExpressAdapter())
  const emailValidator = new EmailValidator()
  return routerAdapter.routes(new CreateAccountController(emailValidator))
}
