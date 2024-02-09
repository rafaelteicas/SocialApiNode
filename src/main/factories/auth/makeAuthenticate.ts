import { Authenticate } from '../../../data/auth/Authenticate'
import { VerifyHashRepositoryImpl } from '../../../infra/bcrypt/VerifyHashRepositoryImpl'
import { AuthenticateRepositoryImpl } from '../../../infra/orm/repositories/AuthenticateRepositoryImpl'
import { type Controller } from '../../../presentation/controllers/ControllerType'
import { AuthenticateController } from '../../../presentation/controllers/auth/Authenticate'

export function makeAuthenticate (): Controller {
  const verifyHashRepository = new VerifyHashRepositoryImpl()
  const authenticateRepository = new AuthenticateRepositoryImpl()
  const authenticateUseCase = new Authenticate(
    authenticateRepository,
    verifyHashRepository
  )
  return new AuthenticateController(authenticateUseCase)
}
