import { type HttpResponse } from '../../controllers/ControllerType'
import { BadRequestError } from '../errors/BadRequestError'
import { MissingParamError } from '../errors/MissingParamError'

export class DefaultResponses {
  badRequest (): HttpResponse {
    return {
      body: new BadRequestError().message,
      statusCode: 400
    }
  }

  missing (field: string): HttpResponse {
    return {
      body: new MissingParamError(field).message,
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
