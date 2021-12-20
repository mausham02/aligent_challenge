import test from 'japa'
import supertest from 'supertest'

const BASE_URL = `http://${process.env.HOST}:${process.env.PORT}`

test.group('Welcome', () => {
  test('Ensuring that the homepage works', async (assert) => {

    const res = await supertest(BASE_URL)
      .get('/')
      .expect('Content-Type', /json/)
      .expect(200)

    const body = res.body;

    assert.equal(body.Task, "This project is about finding the interval between two dates in days/complete weeks/ weekdays and optionally converting it into seconds/hours/minutes/years");
  })
})
