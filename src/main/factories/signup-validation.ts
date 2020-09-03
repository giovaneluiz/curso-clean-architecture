
import { ValidationComposite } from '../../presentation/helpers/validators/validation-composite'
import { RequiredFielValidation } from '../../presentation/helpers/validators/required-field-validation'

export const makeSignUpValidation = (): ValidationComposite => {
  return new ValidationComposite([
    new RequiredFielValidation('name'),
    new RequiredFielValidation('email'),
    new RequiredFielValidation('password'),
    new RequiredFielValidation('passwordConfirmation')
  ])
}
