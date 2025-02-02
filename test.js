const assert = require('assert');
const request = require('supertest');
const app = require('./server');

describe('POST /', () => {
    it('should return OK status with valid JSON input', () => {
        request(app)
            .post('/')
            .send({ payload:[] })
            .expect(200)
    });

    it('should return 400 Bad Request status with invalid JSON input', () => {
        request(app)
            .post('/')
            .expect(400)
    });

    it('should return 400 Bad Request status (not 500 Internal Server Error) with invalid JSON key input', () => {
        request(app)
            .post('/')
            .send({ paylad:[] })
            .expect(400)
    });

    it('should return JSON response with "response" key', () => {
        return request(app)
            .post('/')
            .send({ payload:[] })
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(200)
            .then(res => {
                assert.ok(Array.isArray(res.body.response))
            });
    });
});