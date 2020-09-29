import { HttpResponse } from '@/presentation/protocols/http'
import { ServerError, UnautorizedError } from '@/presentation/erros'

export const httpSuccess = (data: any): HttpResponse => ({
  statusCode: 200,
  body: data
})

export const noContent = (): HttpResponse => ({
  statusCode: 204,
  body: null
})

export const badRequest = (error: Error): HttpResponse => ({
  statusCode: 400,
  body: error
})

export const unautorized = (): HttpResponse => ({
  statusCode: 401,
  body: new UnautorizedError()
})

export const serverError = (error: Error): HttpResponse => ({
  statusCode: 500,
  body: new ServerError(error.stack)
})

export const forbidden = (error: Error): HttpResponse => ({
  statusCode: 403,
  body: error
})
