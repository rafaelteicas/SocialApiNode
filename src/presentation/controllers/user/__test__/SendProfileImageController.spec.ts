import { DefaultResponses } from '@/presentation/helpers/responses/DefaultResponses'
import { type Controller } from '../../ControllerType'
import { SendProfileImageController } from '../SendProfileImageController'

interface SutTypes {
  sut: Controller
}

function makeSut (): SutTypes {
  const sut = new SendProfileImageController()
  return {
    sut
  }
}

const responses = new DefaultResponses()

describe('SendProfileImage Controller', () => {
  it('should return BadRequestError if no body is provided', async () => {
    const { sut } = makeSut()
    const response = await sut.handle({})
    expect(response).toEqual(responses.badRequest())
  })
})
