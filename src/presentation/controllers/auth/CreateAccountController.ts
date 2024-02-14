import { type EmailValidatorUseCase } from '../../../domain/usecases/auth/EmailValidatorUseCase'
import { BadRequestError } from '../../helpers/errors/BadRequestError'
import { MissingParamError } from '../../helpers/errors/MissingParamError'
import { DefaultResponses } from '../../helpers/responses/DefaultResponses'
import { type HttpRequest, type Controller, type HttpResponse } from '../ControllerType'
import { type CreateAccountUseCase } from '../../../domain/usecases/auth/CreateAccountUseCase'

export class CreateAccountController implements Controller {
  constructor (
    private readonly emailValidatorUseCase: EmailValidatorUseCase,
    private readonly createAccountUseCase: CreateAccountUseCase
  ) { }

  async handle (request: HttpRequest): Promise<HttpResponse> {
    const responses = new DefaultResponses()
    try {
      if (!request.body) {
        return responses.error(new BadRequestError())
      }
      const requiredFields = ['email', 'password', 'birthday', 'username', 'name']
      for (const field of requiredFields) {
        if (!request.body[field]) {
          return responses.error(new MissingParamError(field))
        }
      }
      const isValid = this.emailValidatorUseCase.validate(
        request.body.email as string
      )
      if (!isValid) { return responses.error(new BadRequestError()) }
      await this.createAccountUseCase.create(request.body)
      return responses.created()
    } catch (er) {
      return responses.serverError()
    }
  }
}
