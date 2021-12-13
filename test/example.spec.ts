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

test.group('endpoints', () => {
  test('ensure endpoints work', async (assert) => {
    
    const res = await supertest(BASE_URL)
      .post('/days')
      .send({
          "first_date": "2021-03-20T00:01:00 Asia/Damascus",
          "second_date": "2021-03-21T00:01:00 Asia/Kuwait",
          "format": "days",
          "timezone": "Asia/Kuala_Lumpur"
      })
      .expect(200)
    
    const {result} = res.body;

    assert.equal(result, 0);
  })

  test('testing missing parameter', async (assert) => {
    
    const res = await supertest(BASE_URL)
      .post('/days')
      .send({
          "second_date": "2021-03-21T00:01:00 Asia/Kuwait",
          "format": "asdasd",
          "timezone": "Asia/Kuala_Lumpur"
      })
      .expect(400)
    
    const {message} = res.body;

    assert.equal(message, 'Missing parameters');
  })

  test('check invalid dates', async (assert) => {
    
    let res = await supertest(BASE_URL)
      .post('/days')
      .send({
          "first_date": "sdfdsfsdf",
          "second_date": "2021-03-21T00:01:00 Asia/Kuwait",
          "format": "days",
          "timezone": "Asia/Kuala_Lumpur"
      })
      .expect(400)
    
    let {message} = res.body;

    assert.equal(message, 'Date has been provided in incorrect form');

    res = await supertest(BASE_URL)
      .post('/days')
      .send({
          "first_date": "2021-03-21T00:01:00 Asia/Kuwait",
          "second_date": "2021-03-21T00:01:0F",
          "format": "days",
          "timezone": "Asia/Kuala_Lumpur"
      })
      .expect(400)

    assert.equal(res.body.message, 'Date has been provided in incorrect form');
  })
})

