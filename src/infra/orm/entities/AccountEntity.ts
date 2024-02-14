import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm'
import { IsEmail } from 'class-validator'
import { type CreateAccountModel } from '../../../domain/models/auth/CreateAccountModel'

@Entity({
  name: 'users'
})
export class AccountEntity implements CreateAccountModel {
  @PrimaryGeneratedColumn('uuid')
    id: string

  @IsEmail()
  @Column({ type: 'varchar' })
    email: string

  @Column({ type: 'varchar' })
    name: string

  @Column({ type: 'varchar' })
    birthday: string

  @Column({ type: 'varchar' })
    username: string

  @Column({ type: 'varchar' })
    password: string

  @Column('timestamptz')
    createdAt: Date

  @Column('timestamptz')
    updatedAt: Date
}
