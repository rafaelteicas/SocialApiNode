import { type UserProfileModel } from '@/domain/models/user/UserProfileModel'
import { type GetUserUseCase } from '@/domain/usecases/user/GetUserUseCase'
import { type GetUserRepository } from '../repositories/user/GetUserRepository'

export class GetUser implements GetUserUseCase {
  constructor (private readonly getUserRepository: GetUserRepository) {}
  async getById (id: string): Promise<UserProfileModel | null> {
    const user = await this.getUserRepository.getById(id)
    if (user) {
      return user
    }
    return null
  }
}
