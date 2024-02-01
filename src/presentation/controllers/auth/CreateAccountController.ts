import { DefaultResponses } from '../../helpers/responses/DefaultResponses'
import { type HttpRequest, type Controller, type HttpResponse } from '../ControllerType'

export class CreateAccountController implements Controller {
  async handle (request: HttpRequest): Promise<HttpResponse> {
    const responses = new DefaultResponses()
    const requiredFields = ['email', 'password', 'birthday', 'username']
    for (const field of requiredFields) {
      if (!request.body[field]) {
        return responses.badRequest()
      }
    }
    return responses.created()
  }
}
