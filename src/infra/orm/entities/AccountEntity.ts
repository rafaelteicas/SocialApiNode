import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm'
import { IsEmail } from 'class-validator'
import { type CreateAccountModel } from '../../../domain/models/auth/CreateAccountModel'

@Entity({
  name: 'users'
})
export class AccountEntity implements CreateAccountModel {
  @PrimaryGeneratedColumn('uuid')
    id: number

  @Column()
  @IsEmail()
    email: string

  @Column()
    name: string

  @Column()
    birthday: string

  @Column()
    username: string

  @Column()
    password: string

  @Column('timestamptz')
    createdAt: Date

  @Column('timestamptz')
    updatedAt: Date
}
