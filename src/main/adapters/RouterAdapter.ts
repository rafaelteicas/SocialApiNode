import { type ExpressAdapter } from './ExpressAdapter'
import { type Controller } from '../../presentation/controllers/ControllerType'

export class RouterAdapter {
  constructor (private readonly expressAdapter: ExpressAdapter) {}
  routes (controller: Controller): any {
    return this.expressAdapter.build(controller)
  }
}
