import { type HttpResponse } from '../../controllers/ControllerType'

export class DefaultResponses {
  error (er: Error): HttpResponse {
    return {
      body: er.message,
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
