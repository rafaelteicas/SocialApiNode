export class MissingParamError extends Error {
  constructor (field: string) {
    super(`Missing ${field}`)
    this.name = 'MissingParamError'
  }
}
