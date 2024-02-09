import { type SignInDataModel, type AccountModel } from '../../../../domain/models/AccountModel'
import { type AuthenticateUseCase } from '../../../../domain/usecases/AuthenticateUseCase'
import { BadRequestError } from '../../../helpers/errors/BadRequestError'
import { ServerError } from '../../../helpers/errors/ServerError'
import { DefaultResponses } from '../../../helpers/responses/DefaultResponses'
import { type Controller } from '../../ControllerType'
import { AuthenticateController } from '../Authenticate'

function makeAuthenticateControllerStub (): AuthenticateUseCase {
  class AuthenticateUseCaseStub implements AuthenticateUseCase {
    async signIn (signInData: SignInDataModel): Promise<AccountModel> {
      return await new Promise(resolve => {
        resolve({
          id: 'any_id',
          email: 'any_mail@mail.com',
          birthday: '01/01/2001',
          name: 'any_name',
          password: 'any_password',
          username: 'any_username'
        })
      })
    }
  }
  return new AuthenticateUseCaseStub()
}

interface SutTypes {
  sut: Controller
  authenticateUseCaseStub: AuthenticateUseCase
}

function makeSut (): SutTypes {
  const authenticateUseCaseStub = makeAuthenticateControllerStub()
  const sut = new AuthenticateController(authenticateUseCaseStub)
  return {
    sut,
    authenticateUseCaseStub
  }
}

const responses = new DefaultResponses()

describe('AuthenticateController', () => {
  it('should return bad request if no body is provided', async () => {
    const { sut } = makeSut()
    const response = await sut.handle({
      body: ''
    })
    expect(response).toStrictEqual(responses.error(new BadRequestError()))
  })
  it('should return bad request if SignUpUseCase throws an error', async () => {
    const { sut, authenticateUseCaseStub } = makeSut()
    jest.spyOn(authenticateUseCaseStub, 'signIn').mockRejectedValueOnce(new Error())
    const response = await sut.handle({
      body: {}
    })
    expect(response).toStrictEqual(responses.error(new ServerError()))
  })
})
