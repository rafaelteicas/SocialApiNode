import { CreateAccount } from '../../presentation/controllers/auth/CreateAccount'
import { ExpressAdapter } from '../adapters/ExpressAdapter'
import { RouterAdapter } from '../adapters/RouterAdapter'

export function Routes (): any {
  const routerAdapter = new RouterAdapter(new ExpressAdapter())
  return routerAdapter.routes(new CreateAccount())
}
