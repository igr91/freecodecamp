const chai = require("chai");
const chaiHttp = require('chai-http');
const assert = chai.assert;
const server = require('../server');

chai.use(chaiHttp);

suite('Functional Tests', () => {

    const validPuzzle = '.7.89.....5....3.4.2..4..1.5689..472...6.....1.7.5.63873.1.2.8.6..47.1..2.9.387.6';
    const puzzleSolution = '473891265851726394926345817568913472342687951197254638734162589685479123219538746';
    const invalidPuzzle = '.7x89.....5....3.4.2..4..1.5689..472...6.....1.7.5.63873.1.2.8.6..47.1..2.9.387.6';
    const invalidPuzzleLength = '.7.89.....5....3.4.2..4..1.5689..472...6.....1.7.5.63873.1.2.8.6..47.1..2.9.387.6.';
    const unsolvablePuzzle = '.7.49.....5....3.4.2..4..1.5689..472...6.....1.7.5.63873.1.2.8.6..47.1..2.9.387.6';

    test('Solve a puzzle with valid puzzle string: POST request to /api/solve', function (done) {
        chai.request(server)
            .post('/api/solve')
            .send({
                "puzzle": validPuzzle
            })
            .end(function (err, res) {
                assert.equal(res.status, 200)
                assert.equal(res.body.solution, puzzleSolution);
                done();
            })
    });

    test('Solve a puzzle with missing puzzle string: POST request to /api/solve', function (done) {
        const expectedResult = { error: 'Required field missing' };
        chai.request(server)
            .post('/api/solve')
            .end(function (err, res) {
                assert.deepEqual(res.body, expectedResult);
                done();
            })
    });

    test('Solve a puzzle with invalid characters: POST request to /api/solve', function (done) {
        const expectedResult = { error: 'Invalid characters in puzzle' }
        chai.request(server)
            .post('/api/solve')
            .send({
                "puzzle": invalidPuzzle
            })
            .end(function (err, res) {
                assert.deepEqual(res.body, expectedResult);
                done();
            })
    });

    test('Solve a puzzle with incorrect length: POST request to /api/solve', function (done) {
        const expectedResult = { error: 'Expected puzzle to be 81 characters long' }
        chai.request(server)
            .post('/api/solve')
            .send({
                "puzzle": invalidPuzzleLength
            })
            .end(function (err, res) {
                assert.deepEqual(res.body, expectedResult);
                done();
            })
    });

    test('Solve a puzzle that cannot be solved: POST request to /api/solve', function (done) {
        const expectedResult = { error: 'Puzzle cannot be solved' }
        chai.request(server)
            .post('/api/solve')
            .send({
                "puzzle": unsolvablePuzzle
            })
            .end(function (err, res) {
                assert.deepEqual(res.body, expectedResult);
                done();
            })
    });

    test('Check a puzzle placement with all fields: POST request to /api/check', function (done) {
        const expectedResult = { valid: true };
        chai.request(server)
            .post('/api/check')
            .send({
                "puzzle": validPuzzle,
                "coordinate": "A7",
                "value": "2"
            })
            .end(function (err, res) {
                assert.deepEqual(res.body, expectedResult);
                done();
            })
    });

    test('Check a puzzle placement with single placement conflict: POST request to /api/check', function (done) {
        const expectedResult = { valid: false, conflict: ["region"] };
        chai.request(server)
            .post('/api/check')
            .send({
                "puzzle": validPuzzle,
                "coordinate": "A3",
                "value": "5"
            })
            .end(function (err, res) {
                assert.equal(res.body.valid, false);
                assert.deepEqual(res.body.conflict, ["region"]);
                assert.deepEqual(res.body, expectedResult);
                done();
            })
    });

    test('Check a puzzle placement with multiple placement conflicts: POST request to /api/check', function (done) {
        const expectedResult = { "valid": false, "conflict": ["row", "column"] };
        chai.request(server)
            .post('/api/check')
            .send({
                "puzzle": validPuzzle,
                "coordinate": "F6",
                "value": "8"
            })
            .end(function (err, res) {
                assert.equal(res.body.valid, false);
                assert.deepEqual(res.body.conflict, ["row", "column"]);
                assert.deepEqual(res.body, expectedResult);
                done();
            })
    });

    test('Check a puzzle placement with all placement conflicts: POST request to /api/check', function (done) {
        const expectedResult = { "valid": false, "conflict": ["row", "column", "region"] };
        chai.request(server)
            .post('/api/check')
            .send({
                "puzzle": validPuzzle,
                "coordinate": "D4",
                "value": "6"
            })
            .end(function (err, res) {
                assert.equal(res.body.valid, false);
                assert.deepEqual(res.body.conflict, ["row", "column", "region"]);
                assert.deepEqual(res.body, expectedResult);
                done();
            })
    });

    test('Check a puzzle placement with missing required fields: POST request to /api/check', function (done) {
        const expectedResult = { error: "Required field(s) missing" };
        chai.request(server)
            .post('/api/check')
            .send({
                "puzzle": validPuzzle,
                "coordinate": "D4",
            })
            .end(function (err, res) {
                assert.deepEqual(res.body, expectedResult);
                done();
            })
    });

    test('Check a puzzle placement with invalid characters: POST request to /api/check', function (done) {
        const expectedResult = { error: 'Invalid characters in puzzle' };
        chai.request(server)
            .post('/api/check')
            .send({
                "puzzle": invalidPuzzle,
                "coordinate": "D4",
                "value": "6"
            })
            .end(function (err, res) {
                assert.deepEqual(res.body, expectedResult);
                done();
            })
    });


    test('Check a puzzle placement with incorrect length: POST request to /api/check', function (done) {
        const expectedResult = { error: 'Expected puzzle to be 81 characters long' };
        chai.request(server)
            .post('/api/check')
            .send({
                "puzzle": invalidPuzzleLength,
                "coordinate": "D4",
                "value": "6"
            })
            .end(function (err, res) {
                assert.deepEqual(res.body, expectedResult);
                done();
            })
    });

    test('Check a puzzle placement with invalid placement coordinate: POST request to /api/check', function (done) {
        const expectedResult = { error: "Invalid coordinate" };
        chai.request(server)
            .post('/api/check')
            .send({
                "puzzle": validPuzzle,
                "coordinate": "DA456",
                "value": "6"
            })
            .end(function (err, res) {
                assert.deepEqual(res.body, expectedResult);
                done();
            })
    });

    test('Check a puzzle placement with invalid placement value: POST request to /api/check', function (done) {
        const expectedResult = { error: "Invalid value" };
        chai.request(server)
            .post('/api/check')
            .send({
                "puzzle": validPuzzle,
                "coordinate": "D7",
                "value": "253"
            })
            .end(function (err, res) {
                assert.deepEqual(res.body, expectedResult);
                done();
            })
    });

});

