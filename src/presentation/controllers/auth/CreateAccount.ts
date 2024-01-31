import { type HttpRequest, type Controller, type HttpResponse } from '../ControllerType'

export class CreateAccount implements Controller {
  async handle (request: HttpRequest): Promise<HttpResponse> {
    return {
      body: 'Conta criada com sucesso',
      statusCode: 201
    }
  }
}
