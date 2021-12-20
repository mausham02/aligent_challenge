import test from 'japa'
import supertest from 'supertest'

const BASE_URL = `http://${process.env.HOST}:${process.env.PORT}`


test.group('Test for /weekdays Endpoint', () => {
  // Test: 1 -> checking if the /weekdays endpoint works
  test('ensure that the /weekdays end points work', async (assert) => {

    const res = await supertest(BASE_URL)
      .post('/weekdays')
      .send({
        "first_date": "2021-03-20T00:01:00 Asia/Damascus",
        "second_date": "2021-03-21T00:01:00 Asia/Kuwait",
        "timezone": "Asia/Kuala_Lumpur"
      })
      .expect(200)

    const { result } = res.body;

    assert.equal(result, 0);
  })

  // Test 2 -> Checking if any or both of the dates are missing
  test("Testing for the missing either of first date or second date parameter", async (assert) => {
    const res = await supertest(BASE_URL)
      .post('/weekdays')
      .send({
        "first_date": "2021-03-20T00:01:00 Asia/kuwait",
        "format": "seconds",
        "timezone": "Asia/Kuala_Lumpur"
      })
      .expect(400)

    const { error, parameter } = res.body;

    assert.equal(error, "Parameter is missing");
    assert.equal(parameter, "second_date")
  })

  // Test: 3 -> checking for invalid dates
  test("Checking invalid dates", async (assert) => {
    // Test : 3.1
    let res = await supertest(BASE_URL)
      .post('/weekdays')
      .send({
        "first_date": "sdfdsfsdf",
        "format": "seconds",
        "timezone": "Asia/Kuala_Lumpur"
      })
      .expect(400)

    const { error, parameter } = res.body;

    assert.equal(error, "Date is in incorrect form");
    assert.equal(parameter, "first_date")

    // Test : 3:2
    res = await supertest(BASE_URL)
      .post('/weekdays')
      .send({
        "first_date": "2021-03-21T00:01:00 Asia/Kuwait",
        "second_date": "2021-03-21T00:01:0F",
        "format": "days",
        "timezone": "Asia/Kuala_Lumpur"
      })
      .expect(400)


    assert.equal(res.body.error, 'Date is in incorrect form');
    assert.equal(res.body.parameter, "second_date")
  })


  // Test: 4 for /weekdays Endpoint
  test("Checking for format and timezone", async (assert) => {
    // Test : 4.1
    let res = await supertest(BASE_URL)
      .post('/weekdays')
      .send({
        "first_date": "2021-03-20T00:01:00 Asia/kuwait",
        "second_date": "2021-01-17T12:02:01 Asia/Kuala_Lumpur",
        "format": "seco",
        "timezone": "Asia/Kuala_Lumpur"
      })
      .expect(400)

    assert.equal(res.body.error, "Parameter is not acceptable")
    assert.equal(res.body.parameter, "format")

    // Test : 4.2
    res = await supertest(BASE_URL)
      .post('/weekdays')
      .send({
        "first_date": "2021-03-20T00:01:00 Asia/kuwait",
        "second_date": "2021-01-17T12:02:01 Asia/Kuala_Lumpur",
        "format": "seconds",
        "timezone": "Asiala_Lur"
      })
      .expect(400)


    assert.equal(res.body.error, 'The timezone is invalid');
    assert.equal(res.body.parameter, "timezone")
  })
})