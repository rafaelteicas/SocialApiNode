import { type Router } from 'express'
import { makeSignUp } from '../factories/auth/makeSignUp'
import { RouterAdapter } from '../adapters/RouterAdapter'
import { ExpressAdapter } from '../adapters/ExpressAdapter'
import { makeAuthenticate } from '../factories/auth/makeAuthenticate'

export function authRoutes (route: Router): void {
  const routerAdapter = new RouterAdapter(new ExpressAdapter())
  route.post('/auth/signup', routerAdapter.routes(makeSignUp()))
  route.post('/auth/login', routerAdapter.routes(makeAuthenticate()))
}
