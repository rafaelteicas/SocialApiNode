import { type AccountModel } from '../../../domain/models/AccountModel'
import { UserRepository } from '../../../infra/orm/repositories'
import { CreateAccountRepository } from '../CreateAccountRepository'

const mockedAccount: AccountModel = {
  id: 1,
  birthday: new Date(),
  email: 'any_mail@mail.com',
  name: 'any_name',
  password: '12345678',
  username: 'any_username'
}

describe('CreateAccountRepository', () => {
  it('should call repository.create with correct values', () => {
    const mockedSave = jest.spyOn(UserRepository, 'save').mockResolvedValueOnce({
      ...mockedAccount,
      updatedAt: Date.now().toString(),
      createdAt: Date.now().toString()
    })
    const sut = new CreateAccountRepository(UserRepository)
    sut.create(mockedAccount)
    expect(mockedSave).toHaveBeenCalledWith(mockedAccount)
  })
})
