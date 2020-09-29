import { Validation } from '@/presentation/protocols/validation'
import { MissingParamError } from '@/presentation/erros'

export class RequiredFieldValidation implements Validation {
  constructor (private readonly fieldName: string) {}

  validate (input: any): Error {
    if (!input[this.fieldName]) {
      return new MissingParamError(this.fieldName)
    }
  }
}
