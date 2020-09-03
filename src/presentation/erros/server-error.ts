export class ServerError extends Error {
  constructor (stack: string) {
    super('Internal Server Error')
    this.name = 'MissingParamError'
    this.stack = stack
  }
}
