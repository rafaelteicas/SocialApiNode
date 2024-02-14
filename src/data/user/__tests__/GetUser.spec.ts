import { type GetUserRepository } from '@/data/repositories/user/GetUserRepository'
import { GetUser } from '../GetUser'
import { type UserProfileModel } from '@/domain/models/user/UserProfileModel'

function makeGetUserRepositoryStub (): GetUserRepository {
  class GetUserRepositoryStub implements GetUserRepository {
    async getById (id: string): Promise<UserProfileModel | null> {
      return {
        id: 'any_id',
        name: 'Any Name',
        username: 'any_username',
        profileImage: 'any'
      }
    }
  }
  return new GetUserRepositoryStub()
}

interface SutTypes {
  sut: GetUser
  getUserRepositoryStub: GetUserRepository
}

function makeSut (): SutTypes {
  const getUserRepositoryStub = makeGetUserRepositoryStub()
  const sut = new GetUser(getUserRepositoryStub)
  return {
    sut,
    getUserRepositoryStub
  }
}

describe('GetUser', () => {
  it('should return null if user is not found', async () => {
    const { sut, getUserRepositoryStub } = makeSut()
    jest.spyOn(getUserRepositoryStub, 'getById').mockResolvedValueOnce(null)
    const result = await sut.getById('false_id')
    expect(result).toBeNull()
  })
  it('should return user if id is valid', async () => {
    const { sut } = makeSut()
    const result = await sut.getById('valid_id')
    expect(result).toEqual({
      id: 'any_id',
      name: 'Any Name',
      username: 'any_username',
      profileImage: 'any'
    })
  })
})
