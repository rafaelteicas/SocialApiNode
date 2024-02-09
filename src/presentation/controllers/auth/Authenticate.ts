import { type AuthenticateUseCase } from '../../../domain/usecases/AuthenticateUseCase'
import { BadRequestError } from '../../helpers/errors/BadRequestError'
import { ServerError } from '../../helpers/errors/ServerError'
import { DefaultResponses } from '../../helpers/responses/DefaultResponses'
import { type HttpRequest, type HttpResponse, type Controller } from '../ControllerType'

export class AuthenticateController implements Controller {
  constructor (private readonly authenticateUseCase: AuthenticateUseCase) {}
  async handle (request: HttpRequest): Promise<HttpResponse> {
    const responses = new DefaultResponses()
    try {
      const { email, password } = request.body
      if (!request.body) {
        return responses.error(new BadRequestError())
      }
      const body = await this.authenticateUseCase.signIn({ email, password })
      return responses.success(body)
    } catch (er) {
      return responses.error(new ServerError())
    }
  }
}
