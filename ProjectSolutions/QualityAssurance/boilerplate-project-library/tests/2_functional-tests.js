const chaiHttp = require('chai-http');
const chai = require('chai');
const assert = chai.assert;
const expect = chai.expect;
const server = require('../server');

chai.use(chaiHttp);

before('delete all books before testing', function (done) {
    const expectedResponse = "complete delete successful";
    chai.request(server)
        .delete('/api/books')
        .end((function (err, res) {
            //assert.equal(res.status, 200)
            assert.equal(res.text, expectedResponse);
            expect(res.text).to.be.a("string");
            done();
        }));
});

suite('Functional Tests', function () {

    suite('Routing tests', function () {

        let books = [];
        const bogusID = "63427098f5f8f873d7e3634f";
				//not checking status codes due to issues with replit and FCC's test runner
				//I'm aware what those should be set to

        suite('POST /api/books with title => create book object/expect book object', function () {

            test('Test POST /api/books with title', function (done) {
                const title = "testBook1"
                const comments = [];
                chai.request(server)
                    .post('/api/books')
                    .send({
                        "title": title
                    })
                    .end(function (err, res) {
                        //assert.equal(res.status, 200)
                        assert.equal(res.body.title, title);
                        assert.isArray(res.body.comments)
                        assert.deepEqual(res.body.comments, comments);
                        assert.equal(res.body.commentcount, 0);
                        assert.isNotNull(res.body._id);
                        expect(res.body._id).to.be.a("string");
                        books.push(res.body);
                        done();
                    })
            });

            test('Test POST /api/books with no title given', function (done) {
                const expectedResponse = "missing required field title";
                chai.request(server)
                    .post('/api/books')
                    .send()
                    .end(function (err, res) {
                        //assert.equal(res.status, 401)
                        assert.equal(res.text, expectedResponse);
                        expect(res.text).to.be.a("string");
                        done();
                    })
            });

        });


        suite('GET /api/books => array of books', function () {

            test('Test GET /api/books', function (done) {
                chai.request(server)
                    .get('/api/books')
                    .end(function (err, res) {
                        //assert.equal(res.status, 200)
                        assert.isArray(res.body, 'response should be an array');
                        assert.property(res.body[0], 'commentcount', 'Books in array should contain commentcount');
                        assert.property(res.body[0], 'title', 'Books in array should contain title');
                        assert.property(res.body[0], '_id', 'Books in array should contain _id');
                        done();
                    });
            });

        });


        suite('GET /api/books/[id] => book object with [id]', function () {

            test('Test GET /api/books/[id] with id not in db', function (done) {
                const expectedResponse = "no book exists";
                chai.request(server)
                    .get('/api/books/' + bogusID)
                    .end(function (err, res) {
                        //assert.equal(res.status, 404)
                        assert.equal(res.text, expectedResponse);
                        expect(res.text).to.be.a("string");
                        done();
                    });
            });

            test('Test GET /api/books/[id] with valid id in db', function (done) {
                chai.request(server)
                    .get('/api/books/' + books[0]._id)
                    .end(function (err, res) {
                        //assert.equal(res.status, 200)
                        assert.equal(res.body.title, books[0].title);
                        assert.isArray(res.body.comments)
                        assert.deepEqual(res.body.comments, books[0].comments);
                        assert.equal(res.body.commentcount, books[0].commentcount);
                        assert.isNotNull(res.body._id);
                        expect(res.body._id).to.be.a("string");
                        done();
                    });
            });

        });


        suite('POST /api/books/[id] => add comment/expect book object with id', function () {

            test('Test POST /api/books/[id] with comment', function (done) {
                const comment = "test comment";
                chai.request(server)
                    .post('/api/books/' + books[0]._id)
                    .send({
                        "comment": comment
                    })
                    .end(function (err, res) {
                        //assert.equal(res.status, 200)
                        books[0].comments.push(comment);
                        books[0].commentcount++;
                        assert.equal(res.body.title, books[0].title);
                        assert.isArray(res.body.comments)
                        assert.deepEqual(res.body.comments, books[0].comments);
                        assert.equal(res.body.commentcount, books[0].commentcount);
                        assert.isNotNull(res.body._id);
                        done();
                    })
            });

            test('Test POST /api/books/[id] without comment field', function (done) {
                const expectedResponse = "missing required field comment";
                chai.request(server)
                    .post('/api/books/' + books[0]._id)
                    .send()
                    .end(function (err, res) {
                        //assert.equal(res.status, 401)
                        assert.equal(res.text, expectedResponse);
                        expect(res.text).to.be.a("string");
                        done();
                    })
            });

            test('Test POST /api/books/[id] with comment, id not in db', function (done) {
                const expectedResponse = "no book exists";
                const comment = "test comment";
                chai.request(server)
                    .post('/api/books/' + bogusID)
                    .send({
                        "comment": comment
                    })
                    .end(function (err, res) {
                        //assert.equal(res.status, 404)
                        assert.equal(res.text, expectedResponse);
                        expect(res.text).to.be.a("string");
                        done();
                    })
            });

        });

        suite('DELETE /api/books/[id] => delete book object id', function () {

            test('Test DELETE /api/books/[id] with valid id in db', function (done) {
                const expectedResponse = "delete successful";
                chai.request(server)
                    .delete('/api/books/' + books[0]._id)
                    .end(function (err, res) {
                        //assert.equal(res.status, 200)
                        assert.equal(res.text, expectedResponse);
                        expect(res.text).to.be.a("string");
                        done();
                    })
            });

            test('Test DELETE /api/books/[id] with id not in db', function (done) {
                const expectedResponse = "no book exists";
                chai.request(server)
                    .delete('/api/books/' + bogusID)
                    .end(function (err, res) {
                        //assert.equal(res.status, 404)
                        assert.equal(res.text, expectedResponse);
                        expect(res.text).to.be.a("string");
                        done();
                    })
            });
        });
    });
});



