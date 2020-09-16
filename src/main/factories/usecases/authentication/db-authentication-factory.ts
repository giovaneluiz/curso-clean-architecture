import env from '../../../config/env'
import { DbAuthentication } from '../../../../data/usecases/account/authentication/db-authentication'
import { AccountMongoRepository } from '../../../../infra/db/mongodb/account/account.-mongo-repository.'
import { BcryptAdapter } from '../../../../infra/criptografy/bcrypt-adapter/bcrypt-adapter'
import { JwtAdapter } from '../../../../infra/criptografy/jwt-adapter/jwt-adapter'
import { Authentication } from '../../../../domain/usecases/authentication'

export const makeDbAuthentication = (): Authentication => {
  const salt = 12
  const bcryptAdapter = new BcryptAdapter(salt)
  const jwtAdaptapter = new JwtAdapter(env.jwtSecret)
  const accountMongoRepository = new AccountMongoRepository()
  return new DbAuthentication(accountMongoRepository, bcryptAdapter, jwtAdaptapter, accountMongoRepository)
}
