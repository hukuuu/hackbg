var config = require('../lib/config/config.js'),
port = process.env.PORT || 3000,
request = require('supertest')('http://localhost:' + port),
extend = require('extend')

describe('API', function() {
  this.timeout(6000)

  var invalidSnippet = {
    foo: 'bar'
  }
  var validSnippet = {
    language: 'javascript',
    filename: 'testSnippet.js',
    code: 'var add = function(a,b) { return a + b };',
    creator: 'tester'
  }
  it('should accept valid snippets', function(done) {
    request.post(config.endpoints.snippet_create)
    .set('Content-Type','application/json')
    .send(validSnippet)
    .expect('Content-Type', /json/)
    .expect(200)
    .end(function(err, res) {
      expect(res.body).to.have.property('_id')
      done()
    })
  });

  it('should not accept invalid snippets', function(done) {
    request.post(config.endpoints.snippet_create)
    .set('Content-Type','application/json')
    .send(invalidSnippet)
    .expect(400, done)
  });

  it('added snippets should exist', function(done) {
    request.post(config.endpoints.snippet_create)
    .set('Content-Type','application/json')
    .send(validSnippet)
    .end(function(err,res){
      var id = res.body._id
      request.get(config.endpoints.snippet_find.replace(':id',id))
      .send()
      .expect(200)
      .end(function(err, res){
        expect(res.body).to.be.defined
        expect(res.body).to.have.property('_id')
        expect(res.body._id).to.equal(id)
        done()
      })
    })
  });

  it('can update existing snippet', function(done) {
    request.post(config.endpoints.snippet_create)
    .set('Content-Type','application/json')
    .send(validSnippet)
    .end(function(err,res){
      var id = res.body._id
      request.put(config.endpoints.snippet_update.replace(':id',id))
      .send(extend(validSnippet,{
        language:'changed'
      }))
      .expect(200)
      .end(function(err, res){
        expect(res.body).to.be.defined
        expect(res.body).to.have.property('_id')
        expect(res.body._id).to.equal(id)
        expect(res.body.language).to.equal('changed')
        done()
      })
    })
  });


  it('can list all snippets', function(done) {
    request.get(config.endpoints.snippet_list)
    .send()
    .end(function(req, res){
      expect(res.body).to.be.defined
      expect(res.body).length.to.be.defined
      done()
    })
  });

  it('can delete a snippet', function(done) {
    request.post(config.endpoints.snippet_create)
    .set('Content-Type','application/json')
    .send(validSnippet)
    .end(function(err,res){
      var id = res.body._id
      request.delete(config.endpoints.snippet_delete.replace(':id',id))
      .send()
      .expect(200, done)
    })
  });

  // it('can LIST snippets by creator', function(done) {
  //  assert(false)
  //  done()
  // });

  // it('can SHOW snippet by id', function(done) {
  //  assert(false)
  //  done()
  // });

});
