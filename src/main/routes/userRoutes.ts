import { type Router } from 'express'
import { RouterAdapter } from '../adapters/RouterAdapter'
import { ExpressAdapter } from '../adapters/ExpressAdapter'
import { makeGetUser } from '../factories/auth/makeGetUser'

export function userRoutes (route: Router): void {
  const routerAdapter = new RouterAdapter(new ExpressAdapter())
  route.get('/user', routerAdapter.routes(makeGetUser()))
}
