import { type HttpResponse } from '../../controllers/ControllerType'
import { BadRequestError } from '../errors/BadRequestError'
import { ServerError } from '../errors/ServerError'

export class DefaultResponses {
  error (er: Error): HttpResponse {
    return {
      body: er.message,
      statusCode: 400
    }
  }

  serverError (): HttpResponse {
    return {
      body: new ServerError().message,
      statusCode: 500
    }
  }

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

  success (body: any): HttpResponse {
    return {
      body,
      statusCode: 201
    }
  }
}
