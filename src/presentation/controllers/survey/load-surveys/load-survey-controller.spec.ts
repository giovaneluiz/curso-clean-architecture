import { LoadSurveysController } from './load-surveys-controller'
import { SurveyModel, LoadSurveys, HttpRequest } from './add-survey-controller-protocols'
import MockDate from 'mockdate'

const makeFakeSurveys = (): SurveyModel[] => {
  return [{
    id: 'any_id',
    question: 'any_question',
    answers: [{
      image: 'any_image',
      answer: 'any_answer'
    }],
    date: new Date()
  }, {
    id: 'any_id2',
    question: 'any_question2',
    answers: [{
      image: 'any_image2',
      answer: 'any_answer2'
    }],
    date: new Date()
  }]
}

describe('LoadSurveys Controller', () => {
  afterAll(() => {
    MockDate.set(new Date())
  })
  beforeAll(() => {
    MockDate.reset()
  })
  test('Should call LoadSurveys', async () => {
    class LoadSurveysSutb implements LoadSurveys {
      async load (): Promise<SurveyModel[]> {
        return new Promise(resolve => resolve(makeFakeSurveys()))
      }
    }
    const loadSurveysSutb = new LoadSurveysSutb()
    const loadSpy = jest.spyOn(loadSurveysSutb, 'load')
    const sut = new LoadSurveysController(loadSurveysSutb)
    await sut.handle({})
    expect(loadSpy).toHaveBeenCalled()
  })
})
