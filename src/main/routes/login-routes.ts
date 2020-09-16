import { Router } from 'express'
import { routeAdapter } from '../adapters/express/express-route-adapter'
import { makeLoginController } from '../factories/login/login-factory'
import { makeSignUpController } from '../factories/signup/signup'

export default (router: Router): void => {
  router.post('/signup', routeAdapter(makeSignUpController()))
  router.post('/login', routeAdapter(makeLoginController()))
}
