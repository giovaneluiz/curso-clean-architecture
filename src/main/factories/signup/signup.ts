import { SignupController } from '../../../presentation/controllers/signup/signup-controler'
import { DbAddAccount } from '../../../data/usecases/account/add/db-add-account'
import { BcryptAdapter } from '../../../infra/criptografy/bcrypt-adapter'
import { AccountMongoRepository } from '../../../infra/db/mongodb/account/account.-mong-repository.'
import { Controller } from '../../../presentation/protocols'
import { LogControllerDecorator } from '../../decorators/log-controller-decorator'
import { LogMongoRepository } from '../../../infra/db/mongodb/log/log-mongo-repository'
import { makeSignUpValidation } from './signup-validation-factory'

export const makeSignUpController = (): Controller => {
  const salt = 12
  const bcryptAdapter = new BcryptAdapter(salt)
  const addAccountRepository = new AccountMongoRepository()
  const addAccount = new DbAddAccount(bcryptAdapter, addAccountRepository)
  const logErrorRepository = new LogMongoRepository()
  const signupController = new SignupController(addAccount, makeSignUpValidation())
  return new LogControllerDecorator(signupController, logErrorRepository)
}
