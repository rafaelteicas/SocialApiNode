import { type AccountModel } from '../../../../domain/models/AccountModel'
import { type CreateAccountUseCase } from '../../../../domain/usecases/CreateAccountUseCase'
import { type EmailValidatorUseCase } from '../../../../domain/usecases/EmailValidatorUseCase'
import { BadRequestError } from '../../../helpers/errors/BadRequestError'
import { MissingParamError } from '../../../helpers/errors/MissingParamError'
import { ServerError } from '../../../helpers/errors/ServerError'
import { DefaultResponses } from '../../../helpers/responses/DefaultResponses'
import { type Controller } from '../../ControllerType'
import { CreateAccountController } from '../CreateAccountController'

const data = '14/06/2002'
const splitData = data.split('/')

const mockedAccount: AccountModel = {
  birthday: new Date(
    parseInt(splitData[0]),
    parseInt(splitData[1]),
    parseInt(splitData[2])
  ),
  email: 'any_mail@mail.com',
  name: 'name',
  password: 'any_password',
  username: 'username'
}

function makeCreateAccountUseCase (): CreateAccountUseCase {
  class CreateAccountUseCaseStub implements CreateAccountUseCase {
    async create (account: AccountModel): Promise<void> {}
  }
  return new CreateAccountUseCaseStub()
}

function makeEmailValidatorUseCase (): EmailValidatorUseCase {
  class EmailValidatorUseCaseStub implements EmailValidatorUseCase {
    validate (email: string): boolean {
      return true
    }
  }
  return new EmailValidatorUseCaseStub()
}

interface SutTypes {
  sut: Controller
  emailValidatorUseCaseStub: EmailValidatorUseCase
  createAccountUseCaseStub: CreateAccountUseCase
}

function makeSut (): SutTypes {
  const createAccountUseCaseStub = makeCreateAccountUseCase()
  const emailValidatorUseCaseStub = makeEmailValidatorUseCase()
  const sut = new CreateAccountController(
    emailValidatorUseCaseStub,
    createAccountUseCaseStub
  )
  return {
    sut,
    emailValidatorUseCaseStub,
    createAccountUseCaseStub
  }
}

const responses = new DefaultResponses()

describe('CreateAccountController', () => {
  it('should return MissingParam if missing params', async () => {
    const { sut } = makeSut()
    const httpResponse = await sut.handle({ body: { ...mockedAccount.birthday } })
    expect(httpResponse).toEqual(responses.error(new MissingParamError('email')))
  })
  it('should validate email', async () => {
    const { sut, emailValidatorUseCaseStub } = makeSut()
    jest.spyOn(emailValidatorUseCaseStub, 'validate').mockReturnValueOnce(
      false
    )
    const httpResponse = await sut.handle({
      body: { ...mockedAccount, email: 'fake_email' }
    })
    expect(httpResponse).toEqual(responses.error(new BadRequestError()))
  })
  it('should call repository with values and return created', async () => {
    const { sut } = makeSut()
    const httpResponse = await sut.handle({
      body: { ...mockedAccount }
    })
    expect(httpResponse).toEqual(responses.created())
  })
  it('should return badRequest if body is empty', async () => {
    const { sut } = makeSut()
    const httpResponse = await sut.handle({
      body: ''
    })
    expect(httpResponse).toEqual(responses.error(new BadRequestError()))
  })
  it('should throw if EmailValidatorUseCase throws', async () => {
    const { sut, emailValidatorUseCaseStub } = makeSut()
    jest.spyOn(emailValidatorUseCaseStub, 'validate').mockImplementationOnce(
      () => {
        throw new Error()
      }
    )
    const httpResponse = await sut.handle({
      body: { ...mockedAccount }
    })
    expect(httpResponse).toEqual(responses.error(new ServerError()))
  })
  it('should call CreateAccountUseCase with correct values', async () => {
    const { sut, createAccountUseCaseStub } = makeSut()
    const createUseCase = jest.spyOn(createAccountUseCaseStub, 'create')
    sut.handle({
      body: { ...mockedAccount }
    })
    expect(createUseCase).toHaveBeenCalledWith(mockedAccount)
  })
})
