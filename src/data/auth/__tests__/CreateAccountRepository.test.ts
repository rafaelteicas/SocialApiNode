import { type AccountModel } from '../../../domain/models/AccountModel'
import { type CreateAccountRepository } from '../../repositories/CreateAccountRepository'
import { CreateAccount } from '../CreateAccount'

const mockedAccount: AccountModel = {
  email: 'any_mail@mail.com',
  name: 'any_name',
  password: '12345678',
  birthday: new Date(),
  username: 'any_username'
}

interface SutTypes {
  sut: CreateAccount
  createAccountRepositoryStub: CreateAccountRepository
}

function makeCreateAccountRepositoryStub (): CreateAccountRepository {
  class CreateAccountRepositoryStub implements CreateAccountRepository {
    async save (data: AccountModel): Promise<void> {}
  }
  return new CreateAccountRepositoryStub()
}

function makeSut (): SutTypes {
  const createAccountRepositoryStub = makeCreateAccountRepositoryStub()
  const sut = new CreateAccount(createAccountRepositoryStub)
  return {
    sut,
    createAccountRepositoryStub
  }
}

describe('CreateAccountRepository', () => {
  it('should call repository.create with correct values', () => {
    const { sut, createAccountRepositoryStub } = makeSut()
    const repository = jest.spyOn(createAccountRepositoryStub, 'save')
    sut.create(mockedAccount)
    expect(repository).toHaveBeenCalledWith(mockedAccount)
  })
})
