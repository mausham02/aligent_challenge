import test from 'japa'
import supertest from 'supertest'

const BASE_URL = `http://${process.env.HOST}:${process.env.PORT}`


test.group('Test for the /weeks Endpoint', () => {
  // Test: 1 -> checking if the /weeks endpoint works
  test('ensure that the /weeks endpoint works', async (assert) => {

    const res = await supertest(BASE_URL)
      .post('/weeks')
      .send({
        "first_date": "2021-03-20T00:01:00 Asia/Damascus",
        "second_date": "2021-03-21T00:01:00 Asia/Kuwait",
        "format": "seconds",
        "timezone": "Asia/Kuala_Lumpur"
      })
      .expect(200)

    const { result } = res.body;

    assert.equal(result, 0);
  })

  // Test: 2 -> checking if any or both of the dates are missing
  test("Testing for the missing either of first date or second date parameter", async (assert) => {
    const res = await supertest(BASE_URL)
      .post('/weeks')
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

  // Test: 3 -> checking if the dates entered is invalid
  test("Checking invalid dates", async (assert) => {
    // Test : 3.1
    let res = await supertest(BASE_URL)
      .post('/weeks')
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
      .post('/weeks')
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


  //  Test: 4 -> checking if the format and timezone is invalid
  test('check invalid format and timezone', async (assert) => {
    // Test: 4.1
    let res = await supertest(BASE_URL)
      .post('/weeks')
      .send({
        "first_date": "2021-03-20T00:01:00 Asia/Damascus",
        "second_date": "2021-03-21T00:01:00 Asia/Kuwait",
        "format": "secon",
        "timezone": "Asia/Kuala_Lumpur"
      })
      .expect(400)

    let { error, parameter } = res.body;

    assert.equal(error, 'Parameter is not acceptable');
    assert.equal(parameter, "format");
    // Test 4.2
    res = await supertest(BASE_URL)
      .post('/weeks')
      .send({
        "first_date": "2021-03-20T00:01:00 Asia/amass",
        "second_date": "2021-03-21T00:01:00 Asia/Kuwait",
        "format": "seconds",
        "timezone": "Asia/Kuala_Lumpur"
      }
      )
      .expect(400)

    assert.equal(res.body.error, 'The timezone is invalid');
  })

  // Test: 5 Checking one week difference
  test('ensure /weeks endpoint for one week difference', async (assert) => {
    let res = await supertest(BASE_URL)
      .post('/weeks')
      .send({
        "first_date": "2021-03-20T00:01:00",
        "second_date": "2021-03-27T00:01:00"
      })
      .expect(200)
    assert.equal(res.body.result, 1);
  })

  // Test: 6 Checking almost two week difference
  test('ensure /weeks endpoints for almost two week difference', async (assert) => {
    let res = await supertest(BASE_URL)
      .post('/weeks')
      .send({
        "first_date": "2021-03-20T00:01:00",
        "second_date": "2021-04-02T12:01:00"
      })
      .expect(200)
    assert.equal(res.body.result, 1);
  })

  // Test: 7 Checking two week difference
  test('ensure that the /weeks endpoints works for two week difference', async (assert) => {
    let res = await supertest(BASE_URL)
      .post('/weeks')
      .send({
        "first_date": "2021-05-01T00:00:00",
        "second_date": "2021-05-15T00:00:00"
      })
      .expect(200)
    assert.equal(res.body.result, 2);
  })

  // Test: 7 Checking two weeks difference in seconds
  test('ensure that the /weeks endpoints works for two weeks difference in seconds', async (assert) => {
    let res = await supertest(BASE_URL)
      .post('/weeks')
      .send({
        "first_date": "2021-05-01T00:00:00",
        "second_date": "2021-05-15T00:00:00",
        "format": "seconds"
      })
      .expect(200)
    assert.equal(res.body.result, 86400 * 14);
  })

  // Test: 8 Checking if the endpoint works with timezone and minutes format
  test('ensure that the /weeks endpoints works if timezone and minutes are provided', async (assert) => {
    let res = await supertest(BASE_URL)
      .post('/weeks')
      .send({
        "first_date": "2021-03-20T00:01:00",
        "second_date": "2021-05-23T00:01:00",
        "format": "minutes",
        "timezone": "Asia/kuwait"
      })
      .expect(200)
    assert.equal(res.body.result, 90720);
  })

  // Test: 9 Checking if the endpoint works with timezone and format in years
  test('Checking for the /weeks enpoint to work if the format is in years', async (assert) => {
    let res = await supertest(BASE_URL)
      .post('/weeks')
      .send({
        "first_date": "2021-03-20T00:01:00 Australia/sydney",
        "second_date": "2023-05-17T00:01:00",
        "format": "years",
        "timezone": "Asia/kuwait"
      })
      .expect(200)
    assert.equal(res.body.result, 2);
  })

  // Test: 10 Checking if the endpoint works with timezone and format in hours
  test('ensure that the /weeks endpoints works if the format is in hours', async (assert) => {
    let res = await supertest(BASE_URL)
      .post('/weeks')
      .send({
        "first_date": "2017-03-15T00:01:00 Indian/Maldives",
        "second_date": "2018-05-14T00:01:00 Africa/Johannesburg",
        "format": "hours",
        "timezone": "Asia/Dubai"
      })
      .expect(200)
    assert.equal(res.body.result, 10080);
  })
})
