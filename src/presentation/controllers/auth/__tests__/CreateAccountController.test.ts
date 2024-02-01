import { type CreateAccountType } from '../../../../domain/CreateAccountType'
import { type Controller } from '../../ControllerType'
import { CreateAccountController } from '../CreateAccountController'

interface SutTypes {
  sut: Controller
}

const data = '14/06/2002'
const splitData = data.split('/')

const mockedAccount: CreateAccountType = {
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

function makeSut (): SutTypes {
  const sut = new CreateAccountController()
  return {
    sut
  }
}

describe('CreateAccountController', () => {
  it('should return BadRequest if missing params', async () => {
    const { sut } = makeSut()
    const httpResponse = await sut.handle({ body: { ...mockedAccount.birthday } })
    expect(httpResponse).toEqual({
      body: 'Bad request error',
      statusCode: 400
    })
  })
})
