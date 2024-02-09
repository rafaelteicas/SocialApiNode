import { type AuthenticateRepository } from '../../repositories/AuthenticateRepository'
import { type VerifyHashRepository } from '../../repositories/VerifyHashRepository'
import { Authenticate } from '../Authenticate'

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
    async getAccountByEmail (email: string): Promise<any> {
      return ''
    }
  }
  return new AuthenticateRepositoryStub()
}

interface SutTypes {
  sut: Authenticate
  authenticateRepositoryStub: AuthenticateRepository
  verifyHashRepositoryStub: VerifyHashRepository
}

function makeSut (): SutTypes {
  const authenticateRepositoryStub = makeAuthenticateRepositoryStub()
  const verifyHashRepositoryStub = makeVerifyHashRepositoryStub()
  const sut = new Authenticate(
    authenticateRepositoryStub,
    verifyHashRepositoryStub
  )
  return {
    sut,
    authenticateRepositoryStub,
    verifyHashRepositoryStub
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
})
