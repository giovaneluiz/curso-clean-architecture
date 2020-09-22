import request from 'supertest'
import app from '../config/app'
import { MongoHelper } from '../../infra/db/mongodb/helpers/mongo-helper'
import { Collection } from 'mongodb'

let surveyCollection: Collection

beforeAll(async () => {
  await MongoHelper.connect(process.env.MONGO_URL)
})

afterAll(async () => {
  await MongoHelper.disconnect()
})

beforeEach(async () => {
  surveyCollection = await MongoHelper.getCollection('surveys')
  await surveyCollection.deleteMany({})
})

describe('POST /add-survey', () => {
  test('Should return 204 on add survey success', async () => {
    await request(app)
      .post('/api/add-survey')
      .send({
        question: 'Question',
        answers: [{
          image: 'Answer 1',
          answer: 'any_answer'
        }, {
          answer: 'other_answer'
        }]
      })
      .expect(204)
  })
})