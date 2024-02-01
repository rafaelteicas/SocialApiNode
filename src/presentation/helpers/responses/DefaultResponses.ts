import { type HttpResponse } from '../../controllers/ControllerType'
import { BadRequestError } from '../errors/BadRequestError'

export class DefaultResponses {
  badRequest (): HttpResponse {
    return {
      body: new BadRequestError().message,
      statusCode: 400
    }
  }

  created (): HttpResponse {
    return {
      body: '',
      statusCode: 201
    }
  }
}
