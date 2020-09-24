import { httpSuccess } from '../../../helpers/http/http-helper'
import { Controller, HttpRequest, HttpResponse, LoadSurveys } from './add-survey-controller-protocols'

export class LoadSurveysController implements Controller {
  constructor (private readonly loadSurveys: LoadSurveys) {}

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    const surveys = await this.loadSurveys.load()
    return httpSuccess(surveys)
  }
}
