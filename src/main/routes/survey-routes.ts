import { Router } from 'express'
import { middlewareAdapter } from '../adapters/express/express-middleware-adapter'
import { routeAdapter } from '../adapters/express/express-route-adapter'
import { makeAddSurveyController } from '../factories/controllers/survey/add-survey/add-survey-controller-factory'
import { makeLoadSurveysController } from '../factories/controllers/survey/list-survey/load-surveys-controller-factory'
import { makeAuthMiddleware } from '../factories/middlewares/auth-middleware-factory'

export default (router: Router): void => {
  const adminAuth = middlewareAdapter(makeAuthMiddleware('admin'))
  const auth = middlewareAdapter(makeAuthMiddleware())
  router.post('/surveys', adminAuth, routeAdapter(makeAddSurveyController()))
  router.get('/surveys', auth, routeAdapter(makeLoadSurveysController()))
}
