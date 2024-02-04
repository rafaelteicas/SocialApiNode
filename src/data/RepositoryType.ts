import { type Repository as ORMRepository } from 'typeorm'

export type Repository = ORMRepository<Record<string, any>>
