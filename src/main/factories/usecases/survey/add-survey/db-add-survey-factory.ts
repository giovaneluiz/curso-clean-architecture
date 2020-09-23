import { DbAddSurvey } from '../../../../../data/usecases/survey/add/db-add-survey'
import { AddSurvey } from '../../../../../domain/usecases/survey/add-survey'
import { SurveyMongoRepository } from '../../../../../infra/db/mongodb/survey/survey-mongo-repository.'

export const makeDbAddSurvey = (): AddSurvey => {
  const surveyMongoRepository = new SurveyMongoRepository()
  return new DbAddSurvey(surveyMongoRepository)
}