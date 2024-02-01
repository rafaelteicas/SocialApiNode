import { type HttpRequest, type Controller, type HttpResponse } from '../ControllerType'

export class CreateAccountController implements Controller {
  async handle (request: HttpRequest): Promise<HttpResponse> {
    const requiredFields = ['email', 'password', 'birthday', 'username']
    for (const field of requiredFields) {
      if (!request.body[field]) {
        return {
          body: 'Bad request error',
          statusCode: 400
        }
      }
    }
    return {
      body: 'Conta criada com sucesso',
      statusCode: 201
    }
  }
}
