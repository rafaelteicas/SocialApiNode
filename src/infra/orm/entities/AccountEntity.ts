import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm'
import { type AccountModel } from '../../../domain/models/AccountModel'
import { IsEmail } from 'class-validator'

@Entity()
export class AccountEntity implements AccountModel {
  @PrimaryGeneratedColumn()
    id: number

  @Column()
  @IsEmail()
    email: string

  @Column()
    name: string

  @Column('date')
    birthday: Date

  @Column()
    username: string

  @Column()
    password: string

  @Column('timestamptz')
    createdAt: string

  @Column('timestamptz')
    updatedAt: string
}
