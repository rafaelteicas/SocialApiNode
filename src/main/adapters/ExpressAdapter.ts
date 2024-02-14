import { type HttpRequest, type Controller } from '../../presentation/controllers/ControllerType'
import { type Request, type Response } from 'express'

export class ExpressAdapter {
  build (controller: Controller) {
    return async (req: Request, res: Response) => {
      const request: HttpRequest = {
        body: req.body,
        params: req.query
      }
      const response = await controller.handle(request)
      res.status(response.statusCode).json(response.body)
    }
  }
}
