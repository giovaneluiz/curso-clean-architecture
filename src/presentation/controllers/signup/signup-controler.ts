import { HttpRequest, HttpResponse, Controller, AddAccount } from './signup-controller-protocols'
import { badRequest, serverError, httpSuccess } from '../../helpers/http/http-helper'
import { Validation } from '../../protocols/validation'
import { Authentication } from '../signup/signup-controller-protocols'

export class SignupController implements Controller {
  constructor (
    private readonly addAcount: AddAccount,
    private readonly validation: Validation,
    private readonly authentication: Authentication
  ) {}

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const error = this.validation.validate(httpRequest.body)
      if (error) {
        return badRequest(error)
      }
      const { name, email, password } = httpRequest.body
      const account = await this.addAcount.add({
        name,
        email,
        password
      })
      await this.authentication.auth({
        email,
        password
      })
      return httpSuccess(account)
    } catch (error) {
      return serverError(error)
    }
  }
}
