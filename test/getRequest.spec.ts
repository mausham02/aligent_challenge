import test from 'japa'
import supertest from 'supertest'

const BASE_URL = `http://${process.env.HOST}:${process.env.PORT}`

test.group('Welcome', () => {
  test('ensure home page works', async (assert) => {
    
    const res = await supertest(BASE_URL)
      .get('/')
      .expect('Content-Type', /json/)
      .expect(200)
    
    const body = res.body;

    assert.equal(body.Task, 'Aligent Programming Test');
  })
})
