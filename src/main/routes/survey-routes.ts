import { routeAdapter } from '@/main/adapters/express/express-route-adapter'
import { makeAddSurveyController } from '@/main/factories/controllers/survey/add-survey/add-survey-controller-factory'
import { makeLoadSurveysController } from '@/main/factories/controllers/survey/load-survey/load-surveys-controller-factory'
import { adminAuth } from '@/main/middlewares/admin-auth'
import { auth } from '@/main/middlewares/auth'
import { Router } from 'express'

export default (router: Router): void => {
  router.post('/surveys', adminAuth, routeAdapter(makeAddSurveyController()))
  router.get('/surveys', auth, routeAdapter(makeLoadSurveysController()))
}
