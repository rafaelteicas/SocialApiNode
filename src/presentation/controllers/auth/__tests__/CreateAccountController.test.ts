import { type AccountModel } from '../../../../domain/models/AccountModel'
import { type EmailValidatorUseCase } from '../../../../domain/usecases/EmailValidatorUseCase'
import { type Controller } from '../../ControllerType'
import { CreateAccountController } from '../CreateAccountController'

interface SutTypes {
  sut: Controller
  emailValidatorStub: EmailValidatorUseCase
}

const data = '14/06/2002'
const splitData = data.split('/')

const mockedAccount: AccountModel = {
  id: 1,
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

describe('CreateAccountController', () => {
  it('should return BadRequest if missing params', async () => {
    const { sut } = makeSut()
    const httpResponse = await sut.handle({ body: { ...mockedAccount.birthday } })
    expect(httpResponse).toEqual({
      body: 'Bad request',
      statusCode: 400
    })
  })
  it('should validate email', async () => {
    const { sut, emailValidatorStub } = makeSut()
    jest.spyOn(emailValidatorStub, 'validate').mockReturnValueOnce(false)
    const httpResponse = await sut.handle({
      body: { ...mockedAccount, email: 'fake_email' }
    })
    expect(httpResponse).toEqual({
      body: 'Bad request',
      statusCode: 400
    })
  })
})
