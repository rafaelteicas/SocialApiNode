import { type AccountModel } from '../../../../domain/models/AccountModel'
import { type EmailValidatorUseCase } from '../../../../domain/usecases/EmailValidatorUseCase'
import { BadRequestError } from '../../../helpers/errors/BadRequestError'
import { MissingParamError } from '../../../helpers/errors/MissingParamError'
import { ServerError } from '../../../helpers/errors/ServerError'
import { DefaultResponses } from '../../../helpers/responses/DefaultResponses'
import { type Controller } from '../../ControllerType'
import { CreateAccountController } from '../CreateAccountController'

interface SutTypes {
  sut: Controller
  emailValidatorStub: EmailValidatorUseCase
}

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

function makeEmailValidator (): EmailValidatorUseCase {
  class EmailValidatorStub implements EmailValidatorUseCase {
    validate (email: string): boolean {
      return true
    }
  }
  return new EmailValidatorStub()
}

function makeSut (): SutTypes {
  const emailValidatorStub = makeEmailValidator()
  const sut = new CreateAccountController(emailValidatorStub)
  return {
    sut,
    emailValidatorStub
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
    const { sut, emailValidatorStub } = makeSut()
    jest.spyOn(emailValidatorStub, 'validate').mockReturnValueOnce(false)
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
  it('should throw if email validator throws', async () => {
    const { sut, emailValidatorStub } = makeSut()
    jest.spyOn(emailValidatorStub, 'validate').mockImplementationOnce(() => { throw new Error() })
    const httpResponse = await sut.handle({
      body: { ...mockedAccount }
    })
    expect(httpResponse).toEqual(responses.error(new ServerError()))
  })
})
