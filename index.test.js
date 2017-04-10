const request = require('supertest');
var server = require('./index.js');

it("handles / correctly", (done) => {
    request(server)
        .get('/')
        .expect(200)
        .expect('Content-Type', 'text/html; charset=UTF-8')
        .end((err, res) => err ? done.fail(err) : done());
});


it("Without request, /results returns a server error (not 404)", (done) => {
    request(server)
        .get('/results')
        .expect(500)
        .end((err, res) => err ? done.fail(err) : done());
});

it("404 everything else", (done) => {
    request(server)
        .get('/foo/bar')
        .expect(404)
        .end((err, res) => err ? done.fail(err) : done());
});

