import { type GetUserRepository } from '@/data/repositories/user/GetUserRepository'
import { type UserProfileModel } from '@/domain/models/user/UserProfileModel'
import { accountRepository } from './AccountRepositoryImpl'

export class GetUserRepositoryImpl implements GetUserRepository {
  async getById (id: string): Promise<UserProfileModel | null> {
    const user = await accountRepository.findOneBy({ id }).catch(() => {
      return null
    })
    if (!user) return null
    return {
      id: user.id,
      username: user.username,
      name: user.name,
      profileImage: user.id
    }
  }
}
