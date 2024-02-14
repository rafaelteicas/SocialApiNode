import { type UserProfileModel } from '@/domain/models/user/UserProfileModel'

export interface GetUserUseCase {
  getById: (id: string) => Promise<UserProfileModel | null>
}
