import { Validation } from '../../protocols/validation'
import { InvalidParamError } from '../../erros'

export class CompareFieldValidation implements Validation {
  private readonly fieldName: string
  private readonly fieldCompareName: string

  constructor (fieldName: string, fieldCompareName: string) {
    this.fieldName = fieldName
    this.fieldCompareName = fieldCompareName
  }

  validate (input: any): Error {
    if (input[this.fieldName] !== input[this.fieldCompareName]) {
      return new InvalidParamError(this.fieldCompareName)
    }
  }
}
