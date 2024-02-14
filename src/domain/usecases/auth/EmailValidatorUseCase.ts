export interface EmailValidatorUseCase {
  validate: (email: string) => boolean
}
