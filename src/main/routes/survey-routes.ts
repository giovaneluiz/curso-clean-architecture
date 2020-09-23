import { Router } from 'express'
import { middlewareAdapter } from '../adapters/express/express-middleware-adapter'
import { routeAdapter } from '../adapters/express/express-route-adapter'
import { makeAddSurveyController } from '../factories/controllers/survey/add-survey/add-survey-controller-factory'
import { makeAuthMiddleware } from '../factories/middlewares/auth-middleware-factory'

export default (router: Router): void => {
  const adminAuth = middlewareAdapter(makeAuthMiddleware('admin'))
  router.post('/surveys', adminAuth, routeAdapter(makeAddSurveyController()))
}
