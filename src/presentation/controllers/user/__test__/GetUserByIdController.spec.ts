import { type GetUserUseCase } from '@/domain/usecases/user/GetUserUseCase'
import { GetUserController } from '../GetUserController'
import { type UserProfileModel } from '@/domain/models/user/UserProfileModel'
import { DefaultResponses } from '@/presentation/helpers/responses/DefaultResponses'

function makeGetUserUseCaseControllerStub (): GetUserUseCase {
  class GetUserUseCaseControllerStub implements GetUserUseCase {
    async getById (id: string): Promise<UserProfileModel | null> {
      return {
        id: 'any_id',
        name: 'any_name',
        profileImage: 'any_image',
        username: 'username'
      }
    }
  }
  return new GetUserUseCaseControllerStub()
}

interface SutTypes {
  sut: GetUserController
  getUserUseCaseControllerStub: GetUserUseCase
}

function makeSut (): SutTypes {
  const getUserUseCaseControllerStub = makeGetUserUseCaseControllerStub()
  const sut = new GetUserController(getUserUseCaseControllerStub)
  return {
    sut,
    getUserUseCaseControllerStub
  }
}

describe('GetUserById Controller', () => {
  const responses = new DefaultResponses()
  it('should return BadRequestError if no id is provided by params', async () => {
    const { sut } = makeSut()
    const response = await sut.handle({
      params: {
        id: ''
      }
    })
    expect(response).toEqual(responses.badRequest())
  })
  it('should return BadRequestError if user is not founded', async () => {
    const { sut, getUserUseCaseControllerStub } = makeSut()
    jest.spyOn(getUserUseCaseControllerStub, 'getById').mockResolvedValueOnce(null)
    const response = await sut.handle({
      params: {
        id: 'any_id'
      }
    })
    expect(response).toEqual(responses.badRequest())
  })
  it('should return a user if valid id is provided', async () => {
    const { sut } = makeSut()
    const response = await sut.handle({
      params: {
        id: 'any_id'
      }
    })
    expect(response).toEqual(responses.success({
      id: 'any_id',
      name: 'any_name',
      profileImage: 'any_image',
      username: 'username'
    }))
  })
})
