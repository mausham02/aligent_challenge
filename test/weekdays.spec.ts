import test from 'japa'
import supertest from 'supertest'

const BASE_URL = `http://${process.env.HOST}:${process.env.PORT}`


test.group('weekdays endpoint', () => {
  test('ensure that the weekdays end points work', async (assert) => {
    
    const res = await supertest(BASE_URL)
      .post('/weekdays')
      .send({
          "first_date": "2021-03-20T00:01:00 Asia/Damascus",
          "second_date": "2021-03-21T00:01:00 Asia/Kuwait",
          "timezone": "Asia/Kuala_Lumpur"
      })
      .expect(200)
    
    const {result} = res.body;

    assert.equal(result, 0);
  })
})