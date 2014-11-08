var config = require('../lib/config/config.js'),
    port = process.env.PORT || 3000,
    request = require('supertest')('http://localhost:' + port);

describe('API', function() {

    describe('can CREATE snippets', function() {
        var invalidSnippet = {
            foo: 'bar'
        }
        var validSnippet = {
            language: 'javascript',
            filename: 'testSnippet.js',
            code: 'var add = function(a,b) { return a + b };',
            creator: 'tester'
        }
        it('should accept post request', function(done) {
            request.post(config.endpoints.snippet_create)
                .set('Content-Type','application/json')
                .send(validSnippet)
                .expect('Content-Type', /json/)
                .expect(200)
                .end(function(err, res) {
                    res.body.should.equal(validSnippet)
                    done()
                })
        });

        it('should not accept invalid snippets', function(done) {
            request.post(config.endpoints.snippet_create)
                .set('Content-Type','application/json')
                .send(invalidSnippet)
                .expect(400, done)
        });

        // it('added snippets should exist', function(done) {
            // request.get(config.endpoints.snippet_get)
            // .expect
            // .expect(200,done)
        // });
    });



    // it('can UPDATE existing snippet', function(done) {
    //  assert(false)
    //  done()
    // });

    // it('can DELETE a snippet', function(done) {
    //  assert(false)
    //  done()
    // });

    // it('can LIST all snippets', function(done) {
    //  assert(false)
    //  done()
    // });

    // it('can LIST snippets by creator', function(done) {
    //  assert(false)
    //  done()
    // });

    // it('can SHOW snippet by id', function(done) {
    //  assert(false)
    //  done()
    // });

});
