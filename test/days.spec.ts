import test from 'japa'
import supertest from 'supertest'

const BASE_URL = `http://${process.env.HOST}:${process.env.PORT}`


test.group('Test for the /days Endpoint', () => {
  // Test: 1 Checking to know is the homepage is working or not
  test('ensure that the /days endpoints works', async (assert) => {
    let res = await supertest(BASE_URL)
      .post('/days')
      .send({
        "first_date": "2021-03-20T00:01:00 Asia/Damascus",
        "second_date": "2021-03-21T00:01:00 Asia/Kuwait",
        "timezone": "Asia/Kuala_Lumpur"
      })
      .expect(200)
    assert.equal(res.body.result, 0);
  })

  // Test: 2 -> Checking for the missing dates
  test('Checking for the invalid timezone or format', async (assert) => {
    const res = await supertest(BASE_URL)
      .post('/days')
      .send({
        "second_date": "2021-03-21T00:01:00 Asia/Kuwait",
        "format": "seconds",
        "timezone": "Asia/Kuala_Lumpur"
      })
      .expect(400)

    const { error, parameter } = res.body;

    assert.equal(error, 'Parameter is missing');
    assert.equal(parameter, "first_date")
  })

  //   Test: 3 -> checking for the invalid dates either first_date or second_date
  test('check invalid dates', async (assert) => {
    // Test : 3.1
    let res = await supertest(BASE_URL)
      .post('/days')
      .send({
        "first_date": "sdfdsfsdf",
        "second_date": "2021-03-21T00:01:00 Asia/Kuwait",
        "format": "days",
        "timezone": "Asia/Kuala_Lumpur"
      })
      .expect(400)

    let { error, parameter } = res.body;

    assert.equal(error, 'Date is in incorrect form');
    assert.equal(parameter, "first_date")
    // Test 3.2
    res = await supertest(BASE_URL)
      .post('/days')
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


  // Test: 4 -> checking if the format and timezone is valid or not
  test("Checking for format and timezone", async (assert) => {
    // Test : 4.1
    let res = await supertest(BASE_URL)
      .post('/days')
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
      .post('/days')
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

  // Test: 5 Checking one day difference
  test('ensure /days endpoint for one day difference', async (assert) => {
    let res = await supertest(BASE_URL)
      .post('/days')
      .send({
        "first_date": "2021-03-20T00:01:00",
        "second_date": "2021-03-21T00:01:00",
      })
      .expect(200)
    assert.equal(res.body.result, 1);
  })
  
  // Test: 6 Checking almost two day difference
  test('ensure /days endpoints for almost two days difference', async (assert) => {
    let res = await supertest(BASE_URL)
      .post('/days')
      .send({
        "first_date": "2021-03-20T00:01:00",
        "second_date": "2021-03-21T23:01:00",
      })
      .expect(200)
    assert.equal(res.body.result, 1);
  })

  // Test: 7 Checking two day difference
  test('ensure that the /days endpoints works for two days difference', async (assert) => {
    let res = await supertest(BASE_URL)
      .post('/days')
      .send({
        "first_date": "2021-03-20T00:01:00",
        "second_date": "2021-03-22T00:01:00",
      })
      .expect(200)
    assert.equal(res.body.result, 2);
  })

  // Test: 7 Checking two day difference in seconds
  test('ensure that the /days endpoints works for two days difference in seconds', async (assert) => {
    let res = await supertest(BASE_URL)
      .post('/days')
      .send({
        "first_date": "2021-03-20T00:01:00",
        "second_date": "2021-03-22T00:01:00",
        "format": "seconds"
      })
      .expect(200)
    assert.equal(res.body.result, 86400 * 2);
  })


  // Test: 8 Checking if the endpoint works with timezone and minutes format
  test('ensure that the /days endpoints works if timezone and minutes are provided', async (assert) => {
    let res = await supertest(BASE_URL)
      .post('/days')
      .send({
        "first_date": "2021-03-20T00:01:00",
        "second_date": "2021-05-17T00:01:00",
        "format": "minutes",
        "timezone" : "Asia/kuwait"
      })
      .expect(200)
    assert.equal(res.body.result, 83520);
  })

    // Test: 9 Checking if the endpoint works with timezone and format in years
    test('Checking for the /days enpoint to work if the format is in years', async (assert) => {
      let res = await supertest(BASE_URL)
        .post('/days')
        .send({
          "first_date": "2021-03-20T00:01:00 Australia/sydney",
          "second_date": "2023-05-17T00:01:00",
          "format": "years",
          "timezone" : "Asia/kuwait"
        })
        .expect(200)
      assert.equal(res.body.result, 2 );
    })

    // Test: 10 Checking if the endpoint works with timezone and format in hours
    test('ensure that the /days endpoints works if the format is in hours', async (assert) => {
      let res = await supertest(BASE_URL)
        .post('/days')
        .send({
          "first_date": "2017-03-15T00:01:00 Indian/Maldives",
          "second_date": "2018-05-14T00:01:00 Africa/Johannesburg",
          "format": "hours",
          "timezone" : "Asia/Dubai"
        })
        .expect(200)
      assert.equal(res.body.result, 10200);
    })
})

