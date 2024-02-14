import { GetUser } from '@/data/user/GetUser'
import { GetUserRepositoryImpl } from '@/infra/orm/repositories/GetUserRepositoryImpl'
import { type Controller } from '@/presentation/controllers/ControllerType'
import { GetUserController } from '@/presentation/controllers/user/GetUserController'

export function makeGetUser (): Controller {
  const getUserRepository = new GetUserRepositoryImpl()
  const getUserUseCase = new GetUser(getUserRepository)
  return new GetUserController(getUserUseCase)
}
