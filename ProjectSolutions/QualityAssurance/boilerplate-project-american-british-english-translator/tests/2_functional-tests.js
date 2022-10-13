const chai = require('chai');
const chaiHttp = require('chai-http');
const assert = chai.assert;
const server = require('../server.js');

chai.use(chaiHttp);

let Translator = require('../components/translator.js');

suite('Functional Tests', () => {

    test('Translation with text and locale fields: POST request to /api/translate', function (done) {
        const payload = {
            text: "Mangoes are my favorite fruit.",
            locale: "american-to-british"
        }
        const expectedResponse = {
            text: "Mangoes are my favorite fruit.",
            translation: "Mangoes are my <span class=\"highlight\">favourite</span> fruit."
        }
        chai.request(server)
            .post('/api/translate')
            .send(payload)
            .end(function (err, res) {
                assert.equal(res.status, 200);
                assert.equal(res.body.text, expectedResponse.text);
                assert.equal(res.body.translation, expectedResponse.translation);
                assert.deepEqual(res.body, expectedResponse);
                done();
            })
    });

    test('Translation with text and invalid locale field: POST request to /api/translate', function (done) {
        const payload = {
            text: "Mangoes are my favorite fruit.",
            locale: "american-to-australian"
        }
        const expectedResponse = { error: 'Invalid value for locale field' };
        chai.request(server)
            .post('/api/translate')
            .send(payload)
            .end(function (err, res) {
                assert.equal(res.status, 400);
                assert.deepEqual(res.body, expectedResponse);
                done();
            })
    });

    test('Translation with missing text field: POST request to /api/translate', function (done) {
        const payload = {
            locale: "american-to-british"
        }
        const expectedResponse = { error: 'Required field(s) missing' };
        chai.request(server)
            .post('/api/translate')
            .send(payload)
            .end(function (err, res) {
                assert.equal(res.status, 400);
                assert.deepEqual(res.body, expectedResponse);
                done();
            })
    });

    test('Translation with missing locale field: POST request to /api/translate', function (done) {
        const payload = {
            text: "Mangoes are my favorite fruit.",
        }
        const expectedResponse = { error: 'Required field(s) missing' };
        chai.request(server)
            .post('/api/translate')
            .send(payload)
            .end(function (err, res) {
                assert.equal(res.status, 400);
                assert.deepEqual(res.body, expectedResponse);
                done();
            })
    });

    test('Translation with empty text: POST request to /api/translate', function (done) {
        const payload = {
            text: "",
            locale: "american-to-british"
        }
        const expectedResponse = { error: 'No text to translate' };
        chai.request(server)
            .post('/api/translate')
            .send(payload)
            .end(function (err, res) {
                assert.equal(res.status, 400);
                assert.deepEqual(res.body, expectedResponse);
                done();
            })
    });

    test('Translation with text that needs no translation: POST request to /api/translate', function (done) {
        const payload = {
            text: "Paracetamol takes up to an hour to work.",
            locale: "american-to-british"
        }
        const expectedResponse = {
            text: "Paracetamol takes up to an hour to work.",
            translation: "Everything looks good to me!"
        }
        chai.request(server)
            .post('/api/translate')
            .send(payload)
            .end(function (err, res) {
                assert.equal(res.status, 200);
                assert.equal(res.body.text, expectedResponse.text);
                assert.equal(res.body.translation, expectedResponse.translation);
                assert.deepEqual(res.body, expectedResponse);
                done();
            })
    });

});
