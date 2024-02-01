import { CreateAccountController } from '../../presentation/controllers/auth/CreateAccountController'
import { ExpressAdapter } from '../adapters/ExpressAdapter'
import { RouterAdapter } from '../adapters/RouterAdapter'

export function Routes (): any {
  const routerAdapter = new RouterAdapter(new ExpressAdapter())
  return routerAdapter.routes(new CreateAccountController())
}
