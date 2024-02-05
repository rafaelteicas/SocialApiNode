import { type AccountModel } from '../../../domain/models/AccountModel'
import { type CreateAccountRepository } from '../../repositories/CreateAccountRepository'
import { type HashRepository } from '../../repositories/HashRepository'
import { CreateAccount } from '../CreateAccount'

const mockedAccount: AccountModel = {
  email: 'any_mail@mail.com',
  name: 'any_name',
  password: '12345678',
  birthday: new Date(),
  username: 'any_username'
}

function makeCreateAccountRepositoryStub (): CreateAccountRepository {
  class CreateAccountRepositoryStub implements CreateAccountRepository {
    async checkIfExists (email: string): Promise<boolean> {
      return false
    }

    async save (data: AccountModel): Promise<void> {}
  }
  return new CreateAccountRepositoryStub()
}

function makeHashPasswordStub (): HashRepository {
  class HashPasswordStub implements HashRepository {
    async hash (data: string): Promise<string> {
      return 'hashed_password'
    }
  }
  return new HashPasswordStub()
}

interface SutTypes {
  sut: CreateAccount
  createAccountRepositoryStub: CreateAccountRepository
  hashPasswordStub: HashRepository
}

function makeSut (): SutTypes {
  const createAccountRepositoryStub = makeCreateAccountRepositoryStub()
  const hashPasswordStub = makeHashPasswordStub()
  const sut = new CreateAccount(createAccountRepositoryStub, hashPasswordStub)
  return {
    sut,
    createAccountRepositoryStub,
    hashPasswordStub
  }
}

describe('CreateAccountRepository', () => {
  it('should call repository.create with correct values', async () => {
    const { sut, createAccountRepositoryStub } = makeSut()
    const saveAccount = jest.spyOn(createAccountRepositoryStub, 'save')
    jest.spyOn(createAccountRepositoryStub, 'checkIfExists').mockResolvedValueOnce(false)
    await sut.create(mockedAccount)
    expect(saveAccount).toHaveBeenCalledWith({
      ...mockedAccount,
      password: 'hashed_password'
    })
  })
})
