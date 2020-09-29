import { routeAdapter } from '@/main/adapters/express/express-route-adapter'
import { makeLoginController } from '@/main/factories/controllers/account/login/login-controller-factory'
import { makeSignUpController } from '@/main/factories/controllers/account/signup/signup-controller-factory'
import { Router } from 'express'

export default (router: Router): void => {
  router.post('/signup', routeAdapter(makeSignUpController()))
  router.post('/login', routeAdapter(makeLoginController()))
}
