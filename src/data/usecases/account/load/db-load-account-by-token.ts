import { LoadAccountByToken } from '../../../../domain/usecases/account/load-account-by-token'
import { Decrypter } from '../../../protocols/criptografy/decrypter'
import { AccountModel } from '../../../../domain/models/account'
import { LoadAccountByTokenRepository } from '../../../protocols/db/account/load-account-by-token-repository'

export class DbLoadAccountByToken implements LoadAccountByToken {
  constructor (
    private readonly decrypter: Decrypter,
    private readonly loadAccountByTokenRopository: LoadAccountByTokenRepository
  ) {}

  async load (accessToken: string, role?: string): Promise<AccountModel> {
    const token = await this.decrypter.decrypt(accessToken)
    if (token) {
      const account = await this.loadAccountByTokenRopository.loadByToken(accessToken, role)
      if (account) return account
    }
    return null
  }
}
