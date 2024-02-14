import { type UserProfileModel } from '@/domain/models/user/UserProfileModel'

export interface GetUserRepository {
  getById: (id: string) => Promise<UserProfileModel | null>
}
