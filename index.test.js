const request = require('supertest-as-promised');

var server = require('./index.js');

it('responds to /', function testSlash(done) {
    request(server)
        .get('/')
        .expect(200, done);
});

it('404 everything else', function testPath(done) {
    request(server)
        .get('/foo')
        .expect(404, done);
});
