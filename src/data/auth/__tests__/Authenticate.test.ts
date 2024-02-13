import { type AccountModel } from '../../../domain/models/auth/AccountModel'
import { type AuthenticateRepository } from '../../repositories/AuthenticateRepository'
import { type TokenRepository } from '../../repositories/TokenRepository'
import { type VerifyHashRepository } from '../../repositories/VerifyHashRepository'
import { Authenticate } from '../Authenticate'

function makeTokenRepository (): TokenRepository {
  class TokenRepositoryStub implements TokenRepository {
    generate (token: any): string {
      return 'any_token'
    };
  }
  return new TokenRepositoryStub()
}

function makeVerifyHashRepositoryStub (): VerifyHashRepository {
  class VerifyHashRepositoryStub implements VerifyHashRepository {
    async compare (data: string, hashedData: string): Promise<boolean> {
      return true
    }
  }
  return new VerifyHashRepositoryStub()
}

function makeAuthenticateRepositoryStub (): AuthenticateRepository {
  class AuthenticateRepositoryStub implements AuthenticateRepository {
    async getAccountByEmail (email: string): Promise<AccountModel | null> {
      return {
        id: 'any_id',
        birthday: '11/11/11',
        email: 'any_mail@mail.com',
        name: 'Any Name',
        username: 'any_username',
        password: 'hashed_password'
      }
    }
  }
  return new AuthenticateRepositoryStub()
}

interface SutTypes {
  sut: Authenticate
  authenticateRepositoryStub: AuthenticateRepository
  verifyHashRepositoryStub: VerifyHashRepository
  tokenRepositoryStub: TokenRepository
}

function makeSut (): SutTypes {
  const authenticateRepositoryStub = makeAuthenticateRepositoryStub()
  const verifyHashRepositoryStub = makeVerifyHashRepositoryStub()
  const tokenRepositoryStub = makeTokenRepository()
  const sut = new Authenticate(
    authenticateRepositoryStub,
    verifyHashRepositoryStub,
    tokenRepositoryStub
  )
  return {
    sut,
    authenticateRepositoryStub,
    verifyHashRepositoryStub,
    tokenRepositoryStub
  }
}
describe('Authenticate', () => {
  it('should return null if AuthenticateRepository not found an account with email provided', async () => {
    const { sut, authenticateRepositoryStub } = makeSut()
    jest.spyOn(authenticateRepositoryStub, 'getAccountByEmail').mockResolvedValueOnce(null)
    const result = await sut.signIn({ email: 'invalid_mail@mail.com', password: '123' })
    expect(result).toBeNull()
  })
  it('should return null if AuthenticateRepository not found an account with email provided', async () => {
    const { sut, authenticateRepositoryStub } = makeSut()
    jest.spyOn(authenticateRepositoryStub, 'getAccountByEmail').mockResolvedValueOnce(null)
    const result = await sut.signIn({ email: 'invalid_mail@mail.com', password: '123' })
    expect(result).toBeNull()
  })
  it('should VerifyHashRepository returns false if invalid password is provided', async () => {
    const { sut, verifyHashRepositoryStub } = makeSut()
    jest.spyOn(verifyHashRepositoryStub, 'compare').mockResolvedValueOnce(false)
    const result = await sut.signIn({
      email: 'invalid_mail@mail.com',
      password: '123'
    })
    expect(result).toBeFalsy()
  })
  it('should return a token if success', async () => {
    const { sut } = makeSut()
    const result = await sut.signIn({
      email: 'valid_mail@mail.com',
      password: '123'
    })
    expect(result).toStrictEqual({ token: 'any_token' })
  })
})
