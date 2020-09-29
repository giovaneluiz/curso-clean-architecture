import { HttpRequest, HttpResponse, Controller, AddAccount, Authentication } from './signup-controller-protocols'
import { badRequest, serverError, httpSuccess, forbidden } from '@/presentation/helpers/http/http-helper'
import { Validation } from '@/presentation/protocols/validation'
import { EmailInUseError } from '@/presentation/erros'

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
      if (!account) {
        return forbidden(new EmailInUseError())
      }
      const accessToken = await this.authentication.auth({
        email,
        password
      })
      return httpSuccess({ accessToken })
    } catch (error) {
      return serverError(error)
    }
  }
}
