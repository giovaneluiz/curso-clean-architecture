import { RequiredFieldValidation } from './required-field-validation'
import supertest from 'supertest'
import { MissingParamError } from '../../erros'

describe('RequiredField Validation', () => {
  test('Should return a MissingParamError', () => {
    const sut = new RequiredFieldValidation('field')
    const error = sut.validate({ name: 'any_name' })
    expect(error).toEqual(new MissingParamError('field'))
  })
})
