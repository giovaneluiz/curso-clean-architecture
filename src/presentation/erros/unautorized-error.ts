export class UnautorizedError extends Error {
  constructor () {
    super('UnautorizedError Error')
    this.name = 'UnautorizedError'
  }
}
