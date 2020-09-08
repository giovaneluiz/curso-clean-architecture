import { HttpRequest, HttpResponse, Controller, EmailValidator, AddAccount } from './signup-protocols'
import { InvalidParamError } from '../../erros'
import { badRequest, serverError, httpSuccess } from '../../helpers/http/http-helper'
import { Validation } from '../../helpers/validators/validation'

export class SignupController implements Controller {
  private readonly emailValidator: EmailValidator
  private readonly addAcount: AddAccount
  private readonly validation: Validation

  constructor (emailValidator: EmailValidator, addAcount: AddAccount, validation: Validation) {
    this.emailValidator = emailValidator
    this.addAcount = addAcount
    this.validation = validation
  }

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const error = this.validation.validate(httpRequest.body)
      if (error) {
        return badRequest(error)
      }
      const { name, email, password } = httpRequest.body
      const isValid = this.emailValidator.isValid(email)
      if (!isValid) {
        return badRequest(new InvalidParamError('email'))
      }
      const account = await this.addAcount.add({
        name,
        email,
        password
      })
      return httpSuccess(account)
    } catch (error) {
      return serverError(error)
    }
  }
}
