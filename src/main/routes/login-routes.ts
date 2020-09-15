import { Router } from 'express'
import { routeAdapter } from '../adapters/express/express-route-adapter'
import { makeSignUpController } from '../factories/signup/signup'

export default (router: Router): void => {
  router.post('/signup', routeAdapter(makeSignUpController()))
}
