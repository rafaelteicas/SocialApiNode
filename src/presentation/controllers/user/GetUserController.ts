import { DefaultResponses } from '@/presentation/helpers/responses/DefaultResponses'
import { type Controller, type HttpRequest, type HttpResponse } from '../ControllerType'
import { type GetUserUseCase } from '@/domain/usecases/user/GetUserUseCase'

interface ParamsType {
  id: string
}

export class GetUserController implements Controller {
  constructor (
    private readonly userUseCase: GetUserUseCase
  ) {}

  async handle (request: HttpRequest<any, ParamsType>): Promise<HttpResponse> {
    const responses = new DefaultResponses()
    try {
      if (!request.params) {
        return responses.badRequest()
      }
      const { id } = request.params
      if (!id) {
        return responses.badRequest()
      }
      const user = await this.userUseCase.getById(id)
      if (!user) {
        return responses.badRequest()
      }
      return responses.success(user)
    } catch (er) {
      return responses.serverError()
    }
  }
}
