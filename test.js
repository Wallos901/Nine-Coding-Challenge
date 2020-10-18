const assert = require('assert');
const request = require('supertest');
const app = require('./server');

describe('GET /', () => {
    it('should return OK status with valid JSON input', () => {
        request(app)
            .get('/')
            .send({ payload:[] })
            .expect(200)
    });

    it('should return Bad Request status with invalid JSON input', () => {
        request(app)
            .get('/')
            .expect(400)
    });

    it('should return JSON response with "response" key', () => {
        return request(app)
            .get('/')
            .send({ payload:[] })
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(200)
            .then(res => {
                assert.ok(Array.isArray(res.body.response))
            });
    });
});