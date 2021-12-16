import test from 'japa'
import supertest from 'supertest'

const BASE_URL = `http://${process.env.HOST}:${process.env.PORT}`


test.group('complete weeks endpoint', () => {
    test('ensure that the weeks endpoint works', async (assert) => {

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

    //  Checking if the dates is invalid
    test('check invalid dates', async (assert) => {

        let res = await supertest(BASE_URL)
            .post('/weeks')
            .send({
                "first_date": "2021-03-20T00:01:00 Asia/Damascus",
                "second_date": "2021-03-21T00:01:00 Asia/Kuwait",
                "format": "secon",
                "timezone": "Asia/Kuala_Lumpur"
            })
            .expect(500)

        let { message } = res.body;

        assert.equal(message, 'The parameter format is invalid');


        res = await supertest(BASE_URL)
            .post('/weeks')
            .send({
                "first_date": "2021-03-20T00:01:00 Asia/amass",
                "second_date": "2021-03-21T00:01:00 Asia/Kuwait",
                "format": "seconds",
                "timezone": "Asia/Kuala_Lumpur"
            }
            )
            .expect(500)

        assert.equal(res.body.message, 'The timezone parameter is invalid');
    })
})
