import { type EmailValidatorUseCase } from '../../../domain/usecases/EmailValidatorUseCase'
import { DefaultResponses } from '../../helpers/responses/DefaultResponses'
import { type HttpRequest, type Controller, type HttpResponse } from '../ControllerType'

export class CreateAccountController implements Controller {
  constructor (private readonly emailValidator: EmailValidatorUseCase) {}
  async handle (request: HttpRequest): Promise<HttpResponse> {
    const responses = new DefaultResponses()
    if (!request.body) {
      return responses.badRequest()
    }
    const requiredFields = ['email', 'password', 'birthday', 'username']
    for (const field of requiredFields) {
      if (!request.body[field]) {
        return responses.missing(field)
      }
    }
    const isValid = this.emailValidator.validate(request.body.email as string)
    if (!isValid) { return responses.badRequest() }
    return responses.created()
  }
}
