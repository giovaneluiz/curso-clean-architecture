import { LoadSurveysController } from './load-surveys-controller'
import { SurveyModel, LoadSurveys } from './load-survey-controller-protocols'
import { httpSuccess, noContent, serverError } from '@/presentation/helpers/http/http-helper'
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

interface SutTypes {
  sut: LoadSurveysController
  loadSurveysSutb: LoadSurveys
}

const makeLoadSurveys = (): LoadSurveys => {
  class LoadSurveysSutb implements LoadSurveys {
    async load (): Promise<SurveyModel[]> {
      return new Promise(resolve => resolve(makeFakeSurveys()))
    }
  }
  return new LoadSurveysSutb()
}

const makeSut = (): SutTypes => {
  const loadSurveysSutb = makeLoadSurveys()
  const sut = new LoadSurveysController(loadSurveysSutb)
  return {
    sut,
    loadSurveysSutb
  }
}

describe('LoadSurveys Controller', () => {
  afterAll(() => {
    MockDate.set(new Date())
  })
  beforeAll(() => {
    MockDate.reset()
  })
  test('Should call LoadSurveys', async () => {
    const { sut, loadSurveysSutb } = makeSut()
    const loadSpy = jest.spyOn(loadSurveysSutb, 'load')
    await sut.handle({})
    expect(loadSpy).toHaveBeenCalled()
  })
  test('Should return 200 on success', async () => {
    const { sut } = makeSut()
    const httpRespose = await sut.handle({})
    expect(httpRespose).toEqual(httpSuccess(makeFakeSurveys()))
  })
  test('Should return 204 if LoadSurveys returns empty', async () => {
    const { sut, loadSurveysSutb } = makeSut()
    jest.spyOn(loadSurveysSutb, 'load').mockReturnValueOnce(new Promise(resolve => resolve([])))
    const httpRespose = await sut.handle({})
    expect(httpRespose).toEqual(noContent())
  })
  test('Should return 500 if AddSurvey throws', async () => {
    const { sut, loadSurveysSutb } = makeSut()
    jest.spyOn(loadSurveysSutb, 'load').mockReturnValueOnce(new Promise((resolve, reject) => reject(new Error())))
    const httpResponse = await sut.handle({})
    expect(httpResponse).toEqual(serverError(new Error()))
  })
})
