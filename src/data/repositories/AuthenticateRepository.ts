export interface AuthenticateRepository {
  getAccountByEmail: (email: string) => Promise<any>
}
