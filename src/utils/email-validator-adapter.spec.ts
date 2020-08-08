import { EmailValidatorAdapter } from './email-validator-adapter'

describe('Email Validator Adapter', () => {
  test('Should return false if validator returns false', () => {
    const sut = new EmailValidatorAdapter()
    const isValid = sut.isValid('invalid_mail@mail.com')
    expect(isValid).toBe(false)
  })
})
