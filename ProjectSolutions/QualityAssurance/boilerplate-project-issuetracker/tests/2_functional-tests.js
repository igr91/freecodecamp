const chaiHttp = require('chai-http');
const chai = require('chai');
const assert = chai.assert;
const chaiJsonSchema = require('chai-json-schema');
const server = require('../server');

chai.use(chaiHttp);
chai.use(chaiJsonSchema);

const projectSchema = {
    title: 'projectSchema',
    type: 'object',
    required: ['_id', 'project', 'issue_title', 'issue_text', 'created_by', 'open', 'created_on', 'updated_on'],
    project: { type: String },
    issue_title: { type: String },
    issue_text: { type: String },
    created_by: { type: String },
    assigned_to: { type: String },
    status_text: { type: String },
    open: { type: Boolean },
    created_on: { type: Date },
    updated_on: { type: Date },
    _id: { type: String },
}

suite('Functional Tests', function () {

    let issues = [];

    test('POST - Should create an issue with required fields', function (done) {
        const project = "apitest";
        const issue_title = "Chai-Test-Required";
        const issue_text = "Testing all required fields";
        const created_by = "igr91";
        chai.request(server)
            .post('/api/issues/' + project)
            .send({
                "issue_title": issue_title,
                "issue_text": issue_text,
                "created_by": created_by
            })
            .end(function (err, res) {
                assert.equal(res.status, 200)
                assert.equal(res.body.project, project);
                assert.equal(res.body.issue_title, issue_title);
                assert.equal(res.body.issue_text, issue_text);
                assert.equal(res.body.open, true);
                assert.equal(res.body.created_by, created_by);
                assert.equal(res.body.assigned_to, "");
                assert.equal(res.body.status_text, "");
                assert.isNotNaN(Date.parse(res.body.created_on));
                assert.isNotNaN(Date.parse(res.body.updated_on));
                assert.isNotNull(res.body._id);
                assert.jsonSchema(res.body, projectSchema);
                issues.push(res.body);
                done();
            })
    });

    test('POST - Should create an issue with every field', function (done) {
        const project = "apitest";
        const issue_title = "Chai-Test-All";
        const issue_text = "Testing every field field";
        const created_by = "igr91";
        const assigned_to = "John Rambo";
        const status_text = "Testing";
        chai.request(server)
            .post('/api/issues/' + project)
            .send({
                "issue_title": issue_title,
                "issue_text": issue_text,
                "created_by": created_by,
                "assigned_to": assigned_to,
                "status_text": status_text
            })
            .end(function (err, res) {
                assert.equal(res.status, 200)
                assert.equal(res.body.project, project);
                assert.equal(res.body.issue_title, issue_title);
                assert.equal(res.body.issue_text, issue_text);
                assert.equal(res.body.open, true);
                assert.equal(res.body.created_by, created_by);
                assert.equal(res.body.assigned_to, assigned_to);
                assert.equal(res.body.status_text, status_text);
                assert.isNotNaN(Date.parse(res.body.created_on));
                assert.isNotNaN(Date.parse(res.body.updated_on));
                assert.isNotNull(res.body._id);
                assert.jsonSchema(res.body, projectSchema);
                issues.push(res.body);
                done();
            })
    });

    test('POST - Should fail to create an issue with missing required fields', function (done) {
        const project = "apitest";
        const issue_title = "Chai-Test-Missing-Required-Fields";
        const issue_text = "Testing missing required fields";
        //const created_by = "igr91"; Missing created_by
        const assigned_to = "John Rambo";
        const status_text = "Testing";
        const error = "required field(s) missing";
        chai.request(server)
            .post('/api/issues/' + project)
            .send({
                "issue_title": issue_title,
                "issue_text": issue_text,
                //"created_by":created_by,
                "assigned_to": assigned_to,
                "status_text": status_text
            })
            .end(function (err, res) {
                //assert.equal(res.status, 400)
                assert.equal(res.body.error, error);
                done();
            })
    });

    test('GET - Should get a list of issues on a project', function (done) {
        const project = "apitest";
        chai.request(server)
            .get('/api/issues/' + project)
            .end(function (err, res) {
                assert.equal(res.status, 200)
                for (const issue of res.body) {
                    assert.jsonSchema(issue, projectSchema);
                }
                done();
            })
    });

    test('GET - Should get a filtered list of issues on a project, one filter', function (done) {
        const project = "apitest";
        const issue_title = "Chai-Test-Required";
        const filters = {
            "issue_title": issue_title,
        }
        chai.request(server)
            .get('/api/issues/' + project)
            .query(filters)
            .end(function (err, res) {
                assert.equal(res.status, 200)
                for (const issue of res.body) {
                    assert.equal(issue.issue_title, issue_title);
                    assert.jsonSchema(issue, projectSchema);
                }
                done();
            })
    });

    test('GET - Should get a filtered list of issues on a project, multiple filters', function (done) {
        const project = "apitest";
        const issue_title = "Chai-Test-Required";
        const created_by = "igr91"
        const filters = {
            "issue_title": issue_title,
            "created_by": created_by
        }
        chai.request(server)
            .get('/api/issues/' + project)
            .query(filters)
            .end(function (err, res) {
                assert.equal(res.status, 200)
                for (const issue of res.body) {
                    assert.equal(issue.issue_title, issue_title);
                    assert.jsonSchema(issue, projectSchema);
                }
                done();
            })
    });

    test('PUT  - Should update one field on an issue', function (done) {
        const project = "apitest";
        const issue_title = "Chai-Test-UpdateFields";
        const issue_text = "Testing field update";
        const created_by = "igr91";

        chai.request(server)
            .post('/api/issues/' + project)
            .send({
                "issue_title": issue_title,
                "issue_text": issue_text,
                "created_by": created_by
            })
            .end(function (err, resPost) {
                assert.equal(resPost.status, 200)
                const new_issue_title = "Chai-Test-Required";
                const update = {
                    "_id": resPost.body._id,
                    "issue_title": new_issue_title
                }
                const expectedResult = {
                    'result': 'successfully updated',
                    '_id': resPost.body._id
                }

                chai.request(server)
                    .put('/api/issues/' + project)
                    .send(update)
                    .end(function (err, resPut) {
                        assert.equal(resPut.status, 200)
                        assert.deepEqual(resPut.body, expectedResult)
                        done();
                    })
            })
    })

    test('PUT  - Should update multiple fields on an issue', function (done) {
        const project = "apitest";
        const issue_title = "Chai-Test-UpdateFields";
        const issue_text = "Testing field update";
        const created_by = "igr91";

        chai.request(server)
            .post('/api/issues/' + project)
            .send({
                "issue_title": issue_title,
                "issue_text": issue_text,
                "created_by": created_by
            })
            .end(function (err, resPost) {
                assert.equal(resPost.status, 200)
                const new_issue_title = "Chai-Test-Required";
                const new_issue_text = "TestingTestingTesting";
                const update = {
                    "_id": resPost.body._id,
                    "issue_title": new_issue_title,
                    "issue_text": new_issue_text,
                }
                const expectedResult = {
                    'result': 'successfully updated',
                    '_id': resPost.body._id
                }

                chai.request(server)
                    .put('/api/issues/' + project)
                    .send(update)
                    .end(function (err, resPut) {
                        assert.equal(resPut.status, 200)
                        assert.deepEqual(resPut.body, expectedResult)
                        done();
                    })
            })
    })

    test('PUT  - Should fail on update without _id', function (done) {
        const project = "apitest";
        const issue_title = "Chai-Test-UpdateFields-NoId";
        const issue_text = "Testing field update, no id";
        const created_by = "igr91";

        chai.request(server)
            .post('/api/issues/' + project)
            .send({
                "issue_title": issue_title,
                "issue_text": issue_text,
                "created_by": created_by
            })
            .end(function (err, resPost) {
                assert.equal(resPost.status, 200)
                const new_issue_title = "Chai-Test-Required-NoId";
                const update = {
                    "issue_title": new_issue_title
                }
                const expectedResult = { error: 'missing _id' }

                chai.request(server)
                    .put('/api/issues/' + project)
                    .send(update)
                    .end(function (err, resPut) {
                        assert.equal(resPut.status, 200)
                        assert.deepEqual(resPut.body, expectedResult)
                        done();
                    })
            })
    })

    test('PUT  - Should fail on update without update fields', function (done) {
        const project = "apitest";
        const issue_title = "Chai-Test-UpdateFields-NoId";
        const issue_text = "Testing field update, no id";
        const created_by = "igr91";

        chai.request(server)
            .post('/api/issues/' + project)
            .send({
                "issue_title": issue_title,
                "issue_text": issue_text,
                "created_by": created_by
            })
            .end(function (err, resPost) {
                assert.equal(resPost.status, 200)
                const new_issue_title = "Chai-Test-Required-NoId";
                const update = {
                    "_id": resPost.body._id,
                }
                const expectedResult = {
                    'error': 'no update field(s) sent',
                    '_id': resPost.body._id
                }

                chai.request(server)
                    .put('/api/issues/' + project)
                    .send(update)
                    .end(function (err, resPut) {
                        assert.equal(resPut.status, 200)
                        assert.deepEqual(resPut.body, expectedResult)
                        done();
                    })
            })
    })

    test('PUT  - Should fail on update with invalid ID', function (done) {
        const project = "apitest";
        const issue_title = "Chai-Test-UpdateFields-NoId";
        const issue_text = "Testing field update, no id";
        const created_by = "igr91";

        chai.request(server)
            .post('/api/issues/' + project)
            .send({
                "issue_title": issue_title,
                "issue_text": issue_text,
                "created_by": created_by
            })
            .end(function (err, resPost) {
                assert.equal(resPost.status, 200)
                const new_issue_title = "Chai-Test-Required-NoId";
                const update = {
                    "_id": "InvalidId",
                    "issue_title": new_issue_title
                }
                const expectedResult = {
                    'error': 'could not update',
                    '_id': 'InvalidId'
                }

                chai.request(server)
                    .put('/api/issues/' + project)
                    .send(update)
                    .end(function (err, resPut) {
                        assert.equal(resPut.status, 200)
                        assert.deepEqual(resPut.body, expectedResult)
                        done();
                    })
            })
    })

    test('DELETE - Should delete an existing issue', function (done) {
        const project = "apitest";

        const expectedResult = {
            'result': 'successfully deleted',
            '_id': issues[0]._id
        }

        chai.request(server)
            .delete('/api/issues/' + project)
            .send({
                "_id": issues[0]._id
            })
            .end(function (err, resDelete) {
                assert.equal(resDelete.status, 200);
                assert.deepEqual(resDelete.body, expectedResult);
                issues.shift();
                done()
            })
    })

    test('DELETE - Should fail to delete an issue with invalid ID', function (done) {
        const project = "apitest";

        const expectedResult = {
            'error': 'could not delete',
            '_id': "InvalidId2"
        }

        chai.request(server)
            .delete('/api/issues/' + project)
            .send({
                "_id": "InvalidId2"
            })
            .end(function (err, resDelete) {
                assert.equal(resDelete.status, 200);
                assert.deepEqual(resDelete.body, expectedResult);
                issues.shift();
                done()
            })
    })

    test('DELETE - Should fail to delete with missing ID', function (done) {
        const project = "apitest";

        const expectedResult = {
            'error': 'missing _id'
        }

        chai.request(server)
            .delete('/api/issues/' + project)
            .end(function (err, resDelete) {
                assert.equal(resDelete.status, 200);
                assert.deepEqual(resDelete.body, expectedResult);
                issues.shift();
                done()
            })
    })

});
