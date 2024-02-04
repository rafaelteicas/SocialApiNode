import { AppDataSource } from '../AppDataSource'
import { AccountEntity } from '../entities/AccountEntity'

export const UserRepository = AppDataSource.getRepository(AccountEntity)
