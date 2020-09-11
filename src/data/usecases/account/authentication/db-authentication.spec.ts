import { AccountModel } from '../add/db-add-account-protocols'
import { LoadAccountByEmailRepository } from '../../../protocols/loadAccountByEmailRepository'
import { DbAuthentication } from './db-authentication'
import { AuthenticationModel } from '../../../../domain/usecases/authentication'

describe('DbAuthentication Usecase', () => {
  const fakeAuthentication: AuthenticationModel = {
    email: 'any_email@mail.com',
    password: 'any_password'
  }
  test('Should call LoadAccountByEmailRepository with correct email', async () => {
    class LoadAccountByEmailRepositoryStub implements LoadAccountByEmailRepository {
      async load (email: string): Promise<AccountModel> {
        const account: AccountModel = {
          id: 'any_id',
          name: 'any_name',
          email: 'any_email@mail.com',
          password: 'any_password'
        }
        return new Promise(resolve => resolve(account))
      }
    }
    const loadAccountByEmailRepositoryStub = new LoadAccountByEmailRepositoryStub()
    const sut = new DbAuthentication(loadAccountByEmailRepositoryStub)
    const loadSpy = jest.spyOn(loadAccountByEmailRepositoryStub, 'load')
    await sut.auth(fakeAuthentication)
    expect(loadSpy).toHaveBeenCalledWith('any_email@mail.com')
  })
})
