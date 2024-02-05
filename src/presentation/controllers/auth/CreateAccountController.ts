import { type EmailValidatorUseCase } from '../../../domain/usecases/EmailValidatorUseCase'
import { BadRequestError } from '../../helpers/errors/BadRequestError'
import { MissingParamError } from '../../helpers/errors/MissingParamError'
import { DefaultResponses } from '../../helpers/responses/DefaultResponses'
import { type HttpRequest, type Controller, type HttpResponse } from '../ControllerType'
import { ServerError } from '../../helpers/errors/ServerError'
import { type CreateAccountUseCase } from '../../../domain/usecases/CreateAccountUseCase'

export class CreateAccountController implements Controller {
  constructor (
    private readonly emailValidator: EmailValidatorUseCase,
    private readonly createAccountUseCase: CreateAccountUseCase
  ) { }

  async handle (request: HttpRequest): Promise<HttpResponse> {
    const responses = new DefaultResponses()
    try {
      if (!request.body) {
        return responses.error(new BadRequestError())
      }
      const requiredFields = ['email', 'password', 'birthday', 'username']
      for (const field of requiredFields) {
        if (!request.body[field]) {
          return responses.error(new MissingParamError(field))
        }
      }
      const isValid = this.emailValidator.validate(request.body.email as string)
      if (!isValid) { return responses.error(new BadRequestError()) }
      await this.createAccountUseCase.create(request.body)
      return responses.created()
    } catch (er) {
      return responses.error(new ServerError())
    }
  }
}
