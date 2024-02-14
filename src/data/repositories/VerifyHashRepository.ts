export interface VerifyHashRepository {
  compare: (data: string, hashedData: string) => Promise<boolean>
}
