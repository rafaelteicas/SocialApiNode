import { isEmail } from 'class-validator'
import { type EmailValidatorUseCase } from '../domain/usecases/auth/EmailValidatorUseCase'

export class EmailValidator implements EmailValidatorUseCase {
  validate (email: string): boolean {
    return isEmail(email)
  }
}
