import { Authenticate } from '../../../data/auth/Authenticate'
import { VerifyHashRepositoryImpl } from '../../../infra/bcrypt/VerifyHashRepositoryImpl'
import { TokenRepositoryImpl } from '../../../infra/jwt/TokenRepositoryImpl'
import { AuthenticateRepositoryImpl } from '../../../infra/orm/repositories/AuthenticateRepositoryImpl'
import { type Controller } from '../../../presentation/controllers/ControllerType'
import { AuthenticateController } from '../../../presentation/controllers/auth/Authenticate'

export function makeAuthenticate (): Controller {
  const tokenRepository = new TokenRepositoryImpl()
  const verifyHashRepository = new VerifyHashRepositoryImpl()
  const authenticateRepository = new AuthenticateRepositoryImpl()
  const authenticateUseCase = new Authenticate(
    authenticateRepository,
    verifyHashRepository,
    tokenRepository
  )
  return new AuthenticateController(authenticateUseCase)
}
