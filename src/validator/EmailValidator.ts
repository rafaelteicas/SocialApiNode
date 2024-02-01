import { type EmailValidatorUseCase } from '../domain/usecases/EmailValidatorUseCase'

export class EmailValidator implements EmailValidatorUseCase {
  validate (email: string): boolean {
    return true
  }
}
